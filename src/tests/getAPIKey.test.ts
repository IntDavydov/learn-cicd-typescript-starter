import { describe, expect, test } from "vitest";
import { getAPIKey } from "../api/auth.js";
import { IncomingHttpHeaders } from "http";

describe("Get api key", () => {
  const validHeader: IncomingHttpHeaders = {
    authorization:
      "ApiKey really-secure-api-key-google-use-it-to-takeover-wrld",
  };

  const invalidHeader: IncomingHttpHeaders = {
    authorization: "Yay iam invalid header why was I born in this world ???",
  };

  const shortHeader: IncomingHttpHeaders = {
    authorization: "IamShort",
  };

  const nullHeader: IncomingHttpHeaders = {
    authorization: "",
  };

  test("No header return null", () => {
    const api = getAPIKey(nullHeader);
    expect(api).toBeNull();
  });

  test("Invalid header no ApiKey return null", () => {
    const api = getAPIKey(invalidHeader);
    expect(api).toBeNull();
  });

  test("Invalide header length < 2 return null", () => {
    const api = getAPIKey(shortHeader);
    expect(api).toBeNull();
  });

  test("OHHH yeeeahh valid header", () => {
    const api = getAPIKey(validHeader);
    expect(api).toBe("really-secure-api-key-google-use-it-to-takeover-wrld");
  });
});
