import { NextRequest } from "next/server";
import { GET } from "@/app/api/admin/waitlist/route";

jest.mock("@/lib/db/connect", () => ({ connectDB: jest.fn().mockResolvedValue(undefined) }));

const mockItems = [
  { _id: "w1", email: "alice@example.com", createdAt: new Date("2024-01-10") },
  { _id: "w2", email: "bob@example.com", createdAt: new Date("2024-01-11") },
  { _id: "w3", email: "carol@example.com", createdAt: new Date("2024-01-12") },
];

function makeChain(result: unknown[]) {
  const chain: {
    sort: () => typeof chain;
    skip: () => typeof chain;
    limit: () => typeof chain;
    lean: () => Promise<unknown[]>;
  } = {
    sort: () => chain,
    skip: () => chain,
    limit: () => chain,
    lean: () => Promise.resolve(result),
  };
  return chain;
}

jest.mock("@/lib/models/waitlist.model", () => ({
  __esModule: true,
  default: {
    find: jest.fn(),
    countDocuments: jest.fn(),
  },
}));

// eslint-disable-next-line @typescript-eslint/no-require-imports
const Waitlist = require("@/lib/models/waitlist.model").default;

beforeEach(() => {
  jest.clearAllMocks();
  (Waitlist.find as jest.Mock).mockReturnValue(makeChain(mockItems));
  (Waitlist.countDocuments as jest.Mock).mockResolvedValue(mockItems.length);
});

describe("GET /api/admin/waitlist", () => {
  it("returns paginated entries with correct structure", async () => {
    const req = new NextRequest("http://localhost/api/admin/waitlist");
    const res = await GET(req);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.items).toHaveLength(3);
    expect(body.total).toBe(3);
    expect(body.page).toBe(1);
    expect(body.pages).toBe(1);
  });

  it("applies email search filter", async () => {
    (Waitlist.find as jest.Mock).mockReturnValue(makeChain([mockItems[0]]));
    (Waitlist.countDocuments as jest.Mock).mockResolvedValue(1);

    const req = new NextRequest("http://localhost/api/admin/waitlist?q=alice");
    await GET(req);

    expect(Waitlist.find).toHaveBeenCalledWith(
      expect.objectContaining({ email: expect.objectContaining({ $regex: "alice" }) }),
    );
  });

  it("respects page param", async () => {
    (Waitlist.countDocuments as jest.Mock).mockResolvedValue(50);

    const req = new NextRequest("http://localhost/api/admin/waitlist?page=2");
    const res = await GET(req);
    const body = await res.json();

    expect(body.page).toBe(2);
    expect(body.pages).toBe(2); // ceil(50/25)
  });

  it("clamps negative page to 1", async () => {
    const req = new NextRequest("http://localhost/api/admin/waitlist?page=-5");
    const res = await GET(req);
    const body = await res.json();

    expect(body.page).toBe(1);
  });

  it("returns empty list when no entries match", async () => {
    (Waitlist.find as jest.Mock).mockReturnValue(makeChain([]));
    (Waitlist.countDocuments as jest.Mock).mockResolvedValue(0);

    const req = new NextRequest("http://localhost/api/admin/waitlist?q=nonexistent");
    const res = await GET(req);
    const body = await res.json();

    expect(body.items).toHaveLength(0);
    expect(body.total).toBe(0);
    expect(body.pages).toBe(0);
  });

  it("calculates pages correctly for 25-per-page", async () => {
    (Waitlist.countDocuments as jest.Mock).mockResolvedValue(51);

    const req = new NextRequest("http://localhost/api/admin/waitlist");
    const res = await GET(req);
    const body = await res.json();

    expect(body.pages).toBe(3); // ceil(51/25)
  });
});
