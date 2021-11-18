import React, { useState } from "react";

import Button from "@atlaskit/button";
import VidAudioOnIcon from "@atlaskit/icon/glyph/vid-audio-on";
import VidAudioMutedIcon from "@atlaskit/icon/glyph/vid-audio-muted";
import VidShareScreenIcon from "@atlaskit/icon/glyph/vid-share-screen";

import { useMute, useScreenSharing } from "../hooks/conference";
import { useParticipants } from "../hooks/participants";
import { useHuddleState, useHuddleStateWrite } from "../state/huddle-context";
import InlineMessage from "@atlaskit/inline-message";
import styled from "@emotion/styled";

export default function HuddleControls() {
  return (
    <HuddleControlsContainer>
      <MuteButton /> <ScreenSharingButton />
    </HuddleControlsContainer>
  );
}

function MuteButton() {
  const [isMuted, setMute] = useMute();

  return (
    <Button
      onClick={() => setMute(!isMuted)}
      iconBefore={
        isMuted ? (
          <VidAudioMutedIcon label="You are not sharing your microphone" />
        ) : (
          <VidAudioOnIcon label="You are sharing your microphone" />
        )
      }
    >
      {isMuted ? "Unmute" : "Mute"}
    </Button>
  );
}

function ScreenSharingButton() {
  let [isScreenSharing, setScreenSharing] = useScreenSharing();
  const participants = useParticipants();
  const state = useHuddleState();
  const [sharingError, setSharingError] = useState(false);

  if (!state) {
    return null;
  }

  const sharingParticipant = participants?.find(
    (participant) => participant.isScreenSharing
  );

  isScreenSharing =
    isScreenSharing && sharingParticipant?.accountId === state.accountId;

  return (
    <>
      <Button
        isDisabled={
          !!sharingParticipant &&
          (!isScreenSharing ||
            sharingParticipant?.accountId !== state.accountId)
        }
        isSelected={isScreenSharing}
        onClick={async () => {
          try {
            await setScreenSharing(!isScreenSharing);
            setSharingError(false);
          } catch (e) {
            setSharingError(true);
          }
        }}
        iconBefore={
          <VidShareScreenIcon label="Click to start sharing your screen" />
        }
      >
        Screen sharing
      </Button>
      {sharingError && (
        <InlineMessage title="Error sharing screen" type="error">
          An error occurred. Please try again later.
        </InlineMessage>
      )}
    </>
  );
}

const HuddleControlsContainer = styled.div`
  display: flex;
  align-items: center;
`;
