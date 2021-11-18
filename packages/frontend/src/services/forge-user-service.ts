import { UserService } from "./user-service";
import { invoke, requestJira } from "@forge/bridge";

export default function forgeUserService(): UserService {
  return {
    async getAccountId() {
      return await invoke("getAccountId");
    },

    async getUserDetails(accountId: string) {
      const response = await requestJira(
        `/rest/api/3/user?accountId=${accountId}`
      );
      return response.status === 200 ? await response.json() : undefined;
    },
  };
}
