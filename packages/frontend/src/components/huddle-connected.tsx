import styled from "@emotion/styled";
import VidHangUpIcon from "@atlaskit/icon/glyph/vid-hang-up";

import { useHuddleDisconnect } from "../state/huddle-actions";
import ParticipantList from "./participants-list";
import AsyncButton from "./async-button";

export default function HuddleConnected() {
  const disconnect = useHuddleDisconnect();

  return (
    <HuddleConnectedContainer>
      <AsyncButton
        onClick={disconnect}
        iconBefore={<VidHangUpIcon label="Disconnect" />}
        appearance="danger"
      />
      <ParticipantList />
    </HuddleConnectedContainer>
  );
}

const HuddleConnectedContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
