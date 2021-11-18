type UserDetails = {
  displayName: string;
  avatarUrls: Record<"48x48" | "32x32" | "24x24" | "16x16", string>;
};

export type UserService = {
  getAccountId(): Promise<string>;
  getUserDetails(accountId: string): Promise<UserDetails>;
};
