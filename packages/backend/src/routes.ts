export type RouteRequest = {
  context: {
    [key: string]: any;
  };
};

export type Routes = {
  getToken(): Promise<string>;
  getJiraContext(request: RouteRequest): Promise<Record<string, any>>;
  getAccountId(request: RouteRequest): Promise<string>;
};
