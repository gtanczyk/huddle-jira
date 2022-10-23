import { ContentPropertyService } from "./content-property-service";
import { ConferenceService, Participant } from "./conference-service";

export type HuddleService = {
  init(): Promise<void>;
  join(): Promise<void>;
  leave(): Promise<void>;
  getParticipants(): Promise<Participant[]>;
};

export function getHuddleService(
  accountId: string,
  contentPropertyService: ContentPropertyService,
  conferenceService: ConferenceService
): HuddleService {
  async function getHuddleParticipants(): Promise<Record<string, boolean>> {
    return (await contentPropertyService.getProperty("huddleParticipants")) || {};
  }

  async function setHuddleParticipants(huddleParticipants: Record<string, boolean>) {
    await contentPropertyService.setProperty("huddleParticipants", huddleParticipants);
  }

  async function updateHuddleParticipants(isPresent: boolean) {
    const huddleParticipants = await getHuddleParticipants();

    if (isPresent) {
      huddleParticipants[accountId] = true;
    } else {
      delete huddleParticipants[accountId];
    }

    await setHuddleParticipants(huddleParticipants);
  }

  return {
    init: async () => {
      let huddleRoomId = await contentPropertyService.getProperty<string>("huddleRoomId");
      if (huddleRoomId) {
        conferenceService.setRoom(huddleRoomId);
      }
    },
    async join() {
      await updateHuddleParticipants(true);
    },
    async leave() {
      await updateHuddleParticipants(false);
    },
    async getParticipants() {
      const huddleParticipants = await getHuddleParticipants();
      return Object.keys(huddleParticipants).map((accountId) => ({
        accountId,
      }));
    },
  };
}
