export type IssueDataService = {
  getProperty: <T>(key: string) => Promise<T | undefined>;
  setProperty: <T>(key: string, value: T) => Promise<void>;
  removeProperty: (key: string) => Promise<void>;
};
