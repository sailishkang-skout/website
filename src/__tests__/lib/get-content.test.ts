import { getPageContent } from "@/lib/content/get-content";

jest.mock("@/lib/db/connect", () => ({ connectDB: jest.fn().mockResolvedValue(true) }));

jest.mock("@/lib/models/content.model", () => ({
  Content: {
    findOne: jest.fn(),
  },
}));

jest.mock("@/lib/content/defaults", () => ({
  defaultContent: {
    home: { hero: { title: "Default Home Title" } },
    about: { hero: { title: "Default About Title" } },
  },
}));

import { Content } from "@/lib/models/content.model";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("getPageContent", () => {
  it("returns DB content when a record exists", async () => {
    const dbData = {
      data: { hero: { title: "Custom Title from DB" } },
    };
    (Content.findOne as jest.Mock).mockReturnValue({
      lean: () => Promise.resolve(dbData),
    });

    const result = await getPageContent("home");

    expect(result).toEqual(expect.objectContaining(dbData.data));
    expect(Content.findOne).toHaveBeenCalledWith({ pageId: "home" });
  });

  it("falls back to defaultContent when no DB record exists", async () => {
    (Content.findOne as jest.Mock).mockReturnValue({
      lean: () => Promise.resolve(null),
    });

    const result = await getPageContent("home");

    expect(result).toEqual({ hero: { title: "Default Home Title" } });
  });

  it("falls back to defaultContent when DB record has no data field", async () => {
    (Content.findOne as jest.Mock).mockReturnValue({
      lean: () => Promise.resolve({ pageId: "home" }),
    });

    const result = await getPageContent("home");

    expect(result).toEqual({ hero: { title: "Default Home Title" } });
  });

  it("falls back to defaultContent when DB throws an error", async () => {
    (Content.findOne as jest.Mock).mockReturnValue({
      lean: () => Promise.reject(new Error("Connection failed")),
    });

    const result = await getPageContent("home");

    expect(result).toEqual({ hero: { title: "Default Home Title" } });
  });

  it("returns empty object for unknown pageId not in defaults", async () => {
    (Content.findOne as jest.Mock).mockReturnValue({
      lean: () => Promise.resolve(null),
    });

    const result = await getPageContent("nonexistent");

    expect(result).toEqual({});
  });

  it("calls connectDB before querying the database", async () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { connectDB } = require("@/lib/db/connect");
    (Content.findOne as jest.Mock).mockReturnValue({
      lean: () => Promise.resolve(null),
    });

    await getPageContent("about");

    expect(connectDB).toHaveBeenCalled();
  });
});
