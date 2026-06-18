import { NextRequest } from "next/server";
import { GET } from "@/app/api/admin/enquiries/route";

jest.mock("@/lib/db/connect", () => ({ connectDB: jest.fn().mockResolvedValue(undefined) }));

const mockContacts = [
  {
    _id: "1",
    name: "Alice Smith",
    email: "alice@example.com",
    company: "Acme",
    size: "11-50",
    message: "Hello",
    createdAt: new Date(),
  },
  {
    _id: "2",
    name: "Bob Jones",
    email: "bob@example.com",
    company: "Beta Corp",
    size: "51-200",
    message: "Hi",
    createdAt: new Date(),
  },
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

jest.mock("@/lib/models/contact.model", () => ({
  __esModule: true,
  default: {
    find: jest.fn(),
    countDocuments: jest.fn(),
  },
}));

// eslint-disable-next-line @typescript-eslint/no-require-imports
const Contact = require("@/lib/models/contact.model").default;

beforeEach(() => {
  jest.clearAllMocks();
  (Contact.find as jest.Mock).mockReturnValue(makeChain(mockContacts));
  (Contact.countDocuments as jest.Mock).mockResolvedValue(mockContacts.length);
});

describe("GET /api/admin/enquiries", () => {
  it("returns paginated enquiries with correct structure", async () => {
    const req = new NextRequest("http://localhost/api/admin/enquiries");
    const res = await GET(req);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.items).toHaveLength(2);
    expect(body.total).toBe(2);
    expect(body.page).toBe(1);
    expect(body.pages).toBe(1);
  });

  it("passes search query to the database filter", async () => {
    (Contact.find as jest.Mock).mockReturnValue(makeChain([mockContacts[0]]));
    (Contact.countDocuments as jest.Mock).mockResolvedValue(1);

    const req = new NextRequest("http://localhost/api/admin/enquiries?q=Alice");
    const res = await GET(req);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(Contact.find).toHaveBeenCalledWith(expect.objectContaining({ $or: expect.any(Array) }));
    expect(body.items).toHaveLength(1);
  });

  it("handles page parameter correctly", async () => {
    (Contact.countDocuments as jest.Mock).mockResolvedValue(25);

    const req = new NextRequest("http://localhost/api/admin/enquiries?page=2");
    const res = await GET(req);
    const body = await res.json();

    expect(body.page).toBe(2);
    expect(body.pages).toBe(2); // ceil(25/20)
  });

  it("clamps invalid page to 1", async () => {
    const req = new NextRequest("http://localhost/api/admin/enquiries?page=-5");
    const res = await GET(req);
    const body = await res.json();

    expect(body.page).toBe(1);
  });

  it("returns empty items when no enquiries exist", async () => {
    (Contact.find as jest.Mock).mockReturnValue(makeChain([]));
    (Contact.countDocuments as jest.Mock).mockResolvedValue(0);

    const req = new NextRequest("http://localhost/api/admin/enquiries");
    const res = await GET(req);
    const body = await res.json();

    expect(body.items).toHaveLength(0);
    expect(body.total).toBe(0);
    expect(body.pages).toBe(0);
  });
});
