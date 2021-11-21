export type RouteRequest = {
  context: {
    [key: string]: unknown;
  };
};

export type Routes = {
  getToken(): Promise<string>;
  getJiraContext(request: RouteRequest): Promise<Record<string, unknown>>;
  getAccountId(request: RouteRequest): Promise<string>;
};
