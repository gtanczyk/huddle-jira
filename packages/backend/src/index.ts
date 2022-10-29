import Resolver from "@forge/resolver";
import { fetch } from "@forge/api";

import { generateToken } from "./token-generator";
import { Routes } from "./routes";

const routes: Routes = {
  getToken: async () =>
    await generateToken(
      async (url, data, config) =>
        await (
          await fetch(url, {
            method: "POST",
            ...config,
          })
        ).json()
    ),
  getProductContext: ({ context }) =>
    Promise.resolve(context.extension as Record<string, unknown>),
  getAccountId: ({ context }) => Promise.resolve(context.accountId as string),
};

const resolver = new Resolver();

for (const [key, fn] of Object.entries(routes)) {
  resolver.define(key, fn);
}

export const handler = resolver.getDefinitions();
