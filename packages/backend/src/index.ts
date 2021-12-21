import Resolver from "@forge/resolver";
import { generateToken } from "./token-generator";
import { Routes } from "./routes";

const routes: Routes = {
  getToken: generateToken,
  getJiraContext: ({ context }) =>
    Promise.resolve(context.extension as Record<string, unknown>),
  getAccountId: ({ context }) => Promise.resolve(context.accountId as string),
};

const resolver = new Resolver();

for (const [key, fn] of Object.entries(routes)) {
  resolver.define(key, fn);
}

export const handler = resolver.getDefinitions();
