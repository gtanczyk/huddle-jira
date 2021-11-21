import React, { useEffect } from "react";
import ProgressBar from "@atlaskit/progress-bar";
import { HuddleContextProvider, useHuddleState, useHuddleStateWrite } from "../state/huddle-context";
import Huddle from "../components/huddle";
import mockIssueDataService from "../services/mock-issue-data-service";
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

    const issueDataService = await mockIssueDataService();
    const conferenceService = await mockConferenceService(accountId, tokenService);
    const huddleService = getHuddleService(accountId, issueDataService, conferenceService);

    await huddleService.init();

    setState({
      accountId,
      isConnected: false,

      issueDataService,
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
