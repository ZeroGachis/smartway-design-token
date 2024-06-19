import { getTokens } from "./Tokens";
import * as testTokensJson from "./tokensTest.json";

describe("Tokens", () => {
  const tokens = getTokens(testTokensJson);
  it("Get typography value", () => {
    const typo = tokens.typography.body.n1;
    expect(typo.fontSize).toBe(16);
    expect(typo.fontWeight).toBe(600);
    expect(typo.fontFamily).toBe("Public Sans");
  });

  it("Get color", () => {
    const color = tokens.color;
    expect(color.error["100"]).toBe("#ffe4de");
    expect(color.error["300"]).toBe("#ffac82");
    expect(color.error["500"]).toBe("#ff5630");
    expect(color.error["700"]).toBe("#b71d18");
    expect(color.error["900"]).toBe("#7a0916");
  });
});
