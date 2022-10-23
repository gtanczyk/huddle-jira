import { Application } from "express";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bodyParser = require("body-parser");

export default function confluenceMocks(app: Application) {
  // user data

  app.get("/rest/api/3/user", (req, res) => {
    res.send({
      displayName: req.query.accountId,
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
    });
  });

  // content properties

  const contentProperties = {} as {
    [contentId: string]: { [propertyKey: string]: unknown };
  };

  app.get(
    "/wiki/rest/api/content/:contentId/property/:propertyKey",
    (req, res) => {
      const value =
        contentProperties[req.params.contentId]?.[req.params.propertyKey];
      if (value) {
        res.send({ value: value });
      } else {
        res.sendStatus(404);
      }
    }
  );

  app.delete(
    "/wiki/rest/api/content/:contentId/property/:propertyKey",
    (req, res) => {
      if (!contentProperties[req.params.contentId]) {
        contentProperties[req.params.contentId] = {};
      }
      delete contentProperties[req.params.contentId][req.params.propertyKey];
      res.sendStatus(204);
    }
  );

  app.post(
    "/wiki/rest/api/content/:contentId/property/:propertyKey",
    bodyParser.json({ strict: false }),
    (req, res) => {
      if (!contentProperties[req.params.contentId]) {
        contentProperties[req.params.contentId] = {};
      }
      contentProperties[req.params.contentId][req.params.propertyKey] =
        req.body;
      res.sendStatus(204);
    }
  );
}
