import React from "react";
import Avatar from "@atlaskit/avatar";
import styled from "@emotion/styled";
import Tooltip from "@atlaskit/tooltip";
import InlineMessage from "@atlaskit/inline-message";

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
      {participants?.length === 0 && <NoParticipants />}
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

function NoParticipants() {
  return (
    <InlineMessage secondaryText="Empty huddle, no one is speaking.">
      This huddle is empty, you can join it and invite your team!
    </InlineMessage>
  );
}

const ParticipantListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: center;
`;

const ParticipantContainer = styled.div`
  display: flex;
`;
