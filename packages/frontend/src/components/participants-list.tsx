import React from "react";
import Avatar from "@atlaskit/avatar";
import styled from "@emotion/styled";

import { useParticipants } from "../hooks/participants";

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
  return (
    <ParticipantContainer>
      <Avatar name="dupa" />
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
