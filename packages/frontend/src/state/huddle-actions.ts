import { v4 as uuidv4 } from "uuid";

import { useHuddleState, useHuddleStateWrite } from "./huddle-context";

export function useHuddleConnect() {
  const state = useHuddleState();
  const setState = useHuddleStateWrite();

  return async () => {
    if (!state) {
      throw new Error("State not initialised!");
    }

    let huddleRoomAlias = await state.contentPropertyService.getProperty<string>("huddleRoomAlias");
    if (!huddleRoomAlias) {
      await state.contentPropertyService.setProperty("huddleRoomAlias", (huddleRoomAlias = uuidv4()));
    }
    if (!huddleRoomAlias) {
      // Should never happen, but typescript doesn't know that
      throw new Error("Failed to get huddle room alias!");
    }

    let huddleRoomId = await state.contentPropertyService.getProperty<string>("huddleRoomId");

    if (!huddleRoomId || !(await state.conferenceService.roomExists(huddleRoomId))) {
      huddleRoomId = await state.conferenceService.createRoom(huddleRoomAlias);
      await state.contentPropertyService.setProperty("huddleRoomId", huddleRoomId);
      state.conferenceService.setRoom(huddleRoomId);
    }

    await state.conferenceService.joinRoom();
    await state.huddleService.join();

    setState({ ...state, isConnected: true });
  };
}

export function useHuddleDisconnect() {
  const state = useHuddleState();
  const setState = useHuddleStateWrite();

  return async () => {
    if (!state) {
      throw new Error("State not initialised!");
    }

    await state.conferenceService.leaveRoom();
    await state.huddleService.leave();
    setState({ ...state, isConnected: false });
  };
}
