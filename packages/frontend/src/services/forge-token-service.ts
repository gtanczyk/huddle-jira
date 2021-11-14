import { invoke } from "@forge/bridge";

import { TokenService } from "./token-service";

export default function forgeTokenService(): TokenService {
  return {
    getToken: async () => await invoke("getToken"),
  };
}
