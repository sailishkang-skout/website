import { humanizeForSpeech } from "@/lib/site-dexter-speech";

describe("humanizeForSpeech", () => {
  it("says per month instead of mo", () => {
    const spoken = humanizeForSpeech("Starter — $54/mo — 5,000 credits");
    expect(spoken.toLowerCase()).toMatch(/per month/);
    expect(spoken.toLowerCase()).not.toMatch(/\bmo\b/);
    expect(spoken).toMatch(/54 dollars/);
  });

  it("does not read raw urls", () => {
    const spoken = humanizeForSpeech("See [Pricing](/pricing) and https://www.skoutai.io/guides");
    expect(spoken.toLowerCase()).toMatch(/pricing page|setup guides/);
    expect(spoken).not.toMatch(/https?:\/\//);
  });
});
