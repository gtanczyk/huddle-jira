import { UserService } from "./user-service";
import forgeTokenService from "./forge-token-service";
import VoxeetSDK from "@voxeet/voxeet-web-sdk";
import { invoke } from "@forge/bridge";

export default function forgeUserService(): UserService {
  return {
    async getAccountId() {
      const tokenService = forgeTokenService();
      const accessToken = await tokenService.getToken();
      VoxeetSDK.initializeToken(accessToken, () => tokenService.getToken());

      return await invoke("getAccountId");
    },
  };
}
