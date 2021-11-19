import { router } from "@forge/bridge";

import { baseConferenceService, ConferenceService } from "./conference-service";
import { TokenService } from "./token-service";
import VoxeetSDK from "@voxeet/voxeet-web-sdk";

export default async function forgeConferenceService(
  accountId: string,
  tokenService: TokenService
): Promise<ConferenceService> {
  const [accessToken, screenShareAccessToken] = await Promise.all([
    tokenService.getToken(),
    tokenService.getToken(),
  ]);
  VoxeetSDK.initializeToken(accessToken, () => tokenService.getToken());

  const conferenceService = baseConferenceService(accountId);
  const { startScreenSharing } = conferenceService;
  conferenceService.startScreenSharing = async () => {
    try {
      await startScreenSharing();
    } catch (e) {
      await router.open(
        "https://forge-apps-development-332514.web.app/#screenSharing" +
          encodeURIComponent(
            JSON.stringify({
              token: screenShareAccessToken,
              externalId: `share:${accountId}`,
              conferenceId: conferenceService.getRoom(),
            })
          )
      );
    }
  };
  conferenceService.showFullscreenShare = async () => {
    const sharingParticipant = (await conferenceService.getParticipants()).find(
      (participant) => participant.isScreenSharing
    );

    if (!sharingParticipant) {
      throw new Error("Sharing participant is empty");
    }

    await router.open(
      "https://forge-apps-development-332514.web.app/#screenWatching" +
        encodeURIComponent(
          JSON.stringify({
            token: screenShareAccessToken,
            externalId: `share:${accountId}`,
            conferenceId: conferenceService.getRoom(),
            sharingParticipantId: sharingParticipant.accountId,
          })
        )
    );
  };
  return conferenceService;
}
