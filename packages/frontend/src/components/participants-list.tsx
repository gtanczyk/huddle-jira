import React from "react";

import Avatar from "@atlaskit/avatar";
import styled from "@emotion/styled";
import Tooltip from "@atlaskit/tooltip";
import VidAudioMutedIcon from "@atlaskit/icon/glyph/vid-audio-muted";
import ScreenIcon from "@atlaskit/icon/glyph/screen";
import VidSpeakingCircleIcon from "@atlaskit/icon/glyph/vid-speaking-circle";

import { useParticipants, useSpeakingStatus } from "../hooks/participants";
import { useUserDetails } from "../hooks/users";

export default function ParticipantList() {
  const participants = useParticipants();

  return (
    <ParticipantListContainer>
      {participants
        ?.filter((participant) => !participant.accountId.startsWith("share:"))
        .map((participant) => (
          <Participant
            key={participant.accountId}
            accountId={participant.accountId}
            isMuted={participant.isMuted === true}
            isScreenSharing={
              participant.isScreenSharing === true ||
              participants.some((p) => p.isScreenSharing === true && p.accountId === `share:${participant.accountId}`)
            }
          />
        ))}
    </ParticipantListContainer>
  );
}

function Participant({
  accountId,
  isScreenSharing,
  isMuted,
}: {
  accountId: string;
  isScreenSharing: boolean;
  isMuted: boolean;
}) {
  const userDetails = useUserDetails(accountId);
  const speaking = useSpeakingStatus(accountId);

  return (
    <ParticipantContainer>
      <Tooltip content={userDetails?.displayName || "Unknown user"}>
        <Avatar name={userDetails?.displayName} src={userDetails?.avatarUrls["32x32"]} />
      </Tooltip>
      {speaking === "speaking" && (
        <SmallIcon style={{ left: 0 }}>
          <VidSpeakingCircleIcon size="small" label="This participant is speaking" />
        </SmallIcon>
      )}
      {isScreenSharing && (
        <SmallIcon style={{ background: "#0052cc", right: 0 }}>
          <ScreenIcon primaryColor="white" label="Participant is sharing their screen" size="small" />
        </SmallIcon>
      )}
      {isMuted && (
        <SmallIcon style={{ background: "#DFE1E6", left: 0 }}>
          <VidAudioMutedIcon label="Participant is muted" size="small" />
        </SmallIcon>
      )}
    </ParticipantContainer>
  );
}

const ParticipantListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  margin-left: 12px;
`;

const ParticipantContainer = styled.div`
  display: flex;
  position: relative;
`;

const SmallIcon = styled.span`
  position: absolute;
  bottom: 0;
  border-radius: 50%;
  padding: 0 2px;
`;
