import { createContainer } from "react-tracked";
import { useState } from "react";

import { TokenService } from "../services/token-service";
import { IssueDataService } from "../services/issue-data-service";
import { ConferenceService } from "../services/conference-service";

type HuddleState = {
  isConnected: boolean;

  issueDataService: IssueDataService;
  tokenService: TokenService;
  conferenceService: ConferenceService;
};

const useValue = () => useState<HuddleState | null>(null);

const { Provider, useTrackedState, useUpdate, useSelector } =
  createContainer(useValue);

export function HuddleContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider>{children}</Provider>;
}

export function useHuddleStateSelector(
  selector: (state: HuddleState | null) => any
) {
  return useSelector(selector);
}

export function useHuddleState() {
  return useTrackedState();
}

export function useHuddleStateWrite() {
  return useUpdate();
}
