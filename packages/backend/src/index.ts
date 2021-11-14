import Resolver from "@forge/resolver";
import { generateToken } from "./token-generator";

const resolver = new Resolver();

resolver.define("getToken", async () => {
  return await generateToken();
});

resolver.define("getJiraContext", async ({ context }) => {
  return context.extension;
});

export const handler = resolver.getDefinitions();
