import VoxeetSDK from "@voxeet/voxeet-web-sdk";

import { ConferenceService, baseConferenceService } from "./conference-service";

export default function mockConferenceService(accountId: string): ConferenceService {
  VoxeetSDK.initialize(
    process.env.REACT_APP_DOLBY_CUSTOMER_KEY || "",
    process.env.REACT_APP_DOLBY_CUSTOMER_SECRET || ""
  );

  return baseConferenceService(accountId);
}
