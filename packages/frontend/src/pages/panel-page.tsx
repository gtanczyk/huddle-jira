import React, { useEffect } from "react";

import ProgressBar from "@atlaskit/progress-bar";

import Huddle from "../components/huddle";
import { HuddleContextProvider, useHuddleState, useHuddleStateWrite } from "../state/huddle-context";
import forgeContentPropertyService from "../services/forge-content-property-service";
import forgeTokenService from "../services/forge-token-service";
import forgeConferenceService from "../services/forge-conference-service";
import { getHuddleService } from "../services/huddle-service";
import forgeUserService from "../services/forge-user-service";

export default function PanelPage() {
  return (
    <HuddleContextProvider>
      <PanelPageContent />
    </HuddleContextProvider>
  );
}

function PanelPageContent() {
  const state = useHuddleState();
  const setState = useHuddleStateWrite();

  const initState = async () => {
    const userService = forgeUserService();
    const accountId = await userService.getAccountId();
    const tokenService = forgeTokenService();

    const contentPropertyService = await forgeContentPropertyService();
    const conferenceService = await forgeConferenceService(accountId, tokenService);
    const huddleService = getHuddleService(accountId, contentPropertyService, conferenceService);

    await huddleService.init();

    setState({
      isConnected: false,
      accountId,

      contentPropertyService,
      tokenService,
      conferenceService: conferenceService,
      huddleService,
      userService,
    });
  };

  useEffect(() => {
    initState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!state) {
    return <ProgressBar isIndeterminate />;
  }

  return <Huddle />;
}
