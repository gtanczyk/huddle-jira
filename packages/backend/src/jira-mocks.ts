import { Application } from "express";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bodyParser = require("body-parser");

export default function jiraMocks(app: Application) {
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

  // issue properties

  const issueProperties = {} as {
    [issueId: string]: { [propertyKey: string]: unknown };
  };

  app.get("/rest/api/3/issue/:issueId/properties/:propertyKey", (req, res) => {
    const value = issueProperties[req.params.issueId]?.[req.params.propertyKey];
    if (value) {
      res.send({ value: value });
    } else {
      res.sendStatus(404);
    }
  });

  app.delete(
    "/rest/api/3/issue/:issueId/properties/:propertyKey",
    (req, res) => {
      if (!issueProperties[req.params.issueId]) {
        issueProperties[req.params.issueId] = {};
      }
      delete issueProperties[req.params.issueId][req.params.propertyKey];
      res.sendStatus(204);
    }
  );

  app.put(
    "/rest/api/3/issue/:issueId/properties/:propertyKey",
    bodyParser.json({ strict: false }),
    (req, res) => {
      if (!issueProperties[req.params.issueId]) {
        issueProperties[req.params.issueId] = {};
      }
      issueProperties[req.params.issueId][req.params.propertyKey] = req.body;
      res.sendStatus(204);
    }
  );
}
