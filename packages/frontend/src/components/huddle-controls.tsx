import React from "react";

import Button from "@atlaskit/button";
import VidAudioOnIcon from "@atlaskit/icon/glyph/vid-audio-on";
import VidAudioMutedIcon from "@atlaskit/icon/glyph/vid-audio-muted";
import { useMute } from "../hooks/conference";

export default function HuddleControls() {
  const [isMuted, setMute] = useMute();

  return (
    <>
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
    </>
  );
}

// iconEnabled = {}
// iconDisabled = {
// <VidAudioMutedIcon label="You are not sharing your microphone"/>
// }

// iconEnabled={<VidShareScreenIcon label="You are sharing your screen" />}
// iconDisabled={<VidShareScreenIcon label="You are not sharing your screen" />}
