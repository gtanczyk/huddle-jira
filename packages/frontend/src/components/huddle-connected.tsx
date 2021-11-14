import { useHuddleDisconnect } from "../state/huddle-actions";
import { useHuddleState } from "../state/huddle-context";

export default function HuddleConnected() {
  const disconnect = useHuddleDisconnect();

  return (
    <>
      <button onClick={disconnect}>Disconnect</button>
    </>
  );
}
