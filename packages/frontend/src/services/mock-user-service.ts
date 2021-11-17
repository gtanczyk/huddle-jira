import { UserService } from "./user-service";

export function mockUserService(): UserService {
  return {
    async getAccountId() {
      return navigator.userAgent;
    },
  };
}
