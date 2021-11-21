import React, { useEffect, useState } from "react";

import VoxeetSDK from "@voxeet/voxeet-web-sdk";

import Button from "@atlaskit/button";
import SectionMessage from "@atlaskit/section-message";
import VidShareScreenIcon from "@atlaskit/icon/glyph/vid-share-screen";
import styled from "@emotion/styled";

import huddleIcon from "../assets/huddle-icon.svg";

export default function ScreenSharingPage() {
  const initSession = async () => {
    const { token, externalId, conferenceId } = JSON.parse(
      decodeURIComponent(document.location.hash.split("#screenSharing")[1])
    );
    VoxeetSDK.initializeToken(token, () => token);
    await VoxeetSDK.session.open({ externalId });
    const conference = await VoxeetSDK.conference.fetch(conferenceId);
    await VoxeetSDK.conference.join(conference, {
      constraints: {
        video: false,
        audio: false,
        screen: false,
      },
    });

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
        <img src={huddleIcon} alt="Huddle in Jira" height={32} style={{ marginRight: "8px" }} /> Screensharing for
        Huddle in Jira
      </h1>
      <br />
      <SectionMessage>
        This page is used to share your screen with your colleagues.
        <br />
        Please note that you are invited to this page due to Atlassian Forge limitations (
        <a href="https://ecosystem.atlassian.net/browse/FRGE-555" target="_blank" rel="noreferrer">
          details here
        </a>
        ).
        <br />
        <br />
        <b>Huddle in Jira</b> will stop using this intermediate page hopefully very soon.
      </SectionMessage>
      <br />
      <Button
        isSelected={isSharing}
        appearance={"primary"}
        onClick={() => {
          if (!isSharing) {
            VoxeetSDK.conference.startScreenShare();
            setSharing(true);
          } else {
            VoxeetSDK.conference.stopScreenShare();
            setSharing(false);
          }
        }}
        iconBefore={<VidShareScreenIcon label="Screen share" />}
      >
        {isSharing ? "Stop screen sharing" : "Start screen sharing"}
      </Button>
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
