import { UserService } from "./user-service";

export function mockUserService(): UserService {
  return {
    async getAccountId() {
      return navigator.userAgent;
    },

    async getUserDetails(accountId: string) {
      return {
        displayName: navigator.userAgent,
        avatarUrls: {
          "48x48":
            "https://lh3.googleusercontent.com/a-/AOh14Ghr1RBkb4Y3E5KZTdNTyTzOeS3Zs4ANiKvxawXw=s96-c",
          "32x32":
            "https://lh3.googleusercontent.com/a-/AOh14Ghr1RBkb4Y3E5KZTdNTyTzOeS3Zs4ANiKvxawXw=s96-c",
          "24x24":
            "https://lh3.googleusercontent.com/a-/AOh14Ghr1RBkb4Y3E5KZTdNTyTzOeS3Zs4ANiKvxawXw=s96-c",
          "16x16":
            "https://lh3.googleusercontent.com/a-/AOh14Ghr1RBkb4Y3E5KZTdNTyTzOeS3Zs4ANiKvxawXw=s96-c",
        },
      };
    },
  };
}
