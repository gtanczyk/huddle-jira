import { baseConferenceService, ConferenceService } from "./conference-service";

export default async function forgeConferenceService(
  accountId: string
): Promise<ConferenceService> {
  return baseConferenceService(accountId);
}
