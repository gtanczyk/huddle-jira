import React from "react";

import styled from "@emotion/styled";

import { useHuddleConnect } from "../state/huddle-actions";

import AsyncButton from "./async-button";
import ParticipantList from "./participants-list";

export default function HuddleConnect() {
  const connect = useHuddleConnect();

  return (
    <HuddleConnectContainer>
      <AsyncButton appearance="primary" onClick={connect} iconBefore={<HuddleIcon />}>
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
  min-height: 40px;
`;

const HuddleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6 6.5C6 5.94781 5.55219 5.5 5 5.5H4.5C3.39531 5.5 2.5 6.39531 2.5 7.5V9C2.5 10.1047 3.39531 11 4.5 11H5C5.55219 11 6 10.5522 6 10V6.5ZM11.5 11C12.6047 11 13.5 10.1047 13.5 9V7.5C13.5 6.39531 12.6047 5.5 11.5 5.5H11C10.4478 5.5 10 5.94781 10 6.5V10C10 10.5522 10.4478 11 11 11H11.5ZM8 0C3.53687 0 0.143125 3.71344 0 8V8.5C0 8.77625 0.22375 9 0.5 9H1C1.27625 9 1.5 8.77625 1.5 8.5V8C1.5 4.41594 4.41594 1.5 8 1.5C11.5841 1.5 14.5 4.41594 14.5 8H14.4963C14.4987 8.07594 14.5 13.1788 14.5 13.1788C14.5 13.9084 13.9084 14.5 13.1788 14.5H10C10 13.6716 9.32844 13 8.5 13H7.5C6.67156 13 6 13.6716 6 14.5C6 15.3284 6.67156 16 7.5 16H13.1788C14.7369 16 16 14.7369 16 13.1788V8C15.8569 3.71344 12.4631 0 8 0Z"
      fill="white"
    />
  </svg>
);
