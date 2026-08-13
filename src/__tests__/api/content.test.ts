import { NextRequest } from "next/server";
import { GET, PUT } from "@/app/api/admin/content/[page]/route";

jest.mock("@/lib/db/connect", () => ({ connectDB: jest.fn().mockResolvedValue(undefined) }));

const mockHomeData = { hero: { title: "Test Title" } };

jest.mock("@/lib/models/content.model", () => ({
  Content: {
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
  },
}));

jest.mock("@/lib/content/defaults", () => ({
  defaultContent: {
    home: { hero: { title: "Default Home" } },
    about: { hero: { title: "Default About" } },
  },
}));

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { Content } = require("@/lib/models/content.model");

function makeParams(page: string) {
  return { params: Promise.resolve({ page }) };
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe("GET /api/admin/content/[page]", () => {
  it("returns saved DB content when found", async () => {
    (Content.findOne as jest.Mock).mockReturnValue({
      lean: () => Promise.resolve({ data: mockHomeData }),
    });

    const req = new NextRequest("http://localhost/api/admin/content/home");
    const res = await GET(req, makeParams("home"));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.pageId).toBe("home");
    expect(body.data).toEqual(mockHomeData);
  });

  it("falls back to defaultContent when no DB record exists", async () => {
    (Content.findOne as jest.Mock).mockReturnValue({ lean: () => Promise.resolve(null) });

    const req = new NextRequest("http://localhost/api/admin/content/home");
    const res = await GET(req, makeParams("home"));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.data).toEqual({ hero: { title: "Default Home" } });
  });

  it("returns 404 for an unknown page", async () => {
    const req = new NextRequest("http://localhost/api/admin/content/nonexistent");
    const res = await GET(req, makeParams("nonexistent"));
    const body = await res.json();

    expect(res.status).toBe(404);
    expect(body.error).toBeDefined();
    expect(Content.findOne).not.toHaveBeenCalled();
  });

  it("accepts all valid page slugs", async () => {
    (Content.findOne as jest.Mock).mockReturnValue({ lean: () => Promise.resolve(null) });

    const pages = ["home", "about", "features", "pricing", "solutions", "integrations"];
    for (const page of pages) {
      const req = new NextRequest(`http://localhost/api/admin/content/${page}`);
      const res = await GET(req, makeParams(page));
      expect(res.status).toBe(200);
    }
  });
});

describe("PUT /api/admin/content/[page]", () => {
  it("saves content and returns success: true", async () => {
    (Content.findOneAndUpdate as jest.Mock).mockResolvedValue({});

    const req = new NextRequest("http://localhost/api/admin/content/home", {
      method: "PUT",
      body: JSON.stringify({ data: mockHomeData }),
      headers: { "Content-Type": "application/json" },
    });
    const res = await PUT(req, makeParams("home"));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
    expect(Content.findOneAndUpdate).toHaveBeenCalledWith(
      { pageId: "home" },
      expect.objectContaining({ data: mockHomeData }),
      { upsert: true, new: true },
    );
  });

  it("returns 404 for an unknown page", async () => {
    const req = new NextRequest("http://localhost/api/admin/content/unknown", {
      method: "PUT",
      body: JSON.stringify({ data: {} }),
      headers: { "Content-Type": "application/json" },
    });
    const res = await PUT(req, makeParams("unknown"));

    expect(res.status).toBe(404);
    expect(Content.findOneAndUpdate).not.toHaveBeenCalled();
  });

  it("returns 422 when data field is missing", async () => {
    const req = new NextRequest("http://localhost/api/admin/content/home", {
      method: "PUT",
      body: JSON.stringify({ notData: {} }),
      headers: { "Content-Type": "application/json" },
    });
    const res = await PUT(req, makeParams("home"));

    expect(res.status).toBe(422);
    expect(Content.findOneAndUpdate).not.toHaveBeenCalled();
  });

  it("returns 400 when body is not valid JSON", async () => {
    const req = new NextRequest("http://localhost/api/admin/content/home", {
      method: "PUT",
      body: "not-json",
      headers: { "Content-Type": "application/json" },
    });
    const res = await PUT(req, makeParams("home"));

    expect(res.status).toBe(400);
  });

  it("returns 422 when data is not an object", async () => {
    const req = new NextRequest("http://localhost/api/admin/content/about", {
      method: "PUT",
      body: JSON.stringify({ data: "a string" }),
      headers: { "Content-Type": "application/json" },
    });
    const res = await PUT(req, makeParams("about"));

    expect(res.status).toBe(422);
  });
});
