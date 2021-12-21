import * as http from "http";
import axios from "axios";
//@ts-ignore
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

import { Routes } from "./routes";
import { generateToken } from "./token-generator";
import jiraMocks from "./jira-mocks";

const app = express();

const routes: Routes = {
  async getAccountId(request) {
    //@ts-ignore
    return request.headers["user-agent"];
  },
  async getJiraContext() {
    return {
      issue: { id: 10000 },
    };
  },
  async getToken() {
    return await generateToken(
      async (url, data, config) => (await axios.post(url, data, config)).data
    );
  },
};

for (const [key, fn] of Object.entries(routes)) {
  app.get(`/api/${key}`, async (request, response) => {
    try {
      const result = await fn({ ...request, context: {} });
      response.json(result);
    } catch (error) {
      // @ts-ignore
      response.status(500).json({ error: error.message });
    }
  });
}

jiraMocks(app);

const proxy = createProxyMiddleware({
  target: "http://localhost:3000",
  changeOrigin: true,
  ws: true,
});
app.use("/", proxy);
app.use("/assets/*", proxy);
app.use("/sockjs-node", proxy);
app.use("/*.hot-update.js", proxy);
app.use("/*.hot-update.json", proxy);

http.createServer(app).listen(8080);
