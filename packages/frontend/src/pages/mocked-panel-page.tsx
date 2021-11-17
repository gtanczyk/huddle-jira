import React, { useEffect } from "react";
import ProgressBar from "@atlaskit/progress-bar";
import {
  HuddleContextProvider,
  useHuddleState,
  useHuddleStateWrite,
} from "../state/huddle-context";
import Huddle from "../components/huddle";
import mockIssueDataService from "../services/mock-issue-data-service";
import { mockTokenService } from "../services/token-service";
import mockConferenceService from "../services/mock-conference-service";
import { getHuddleService } from "../services/huddle-service";
import { mockUserService } from "../services/mock-user-service";

export default function MockedPanelPage() {
  return (
    <HuddleContextProvider>
      <MockedPanelPageContent />
    </HuddleContextProvider>
  );
}

function MockedPanelPageContent() {
  const state = useHuddleState();
  const setState = useHuddleStateWrite();

  const initState = async () => {
    const userService = mockUserService();
    const accountId = await userService.getAccountId();

    const issueDataService = mockIssueDataService();
    const conferenceService = mockConferenceService(accountId);
    const huddleService = getHuddleService(
      accountId,
      issueDataService,
      conferenceService
    );

    await huddleService.init();

    setState({
      isConnected: false,

      issueDataService,
      tokenService: mockTokenService(),
      conferenceService,
      huddleService,
      userService,
    });
  };

  useEffect(() => {
    initState();
  }, []);

  if (!state) {
    return <ProgressBar isIndeterminate />;
  }

  return <Huddle />;
}
