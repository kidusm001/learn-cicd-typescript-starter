import { describe, expect, test } from "vitest";
import { getAPIKey } from "../api/auth";

describe("auth", () => {
    test("return null causes header is empty", () => {
        const header = {};
        expect(getAPIKey(header)).toBe(null);
    });

    test("return null causes header is invalid data", () => {
        const header = { authorization: "Hello World" };
        expect(getAPIKey(header)).toBe(null);
    });

    test("return null causes header does not have an authorization object", () => {
        const header = { test: "Hello World" };
        expect(getAPIKey(header)).toBe(null);
    });

    test("return null causes header has a bearer token", () => {
        const header = { authorization: "Bearer token12345" };
        expect(getAPIKey(header)).toBe(null);
    });

    test("return null causes header has only ApiKey", () => {
        const header = { authorization: "ApiKey" };
        expect(getAPIKey(header)).toBe(null);
    });

    test("return null causes header has only ApiKey and space", () => {
        const header = { authorization: "ApiKey " };
        expect(getAPIKey(header)).toBe("");
    });

    test("return null causes header has ApiKey and with a key", () => {
        const header = { authorization: "ApiKey apiKey12345" };
        expect(getAPIKey(header)).toBe("apiKey12345");
    });

    test("return null causes header has ApiKey and with a key", () => {
        const header = { authorization: "ApiKey key with a lot of spaces" };
        expect(getAPIKey(header)).toBe("key");
    });

    test("return null causes header has case mismatch", () => {
        const header = { authorization: "apikey apikey12344" };
        expect(getAPIKey(header)).toBe(null);
    });
})
