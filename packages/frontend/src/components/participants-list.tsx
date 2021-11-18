import React from "react";
import Avatar from "@atlaskit/avatar";
import styled from "@emotion/styled";
import Tooltip from "@atlaskit/tooltip";

import { useParticipants, useSpeakingStatus } from "../hooks/participants";
import { useUserDetails } from "../hooks/users";
import { shake, shakeStrong } from "./shake-styles";
import { SpeakingStatus } from "../services/conference-service";
import { css } from "@emotion/react";

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
          />
        ))}
    </ParticipantListContainer>
  );
}

function Participant({ accountId }: { accountId: string }) {
  const userDetails = useUserDetails(accountId);
  const speaking = useSpeakingStatus(accountId);

  return (
    <ParticipantContainer speaking={speaking}>
      <Tooltip content={userDetails?.displayName || "Unknown user"}>
        <Avatar
          name={userDetails?.displayName}
          src={userDetails?.avatarUrls["32x32"]}
        />
      </Tooltip>
    </ParticipantContainer>
  );
}

const ParticipantListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  margin-left: 12px;
`;

const ParticipantContainer = styled.div<{ speaking: SpeakingStatus }>`
  display: flex;

  ${({ speaking }) =>
    speaking !== "silent" &&
    css`
      animation-name: ${speaking === "speaking-a-lot" ? shakeStrong : shake};
      animation-duration: 0.4s;
      animation-iteration-count: infinite;
    `}
`;
