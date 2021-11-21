import { TokenService } from "./token-service";

export default function mockTokenService(): TokenService {
  return {
    getToken: async () => await (await fetch("/api/getToken")).json(),
  };
}
