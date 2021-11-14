export type TokenService = {
  getToken: () => Promise<string>;
};

export function mockTokenService(): TokenService {
  return {
    getToken: async () => "",
  };
}
