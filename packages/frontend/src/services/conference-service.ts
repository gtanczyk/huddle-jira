import VoxeetSDK from "@voxeet/voxeet-web-sdk";

export type ConferenceService = {
  createRoom: (roomAlias: string) => Promise<string>;
  setRoom: (roomId: string) => void;
  joinRoom: () => Promise<void>;
  leaveRoom: () => Promise<void>;
  roomExists(roomId: string): Promise<Boolean>;

  onParticipants: (callback: (participants: Participant[]) => void) => void;
  offParticipants: (callback: (participants: Participant[]) => void) => void;
  getParticipants(): Promise<Participant[]>;

  onSpeaking(
    accountId: string,
    setSpeaking: (status: SpeakingStatus) => void
  ): () => void;

  isMuted(): boolean;
  setMuted(isMuted: boolean): void;
};

export type Participant = {
  accountId: string;
};

export type SpeakingStatus = "silent" | "speaking" | "speaking-a-lot";

export function baseConferenceService(externalId: string): ConferenceService {
  let sessionOpened = false;
  const openSessionIfNeeded = async () => {
    if (!sessionOpened) {
      await VoxeetSDK.session.open({ externalId });
      sessionOpened = true;
    }
  };

  let roomId: string | null = null;

  const participantsCallbacks: ((participants: Participant[]) => void)[] = [];
  const triggerParticipantsCallbacks = async () => {
    if (!roomId) {
      return;
    }
    let participants = await getConferenceParticipants(roomId);
    participantsCallbacks.forEach((callback) => callback(participants));
  };
  VoxeetSDK.conference.on("participantAdded", triggerParticipantsCallbacks);
  VoxeetSDK.conference.on("participantUpdated", triggerParticipantsCallbacks);

  return {
    setRoom: (_roomId: string) => {
      roomId = _roomId;
    },
    async onParticipants(callback: (participants: Participant[]) => void) {
      if (!roomId) {
        return;
      }

      participantsCallbacks.push(callback);
      callback(await getConferenceParticipants(roomId));
    },
    offParticipants(callback: (participants: Participant[]) => void): void {
      participantsCallbacks.splice(participantsCallbacks.indexOf(callback), 1);
    },
    getParticipants(): Promise<Participant[]> {
      return (
        (roomId && getConferenceParticipants(roomId)) || Promise.resolve([])
      );
    },
    async roomExists(roomId) {
      return (await VoxeetSDK.conference.fetch(roomId)).status === "created";
    },
    async createRoom(roomAlias: string) {
      await openSessionIfNeeded();

      const conference = await VoxeetSDK.conference.create({
        alias: roomAlias,
      });
      return conference.id;
    },
    async joinRoom() {
      await openSessionIfNeeded();
      if (!roomId) {
        return;
      }

      let conference = await VoxeetSDK.conference.fetch(roomId);
      await VoxeetSDK.conference.join(conference, {});
    },
    async leaveRoom() {
      if (roomId) {
        await VoxeetSDK.conference.leave({});
        await VoxeetSDK.session.close();
        roomId = null;
        sessionOpened = false;
      }
    },
    onSpeaking(accountId, setSpeaking) {
      const interval = setInterval(() => {
        const participant = Array.from(
          VoxeetSDK.conference.participants.values()
        ).find((participant) => participant.info.externalId === accountId);

        if (!participant) {
          return;
        }

        VoxeetSDK.conference.isSpeaking(participant, (isSpeaking: boolean) => {
          setSpeaking(isSpeaking ? "speaking" : "silent");
        });
      }, 1000);

      return () => clearInterval(interval);
    },

    isMuted() {
      return VoxeetSDK.conference.isMuted();
    },

    setMuted(isMuted: boolean) {
      VoxeetSDK.conference.mute(VoxeetSDK.session.participant, isMuted);
    },
  };
}

async function getConferenceParticipants(currentRoomId: string) {
  const conference = await VoxeetSDK.conference.fetch(currentRoomId);
  const participants: Participant[] = [];
  for (const participant of Array.from(conference.participants.values())) {
    if (participant.info.externalId && participant.status === "Connected") {
      participants.push({
        accountId: participant.info.externalId,
      });
    }
  }
  return participants;
}
