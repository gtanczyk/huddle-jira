import Resolver from "@forge/resolver";
import { generateToken } from "./token-generator";

const resolver = new Resolver();

resolver.define("getToken", async () => await generateToken());

resolver.define("getJiraContext", async ({ context }) => context.extension);

resolver.define("getAccountId", async ({ context }) => context.accountId);

export const handler = resolver.getDefinitions();
