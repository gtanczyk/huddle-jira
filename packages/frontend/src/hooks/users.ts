import { useAsync } from "react-async-hook";

import { useHuddleState } from "../state/huddle-context";

export function useUserDetails(accountId: string) {
  const state = useHuddleState();

  const { result } = useAsync(async () => {
    return state?.userService.getUserDetails(accountId);
  }, [accountId, state?.userService]);

  return result;
}
