import {
  HuddleContextProvider,
  useHuddleState,
  useHuddleStateWrite,
} from "../state/huddle-context";
import React, { useEffect } from "react";
import Huddle from "../components/huddle";
import mockIssueDataService from "../services/mock-issue-data-service";
import { mockTokenService } from "../services/token-service";
import mockConferenceService from "../services/mock-conference-service";

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

  useEffect(() => {
    setState({
      isConnected: false,

      issueDataService: mockIssueDataService(),
      tokenService: mockTokenService(),
      conferenceService: mockConferenceService(),
    });
  }, []);

  if (!state) {
    return <b>"Loading..."</b>;
  }

  return <Huddle />;
}
