import axios from "axios";

const CONSUMER_KEY = process.env.DOLBY_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.DOLBY_CONSUMER_SECRET;
const credentials = Buffer.from(CONSUMER_KEY + ":" + CONSUMER_SECRET).toString(
  "base64"
);
const url = "https://session.voxeet.com/v1/oauth2/token";
const config = {
  headers: {
    Authorization: "Basic " + credentials,
  },
};

const data = { grant_type: "client_credentials", expires_in: 3600 };

export async function generateToken() {
  const response = await axios.post(url, data, config);
  const { access_token } = response.data;
  return access_token;
}
