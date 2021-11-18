import styled from "@emotion/styled";
import VidHangUpIcon from "@atlaskit/icon/glyph/vid-hang-up";

import { useHuddleDisconnect } from "../state/huddle-actions";
import ParticipantList from "./participants-list";
import AsyncButton from "./async-button";
import HuddleControls from "./huddle-controls";

export default function HuddleConnected() {
  const disconnect = useHuddleDisconnect();

  return (
    <>
      <HuddleConnectedContainer>
        <AsyncButton
          onClick={disconnect}
          iconBefore={<VidHangUpIcon label="Disconnect" />}
          appearance="danger"
        >
          Leave huddle
        </AsyncButton>
        <ParticipantList />
      </HuddleConnectedContainer>
      <HuddleControls />
    </>
  );
}

const HuddleConnectedContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;
