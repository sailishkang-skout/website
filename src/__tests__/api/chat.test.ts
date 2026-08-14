import { NextRequest } from "next/server";
import { fallbackReply, isSmallTalk, matchSiteFaq, wantsDemo } from "@/lib/site-chat";

function makeRequest(body: unknown) {
  return new NextRequest("http://localhost/api/chat", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

describe("site chat helpers", () => {
  it("detects demo intent", () => {
    expect(wantsDemo("Can I book a demo?")).toBe(true);
    expect(wantsDemo("How does enrichment work?")).toBe(false);
  });

  it("answers verification questions without requiring OpenAI", () => {
    const res = fallbackReply("How do you verify emails?");
    expect(res.reply.toLowerCase()).toMatch(/email|verif|smtp|mailbox/);
  });

  it("greets instead of pitching the product", () => {
    expect(isSmallTalk("How are you")).toBe(true);
    const res = fallbackReply("How are you");
    expect(res.reply.toLowerCase()).toMatch(/well|thanks|pricing|demo/);
    expect(res.reply.toLowerCase()).not.toMatch(/one workspace for finding/);
  });

  it("answers pricing from the pricing page", () => {
    const res = fallbackReply("I am asking about pricing tell me something about the pricing");
    expect(res.reply).toMatch(/\$54|Starter|Scale/i);
    expect(res.reply).toMatch(/per month/i);
    expect(res.reply).not.toMatch(/\/mo/i);
  });

  it("answers resources and guides from those pages, not random FAQs", () => {
    const resources = fallbackReply("what about resources can you tell me something about");
    expect(resources.reply.toLowerCase()).toMatch(/guides|calculator/);
    expect(resources.reply).toMatch(/\/guides|\/resources/);

    const guides = fallbackReply("can you tell me about guides and where I can find about the gu");
    expect(guides.reply.toLowerCase()).toMatch(/setup|mailbox|chrome/);
    expect(guides.reply).not.toMatch(/pipelines with tailored/i);

    const incomplete = fallbackReply("can you take me to the");
    expect(incomplete.reply.toLowerCase()).toMatch(/which page|pricing|guides/);
    expect(incomplete.reply).not.toMatch(/chrome web store/i);
  });

  it("lists real integrations", () => {
    const res = fallbackReply("can you tell me something about integrations");
    expect(res.reply).toMatch(/HubSpot/i);
    expect(res.reply).toMatch(/Google|Microsoft|Calendar/i);
  });
});

describe("POST /api/chat", () => {
  it("returns 422 for empty messages", async () => {
    const { POST } = await import("@/app/api/chat/route");
    const res = await POST(makeRequest({ messages: [] }));
    expect(res.status).toBe(422);
  });

  it("returns a product reply for a feature question", async () => {
    const { POST } = await import("@/app/api/chat/route");
    const res = await POST(
      makeRequest({ messages: [{ role: "user", content: "What does Skout do?" }] })
    );
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(typeof body.reply).toBe("string");
    expect(body.reply.length).toBeGreaterThan(20);
  });

  it("returns real plan prices for a pricing question", async () => {
    const { POST } = await import("@/app/api/chat/route");
    const res = await POST(
      makeRequest({
        messages: [{ role: "user", content: "tell me something about the prices" }],
      })
    );
    const body = await res.json() as { reply: string };
    expect(res.status).toBe(200);
    expect(body.reply).toMatch(/\$54|\$79|Starter|Scale/i);
  });
});
