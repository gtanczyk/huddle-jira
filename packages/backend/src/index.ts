import Resolver from "@forge/resolver";
import { generateToken } from "./token-generator";
import { Routes } from "./routes";

const routes: Routes = {
  getToken: generateToken,
  getJiraContext: async ({ context }) => context.extension,
  getAccountId: ({ context }) => context.accountId,
};

const resolver = new Resolver();

for (const [key, fn] of Object.entries(routes)) {
  resolver.define(key, fn);
}

export const handler = resolver.getDefinitions();
