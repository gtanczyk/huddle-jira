import React from "react";

import HipchatDialOutIcon from "@atlaskit/icon/glyph/hipchat/dial-out";

import { useHuddleConnect } from "../state/huddle-actions";
import AsyncButton from "./async-button";
import styled from "@emotion/styled";
import ParticipantList from "./participants-list";

export default function HuddleConnect() {
  const connect = useHuddleConnect();

  return (
    <HuddleConnectContainer>
      <AsyncButton
        onClick={connect}
        iconBefore={<HipchatDialOutIcon label="Connect" />}
      >
        Join huddle
      </AsyncButton>
      <ParticipantList />
    </HuddleConnectContainer>
  );
}
const HuddleConnectContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
