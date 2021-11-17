import { IssueDataService } from "./issue-data-service";
import { ConferenceService, Participant } from "./conference-service";

export type HuddleService = {
  init(): Promise<void>;
  join(): Promise<void>;
  leave(): Promise<void>;
  getParticipants(): Promise<Participant[]>;
};

export function getHuddleService(
  accountId: string,
  issueDataService: IssueDataService,
  conferenceService: ConferenceService
): HuddleService {
  async function getHuddleParticipants(): Promise<Record<string, boolean>> {
    return (await issueDataService.getProperty("huddleParticipants")) || {};
  }

  async function setHuddleParticipants(
    huddleParticipants: Record<string, boolean>
  ) {
    await issueDataService.setProperty(
      "huddleParticipants",
      huddleParticipants
    );
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
      let huddleRoomId = await issueDataService.getProperty<string>(
        "huddleRoomId"
      );
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
