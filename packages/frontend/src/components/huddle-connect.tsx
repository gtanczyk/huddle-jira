import { useHuddleConnect } from "../state/huddle-actions";

export default function HuddleConnect() {
  const connect = useHuddleConnect();

  return (
    <>
      <button
        onClick={() => {
          connect();
        }}
      >
        Connect
      </button>
    </>
  );
}
