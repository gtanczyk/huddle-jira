import { invoke, requestJira, requestConfluence } from "@forge/bridge";

import { ContentPropertyService } from "./content-property-service";

export default async function forgeContentPropertyService(): Promise<ContentPropertyService> {
  const { issue, content } = await invoke("getProductContext");

  const requestProduct = issue ? requestJira : requestConfluence;
  const propertyPath = (key: string) =>
    issue ? `/rest/api/3/issue/${issue.id}/properties/${key}` : `/wiki/rest/api/content/${content.id}/property/${key}`;

  return {
    async getProperty(key) {
      const response = await requestProduct(propertyPath(key));
      return response.status === 200 ? (await response.json()).value : undefined;
    },
    async removeProperty(key) {
      await requestProduct(propertyPath(key), {
        method: "DELETE",
      });
    },
    async setProperty(key, value) {
      await requestProduct(propertyPath(key), {
        method: requestProduct === requestConfluence ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestProduct === requestConfluence ? { value } : value),
      });
    },
  };
}
