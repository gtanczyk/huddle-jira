import { ContentPropertyService } from "./content-property-service";

export default async function mockContentPropertyService(): Promise<ContentPropertyService> {
  const { issue, content } = await (await fetch("/api/getProductContext")).json();

  const propertyPath = (key: string) =>
    issue ? `/rest/api/3/issue/${issue.id}/properties/${key}` : `/wiki/rest/api/content/${content.id}/property/${key}`;

  return {
    async getProperty(key) {
      const response = await fetch(propertyPath(key));
      return response.status === 200 ? (await response.json()).value : undefined;
    },
    async removeProperty(key) {
      await fetch(propertyPath(key), {
        method: "DELETE",
      });
    },
    async setProperty(key, value) {
      await fetch(propertyPath(key), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });
    },
  };
}
