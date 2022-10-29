import React, { useEffect } from "react";
import ProgressBar from "@atlaskit/progress-bar";
import { HuddleContextProvider, useHuddleState, useHuddleStateWrite } from "../state/huddle-context";
import Huddle from "../components/huddle";
import mockContentPropertyService from "../services/mock-content-property-service";
import mockTokenService from "../services/mock-token-service";
import mockConferenceService from "../services/mock-conference-service";
import { getHuddleService } from "../services/huddle-service";
import { mockUserService } from "../services/mock-user-service";

export default function MockedPanelPage() {
  return (
    <HuddleContextProvider>
      <div style={{ width: "870px", margin: "0 auto", border: "1px solid #eee" }}>
        <MockedPanelPageContent />
      </div>
    </HuddleContextProvider>
  );
}

function MockedPanelPageContent() {
  const state = useHuddleState();
  const setState = useHuddleStateWrite();

  const initState = async () => {
    const userService = mockUserService();
    const accountId = await userService.getAccountId();
    const tokenService = mockTokenService();

    const contentPropertyService = await mockContentPropertyService();
    const conferenceService = await mockConferenceService(accountId, tokenService);
    const huddleService = getHuddleService(accountId, contentPropertyService, conferenceService);

    await huddleService.init();

    setState({
      accountId,
      isConnected: false,
      autoConnect: false,

      contentPropertyService,
      tokenService,
      conferenceService,
      huddleService,
      userService,
    });
  };

  useEffect(() => {
    initState();
    // eslint-disable-next-line
  }, []);

  if (!state) {
    return <ProgressBar isIndeterminate />;
  }

  return <Huddle />;
}
