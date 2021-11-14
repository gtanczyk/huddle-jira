import VoxeetSDK from "@voxeet/voxeet-web-sdk";
import { baseConferenceService, ConferenceService } from "./conference-service";
import forgeTokenService from "./forge-token-service";

export default async function forgeConferenceService(): Promise<ConferenceService> {
  const tokenService = forgeTokenService();
  const accessToken = await tokenService.getToken();
  VoxeetSDK.initializeToken(accessToken, () => tokenService.getToken());

  return baseConferenceService();
}
