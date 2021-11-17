import { useHuddleState } from "../state/huddle-context";
import { useEffect, useState } from "react";
import { Participant } from "../services/conference-service";

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
  }, [state?.isConnected]);

  return participants;
}
