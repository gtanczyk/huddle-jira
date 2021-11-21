import { IssueDataService } from "./issue-data-service";

export default async function mockIssueDataService(): Promise<IssueDataService> {
  const { issue } = await (await fetch("/api/getJiraContext")).json();

  return {
    async getProperty(key) {
      const response = await fetch(`/rest/api/3/issue/${issue.id}/properties/${key}`);
      return response.status === 200 ? (await response.json()).value : undefined;
    },
    async removeProperty(key) {
      await fetch(`/rest/api/3/issue/${issue.id}/properties/${key}`, {
        method: "DELETE",
      });
    },
    async setProperty(key, value) {
      await fetch(`/rest/api/3/issue/${issue.id}/properties/${key}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });
    },
  };
}
