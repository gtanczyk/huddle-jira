import axios from "axios";

import { DOLBY_CONSUMER_KEY, DOLBY_CONSUMER_SECRET } from "./config";

export async function generateToken() {
  const credentials = Buffer.from(
    DOLBY_CONSUMER_KEY + ":" + DOLBY_CONSUMER_SECRET
  ).toString("base64");
  const url = "https://session.voxeet.com/v1/oauth2/token";
  const config = {
    headers: {
      Authorization: "Basic " + credentials,
    },
  };

  const data = { grant_type: "client_credentials", expires_in: 3600 };

  const response = await axios.post(url, data, config);
  const { access_token } = response.data;
  return access_token;
}
