import Huddle from "../components/huddle";
import {
  HuddleContextProvider,
  useHuddleState,
  useHuddleStateWrite,
} from "../state/huddle-context";
import React, { useEffect } from "react";

import forgeIssueDataService from "../services/forge-issue-data-service";
import forgeTokenService from "../services/forge-token-service";
import forgeConferenceService from "../services/forge-conference-service";

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
    setState({
      isConnected: false,

      issueDataService: await forgeIssueDataService(),
      tokenService: forgeTokenService(),
      conferenceService: await forgeConferenceService(),
    });
  };

  useEffect(() => {
    initState();
  }, []);

  if (!state) {
    return <b>"Loading..."</b>;
  }

  return <Huddle />;
}
