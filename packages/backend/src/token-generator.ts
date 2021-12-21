import { DOLBY_CONSUMER_KEY, DOLBY_CONSUMER_SECRET } from "./config";
import { PostRequestFn } from "./routes";

export async function generateToken(postRequest: PostRequestFn) {
  console.log("Start generating token");
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

  try {
    console.log("Make a request to voxeet.com");
    const { access_token } = await postRequest(url, data, config);
    console.log("Token generated");
    return access_token;
  } catch (e) {
    console.error("Failed to generate token", e);
    return null;
  }
}
