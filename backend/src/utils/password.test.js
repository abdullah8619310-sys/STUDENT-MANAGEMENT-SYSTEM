import { describe, it, expect } from "vitest";
import { hashPassword, comparePassword } from "./password.js";

describe("password utility", () => {
  it("should hash a plain password into a different string", async () => {
    const plainPassword = "mySecret123";
    const hashed = await hashPassword(plainPassword);

    expect(hashed).not.toBe(plainPassword);
    expect(typeof hashed).toBe("string");
  });

  it("should return true when comparing the correct plain password to its hash", async () => {
    const plainPassword = "mySecret123";
    const hashed = await hashPassword(plainPassword);

    const isMatch = await comparePassword(plainPassword, hashed);

    expect(isMatch).toBe(true);
  });

  it("should return false when comparing an incorrect password to the hash", async () => {
    const plainPassword = "mySecret123";
    const wrongPassword = "notMySecret";
    const hashed = await hashPassword(plainPassword);

    const isMatch = await comparePassword(wrongPassword, hashed);

    expect(isMatch).toBe(false);
  });
});
