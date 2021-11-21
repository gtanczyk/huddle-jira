import { useEffect, useState } from "react";

import { useHuddleState } from "../state/huddle-context";
import { Participant, SpeakingStatus } from "../services/conference-service";

export function useParticipants() {
  const state = useHuddleState();
  const [participants, setParticipants] = useState<Participant[]>();

  useEffect(() => {
    if (state?.isConnected) {
      state.conferenceService.onParticipants(setParticipants);
      return () => state.conferenceService.offParticipants(setParticipants);
    } else {
      state?.huddleService.getParticipants().then(setParticipants);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.isConnected]);

  return participants;
}

export function useSpeakingStatus(accountId: string): SpeakingStatus {
  const state = useHuddleState();
  const [speaking, setSpeaking] = useState<SpeakingStatus>("silent");

  useEffect(() => {
    if (state?.isConnected) {
      return state.conferenceService.onSpeaking(accountId, setSpeaking);
    }
    // eslint-disable-next-line
  }, [state?.isConnected]);

  return speaking;
}
