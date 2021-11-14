import VoxeetSDK from "@voxeet/voxeet-web-sdk";

export type ConferenceService = {
  createRoom: (roomAlias: string) => Promise<string>;
  joinRoom: (roomId: string) => Promise<void>;
  leaveRoom: () => Promise<void>;
  roomExists(roomId: string): Promise<Boolean>;
};

export function baseConferenceService(): ConferenceService {
  let sessionOpened = false;
  const openSessionIfNeeded = async () => {
    if (!sessionOpened) {
      await VoxeetSDK.session.open({ name: "dupa" });
      sessionOpened = true;
    }
  };

  let currentRoomId: string | null = null;

  return {
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
    async joinRoom(roomId: string) {
      await openSessionIfNeeded();

      let conference = await VoxeetSDK.conference.fetch(roomId);
      await VoxeetSDK.conference.join(conference, {});
      currentRoomId = roomId;
    },
    async leaveRoom() {
      if (currentRoomId) {
        await VoxeetSDK.conference.leave({});
        await VoxeetSDK.session.close();
        currentRoomId = null;
        sessionOpened = false;
      }
    },
  };
}
