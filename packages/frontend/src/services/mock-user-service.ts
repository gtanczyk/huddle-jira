import { UserService } from "./user-service";

export function mockUserService(): UserService {
  return {
    async getAccountId() {
      return await (await fetch("/api/getAccountId")).json();
    },

    async getUserDetails(accountId) {
      const response = await fetch(`/rest/api/3/user?accountId=${accountId}`);
      return response.status === 200 ? await response.json() : undefined;
    },
  };
}
