import { useState } from "react";
import { useHuddleState } from "../state/huddle-context";

export function useMute(): [boolean, (isMuted: boolean) => void] {
  const state = useHuddleState();
  const [isMuted, setMuted] = useState<boolean>(() => {
    return state?.conferenceService.isMuted() || false;
  });

  return [
    isMuted,
    (isMuted: boolean) => {
      if (state?.conferenceService) {
        state.conferenceService.setMuted(isMuted);
        setMuted(isMuted);
      }
    },
  ];
}
