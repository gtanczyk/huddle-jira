import React from "react";
import Avatar from "@atlaskit/avatar";
import styled from "@emotion/styled";
import Tooltip from "@atlaskit/tooltip";

import { useParticipants } from "../hooks/participants";
import { useUserDetails } from "../hooks/users";

export default function ParticipantList() {
  const participants = useParticipants();

  return (
    <ParticipantListContainer>
      {participants?.map((participant) => (
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

  return (
    <ParticipantContainer>
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
`;

const ParticipantContainer = styled.div`
  display: flex;
`;
