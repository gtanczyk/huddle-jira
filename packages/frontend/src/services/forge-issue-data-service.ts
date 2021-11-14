import { invoke, requestJira } from "@forge/bridge";
import { IssueDataService } from "./issue-data-service";

export default async function forgeIssueDataService(): Promise<IssueDataService> {
  const { issue } = await invoke("getJiraContext");

  return {
    async getProperty(key) {
      const response = await requestJira(
        `/rest/api/3/issue/${issue.id}/properties/${key}`
      );
      return response.status === 200
        ? (await response.json()).value
        : undefined;
    },
    async removeProperty(key) {
      await requestJira(`/rest/api/3/issue/${issue.id}/properties/${key}`, {
        method: "DELETE",
      });
    },
    async setProperty(key, value) {
      await requestJira(`/rest/api/3/issue/${issue.id}/properties/${key}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });
    },
  };
}
