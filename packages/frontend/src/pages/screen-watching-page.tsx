import React, { useEffect, useRef, useState } from "react";
import VoxeetSDK from "@voxeet/voxeet-web-sdk";
import SectionMessage from "@atlaskit/section-message";
import styled from "@emotion/styled";
import { videoControlStyles } from "../components/screen-share-watch";
import huddleIcon from "../assets/huddle-icon.svg";

export default function ScreenWatchingPage() {
  const ref = useRef<HTMLDivElement>(null);

  const initSession = async () => {
    const { token, externalId, conferenceId, sharingParticipantId } =
      JSON.parse(
        decodeURIComponent(document.location.hash.split("#screenWatching")[1])
      );
    VoxeetSDK.initializeToken(token, () => token);
    await VoxeetSDK.session.open({ externalId });
    const conference = await VoxeetSDK.conference.fetch(conferenceId);
    await VoxeetSDK.conference.join(conference, {});
    await VoxeetSDK.conference.mute(VoxeetSDK.session.participant, true);
    Array.from(VoxeetSDK.conference.participants.values()).forEach(
      async (participant) => {
        await VoxeetSDK.conference.mute(participant, true);
      }
    );

    const participants = Array.from(VoxeetSDK.conference.participants.values());

    const sharingParticipant = participants.find(
      (participant) => participant.info.externalId === sharingParticipantId
    );
    if (sharingParticipant && ref.current) {
      const stream = sharingParticipant.streams.find(
        (stream) => stream.type === "ScreenShare" && stream.active
      );
      if (stream) {
        const video: HTMLVideoElement = document.createElement("video");
        video.autoplay = true;
        video.srcObject = stream;
        ref.current.appendChild(video);
      }
    }

    window.onbeforeunload = () => {
      VoxeetSDK.conference.leave();
      VoxeetSDK.session.close();
    };
  };

  useEffect(() => {
    initSession();
  }, []);

  const [isSharing, setSharing] = useState(false);

  return (
    <PageContainer>
      <h1 style={{ display: "flex" }}>
        <img src={huddleIcon} alt="Huddle in Jira" height={32} /> Huddle in Jira
      </h1>
      <br />
      <SectionMessage>
        This page is used to display screen shares of your colleages.
        <br />
        Please note that you are invited to this page due to Atlassian Forge
        limitations (
        <a
          href="https://ecosystem.atlassian.net/browse/FRGE-534"
          target="_blank"
        >
          details here
        </a>
        ).
        <br />
        <br />
        <b>Huddle in Jira</b> will stop using this intermediate page hopefully
        very soon.
      </SectionMessage>
      <br />
      <VideoContainer
        ref={ref}
        onClick={(event) => {
          if (!event.isDefaultPrevented()) {
            ref.current?.querySelector("video")?.requestFullscreen();
          }
        }}
      >
        <span className="click-label">Click to open in full screen</span>
      </VideoContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  max-height: 100%;
  width: 640px;
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;

  ${videoControlStyles}
`;
