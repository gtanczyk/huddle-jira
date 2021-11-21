import VoxeetSDK from "@voxeet/voxeet-web-sdk";

import { ConferenceService, baseConferenceService } from "./conference-service";
import { TokenService } from "./token-service";

export default async function mockConferenceService(
  accountId: string,
  tokenService: TokenService
): Promise<ConferenceService> {
  const token = await tokenService.getToken();

  VoxeetSDK.initializeToken(token, () => tokenService.getToken());

  return baseConferenceService(accountId);
}
