import React, { useEffect, useRef } from "react";
import VidFullScreenOnIcon from "@atlaskit/icon/glyph/vid-full-screen-on";
import { useHuddleState } from "../state/huddle-context";
import { Participant } from "../services/conference-service";
import { useParticipantScreenShareStream } from "../hooks/conference";
import styled from "@emotion/styled";
import Button from "@atlaskit/button";
import { useParticipants } from "../hooks/participants";

export default function ScreenShareWatch() {
  const participants = useParticipants();

  const sharingParticipant = participants?.find(
    (participant) => participant.isScreenSharing
  );

  if (!sharingParticipant) {
    return null;
  }

  return <ScreenShareStream participant={sharingParticipant} />;
}

function ScreenShareStream({ participant }: { participant: Participant }) {
  const ref = useRef<HTMLDivElement>(null);
  const participantScreenShareStream =
    useParticipantScreenShareStream(participant);
  const state = useHuddleState();

  useEffect(() => {
    if (!state) {
      return;
    }

    if (ref.current && !ref.current?.querySelector("video")) {
      const stream =
        state.conferenceService.getParticipantScreenShare(participant);
      if (!stream) {
        return;
      }

      const video: HTMLVideoElement = document.createElement("video");
      video.autoplay = true;
      video.srcObject = stream;
      ref.current.appendChild(video);
    }
  }, [ref, participantScreenShareStream, state?.conferenceService]);

  return (
    <ScreenShareWatchContainer
      ref={ref}
      onClick={(event) => {
        if (!event.isDefaultPrevented()) {
          ref.current?.querySelector("video")?.requestFullscreen();
        }
      }}
    >
      <span className="click-label">Click to open in full screen</span>
      <ScreenShareControls>
        <Button
          color="white"
          iconBefore={<VidFullScreenOnIcon label="Show full screen" />}
          onClickCapture={(event) => {
            event.preventDefault();
            ref.current?.querySelector("video")?.requestFullscreen();
          }}
        />
        {HTMLVideoElement.prototype.requestPictureInPicture && (
          <>
            {" "}
            <Button
              iconBefore={<PIPIcon />}
              onClickCapture={(event) => {
                event.preventDefault();
                ref.current?.querySelector("video")?.requestPictureInPicture();
              }}
            />
          </>
        )}
      </ScreenShareControls>
    </ScreenShareWatchContainer>
  );
}

const ScreenShareWatchContainer = styled.div`
  max-width: 256px;
  max-height: 256px;
  position: relative;
  cursor: pointer;

  &:not(:hover) .click-label {
    display: none;
  }

  .click-label {
    position: absolute;
    left: 50%;
    top: 50%;
    color: white;
    transform: translate(-50%, -50%);
    white-space: nowrap;
    z-index: 1;
  }

  video {
    max-width: 100%;
    max-height: 100%;
    pointer-events: none;
  }

  &:hover button span {
    color: white;
  }

  &:hover video {
    filter: brightness(50%);
  }
`;

const ScreenShareControls = styled.div`
  position: absolute;
  right: 5px;
  bottom: 5px;
  z-index: 1;
`;

const PIPIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M6 18H9L9.70711 18.2929L10 19L9.70711 19.7071L9 20H6C5.46957 20 4.96086 19.7893 4.58579 19.4142C4.21071 19.0391 4 18.5304 4 18V15L4.5 14.5L5 14C5 14 5.32614 14.3261 5.51367 14.5137L6 15V18ZM18 20H9L9.70711 19.7071L10 19L9.70711 18.2929L9 18H18V15L18.2929 14.2929L19 14L19.7071 14.2929L20 15V18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20ZM6 4H9L9.70711 4.29289L10 5L9.70711 5.70711L9 6H6V9C6 9.26522 6 15 6 15L5.5 14.5L5 14L4 15C4 15 4 9.26522 4 9V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4ZM18 6H9L9.70711 5.70711L10 5L9.70711 4.29289L9 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V15L19.7071 14.2929L19 14L18.2929 14.2929L18 15V6Z"
      fill="currentColor"
    />
    <rect x="11" y="13" width="6" height="4" rx="1" fill="currentColor" />
  </svg>
);
