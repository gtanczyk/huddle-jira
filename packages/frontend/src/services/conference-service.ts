import VoxeetSDK from "@voxeet/voxeet-web-sdk";

export type ConferenceService = {
  createRoom: (roomAlias: string) => Promise<string>;
  setRoom: (roomId: string) => void;
  getRoom: () => string | null;
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

  isScreenSharing(): boolean;
  startScreenSharing(): Promise<void>;
  stopScreenSharing(): Promise<void>;

  getParticipantScreenShare(participant: Participant): MediaStream | undefined;
  showFullscreenShare(): void;
};

export type Participant = {
  accountId: string;
  isScreenSharing?: boolean;
  isMuted?: boolean;
};

export type SpeakingStatus = "silent" | "speaking";

export function baseConferenceService(
  externalId: string,
  initialize = () => Promise.resolve()
): ConferenceService {
  let sessionOpened = false;
  const openSessionIfNeeded = async () => {
    if (!sessionOpened) {
      await initialize();
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
  VoxeetSDK.conference.on("streamAdded", triggerParticipantsCallbacks);
  VoxeetSDK.conference.on("streamRemoved", triggerParticipantsCallbacks);
  VoxeetSDK.conference.on("streamUpdated", triggerParticipantsCallbacks);

  return {
    getRoom() {
      return roomId;
    },

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
      }, 300);

      return () => clearInterval(interval);
    },

    isMuted() {
      return VoxeetSDK.conference.isMuted();
    },

    setMuted(isMuted: boolean) {
      if (isMuted) {
        VoxeetSDK.conference.stopAudio(VoxeetSDK.session.participant);
      } else {
        VoxeetSDK.conference.startAudio(VoxeetSDK.session.participant);
      }
    },
    isScreenSharing(): boolean {
      return VoxeetSDK.session.participant.streams.some(
        (stream) => stream.type === "ScreenShare"
      );
    },
    async startScreenSharing() {
      await VoxeetSDK.conference.startScreenShare();
    },
    async stopScreenSharing() {
      await VoxeetSDK.conference.stopScreenShare();
    },
    getParticipantScreenShare(
      participant: Participant
    ): MediaStream | undefined {
      let conferenceParticipant = Array.from(
        VoxeetSDK.conference.participants.values()
      ).find((p) => p.info.externalId === participant.accountId);
      return conferenceParticipant?.streams.find(
        (s) => s.type === "ScreenShare"
      );
    },
    showFullscreenShare() {},
  };
}

async function getConferenceParticipants(currentRoomId: string) {
  const conference = await VoxeetSDK.conference.fetch(currentRoomId);
  const participants: Participant[] = [];
  const conferenceParticipants = Array.from(conference.participants.values());
  for (const participant of conferenceParticipants) {
    if (
      participant.info.externalId &&
      (participant.status === "Connected" || participant.status === "Inactive")
    ) {
      participants.push({
        accountId: participant.info.externalId,
        isScreenSharing: participant.streams.some(
          (stream) => stream.type === "ScreenShare" && stream.active
        ),
        isMuted: !participant.audioTransmitting,
      });
    }
  }
  return participants;
}
