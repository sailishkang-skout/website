// This is the simplest, most reliable way to mock this - uses require inside the test
import { NextRequest } from "next/server";

const validPayload = {
  name: "Alice Smith",
  email: "alice@example.com",
  company: "Acme Corp",
  size: "11-50",
  message: "Hello, I would like a demo please.",
};

function makeRequest(body: unknown) {
  return new NextRequest("http://localhost/api/contact", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

jest.mock("@/lib/db/connect", () => ({
  connectDB: jest.fn(),
}));

jest.mock("@/lib/models/contact.model", () => ({
  __esModule: true,
  default: {
    create: jest.fn(),
  },
}));

jest.mock("@/lib/email/contact.email", () => ({
  sendContactEmail: jest.fn(),
}));

describe("POST /api/contact", () => {
  let POST: (req: NextRequest) => Promise<Response>;
  let connectDB: jest.Mock;
  let Contact: { create: jest.Mock };
  let sendContactEmail: jest.Mock;

  beforeEach(async () => {
    jest.resetModules();

    // Dynamically import mocks and the route
    const connectDBModule = await import("@/lib/db/connect");
    connectDB = connectDBModule.connectDB as jest.Mock;

    const contactModelModule = await import("@/lib/models/contact.model");
    Contact = contactModelModule.default as unknown as { create: jest.Mock };

    const contactEmailModule = await import("@/lib/email/contact.email");
    sendContactEmail = contactEmailModule.sendContactEmail as jest.Mock;

    const routeModule = await import("@/app/api/contact/route");
    POST = routeModule.POST;
  });

  it("returns 200 and saves contact + sends email for valid payload", async () => {
    connectDB.mockResolvedValue(true);
    Contact.create.mockResolvedValue({});
    sendContactEmail.mockResolvedValue(undefined);

    const res = await POST(makeRequest(validPayload));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
    expect(Contact.create).toHaveBeenCalledWith(validPayload);
    expect(sendContactEmail).toHaveBeenCalledWith(validPayload);
  });

  it("returns 422 when email is invalid", async () => {
    const res = await POST(makeRequest({ ...validPayload, email: "not-an-email" }));
    const body = await res.json();

    expect(res.status).toBe(422);
    expect(body.errors?.email).toBeDefined();
    expect(Contact.create).not.toHaveBeenCalled();
  });

  it("returns 422 when message is too short", async () => {
    const res = await POST(makeRequest({ ...validPayload, message: "Hi" }));
    const body = await res.json();

    expect(res.status).toBe(422);
    expect(body.errors?.message).toBeDefined();
    expect(Contact.create).not.toHaveBeenCalled();
  });
});
