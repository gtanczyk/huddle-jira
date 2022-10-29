import React from "react";

import { useHuddleStateSelector } from "../state/huddle-context";

import HuddleConnected from "./huddle-connected";
import HuddleConnect from "./huddle-connect";

export default function Huddle({ autoConnect = false }) {
  const isConnected = useHuddleStateSelector((state) => state?.isConnected);

  if (isConnected) {
    return <HuddleConnected autoConnect={autoConnect} />;
  } else {
    return <HuddleConnect autoConnect={autoConnect} />;
  }
}
