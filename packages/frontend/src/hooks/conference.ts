import { useState } from "react";
import { useHuddleState } from "../state/huddle-context";
import { Participant } from "../services/conference-service";

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

export function useScreenSharing(): [
  boolean,
  (isScreenSharing: boolean) => void
] {
  const state = useHuddleState();
  const [isScreenSharing, setScreenSharing] = useState<boolean>(() => {
    return state?.conferenceService.isScreenSharing() || false;
  });

  return [
    isScreenSharing,
    async (isScreenSharing: boolean) => {
      if (state?.conferenceService) {
        if (isScreenSharing) {
          await state.conferenceService.startScreenSharing();
        } else {
          await state.conferenceService.stopScreenSharing();
        }
        setScreenSharing(isScreenSharing);
      }
    },
  ];
}

export function useParticipantScreenShareStream(participant: Participant) {
  const state = useHuddleState();

  return state?.conferenceService.getParticipantScreenShare(participant);
}
