import { useHuddleStateSelector } from "../state/huddle-context";
import HuddleConnected from "./huddle-connected";
import HuddleConnect from "./huddle-connect";

export default function Huddle() {
  const isConnected = useHuddleStateSelector((state) => state?.isConnected);

  if (isConnected) {
    return <HuddleConnected />;
  } else {
    return <HuddleConnect />;
  }
}
