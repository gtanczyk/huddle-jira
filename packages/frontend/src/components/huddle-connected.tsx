import React from "react";

import styled from "@emotion/styled";
import VidHangUpIcon from "@atlaskit/icon/glyph/vid-hang-up";

import { useHuddleDisconnect } from "../state/huddle-actions";

import ParticipantList from "./participants-list";
import AsyncButton from "./async-button";
import HuddleControls from "./huddle-controls";
import ScreenShareWatch from "./screen-share-watch";

export default function HuddleConnected() {
  const disconnect = useHuddleDisconnect();

  return (
    <Container>
      <Column>
        <HuddleConnectedContainer>
          <AsyncButton onClick={disconnect} iconBefore={<VidHangUpIcon label="Disconnect" />} appearance="danger">
            Leave huddle
          </AsyncButton>
          <ParticipantList />
        </HuddleConnectedContainer>
        <HuddleControls />
      </Column>
      <Column>
        <ScreenShareWatch />
      </Column>
    </Container>
  );
}

const HuddleConnectedContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  min-height: 40px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Column = styled.div``;
