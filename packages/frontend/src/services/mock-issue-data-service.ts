import { IssueDataService } from "./issue-data-service";

export default function mockIssueDataService(): IssueDataService {
  if (!localStorage["mockIssueDataService"]) {
    localStorage["mockIssueDataService"] = JSON.stringify({});
  }

  return {
    getProperty: async (key) =>
      JSON.parse(localStorage["mockIssueDataService"])[key],
    setProperty: async (key, value) => {
      localStorage["mockIssueDataService"] = JSON.stringify({
        ...JSON.parse(localStorage["mockIssueDataService"]),
        [key]: value,
      });
    },
    removeProperty: async (key) => {
      const object = JSON.parse(localStorage["mockIssueDataService"]);
      delete object[key];
      localStorage["mockIssueDataService"] = JSON.stringify(object);
    },
  };
}
