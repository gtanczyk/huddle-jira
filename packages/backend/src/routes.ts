export type RouteRequest = {
  context: {
    [key: string]: unknown;
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PostRequestFn = <T>(
  url: string,
  data: Record<string, unknown>,
  config: Record<string, unknown>
) => Promise<T>;

export type Routes = {
  getToken(): Promise<string>;
  getJiraContext(request: RouteRequest): Promise<Record<string, unknown>>;
  getAccountId(request: RouteRequest): Promise<string>;
};
