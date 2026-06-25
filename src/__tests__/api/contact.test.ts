import { NextRequest } from "next/server";
import { POST } from "@/app/api/contact/route";

jest.mock("@/lib/db/connect", () => ({ connectDB: jest.fn().mockResolvedValue(undefined) }));

jest.mock("@/lib/models/contact.model", () => ({
  __esModule: true,
  default: { create: jest.fn().mockResolvedValue({}) },
}));

jest.mock("@/lib/email/contact.email", () => ({
  sendContactEmail: jest.fn().mockResolvedValue(undefined),
}));

// eslint-disable-next-line @typescript-eslint/no-require-imports
const Contact = require("@/lib/models/contact.model").default;
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { sendContactEmail } = require("@/lib/email/contact.email");

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

beforeEach(() => {
  jest.clearAllMocks();
  (Contact.create as jest.Mock).mockResolvedValue({});
  (sendContactEmail as jest.Mock).mockResolvedValue(undefined);
});

describe("POST /api/contact", () => {
  it("returns 200 and saves contact + sends email for valid payload", async () => {
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

  it("returns 422 when name is too short", async () => {
    const res = await POST(makeRequest({ ...validPayload, name: "A" }));
    const body = await res.json();

    expect(res.status).toBe(422);
    expect(body.errors?.name).toBeDefined();
  });

  it("returns 422 when message is too short", async () => {
    const res = await POST(makeRequest({ ...validPayload, message: "Short" }));
    const body = await res.json();

    expect(res.status).toBe(422);
    expect(body.errors?.message).toBeDefined();
  });

  it("returns 422 when required fields are missing", async () => {
    const res = await POST(makeRequest({ name: "Alice" }));
    const body = await res.json();

    expect(res.status).toBe(422);
    expect(body.errors).toBeDefined();
    expect(Contact.create).not.toHaveBeenCalled();
  });

  it("returns 500 when database write fails", async () => {
    (Contact.create as jest.Mock).mockRejectedValue(new Error("DB down"));

    const res = await POST(makeRequest(validPayload));
    const body = await res.json();

    expect(res.status).toBe(500);
    expect(body.success).toBe(false);
  });

  it("returns 500 when email sending fails", async () => {
    (sendContactEmail as jest.Mock).mockRejectedValue(new Error("SMTP error"));

    const res = await POST(makeRequest(validPayload));
    const body = await res.json();

    expect(res.status).toBe(500);
    expect(body.success).toBe(false);
  });

  it("returns 422 when company is empty", async () => {
    const res = await POST(makeRequest({ ...validPayload, company: "" }));
    const body = await res.json();

    expect(res.status).toBe(422);
    expect(body.errors?.company).toBeDefined();
  });
});
