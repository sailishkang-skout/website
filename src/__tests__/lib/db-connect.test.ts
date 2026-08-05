describe("db connect bootstrap", () => {
  const originalMongoUri = process.env.MONGODB_URI;

  afterEach(() => {
    if (originalMongoUri === undefined) {
      delete process.env.MONGODB_URI;
    } else {
      process.env.MONGODB_URI = originalMongoUri;
    }
    jest.resetModules();
  });

  it("does not throw while importing the DB module when MONGODB_URI is missing", () => {
    delete process.env.MONGODB_URI;

    expect(() => {
      require("@/lib/db/connect");
    }).not.toThrow();
  });

  it("returns null from connectDB when MONGODB_URI is missing", async () => {
    delete process.env.MONGODB_URI;

    const { connectDB } = require("@/lib/db/connect");

    await expect(connectDB()).resolves.toBeNull();
  });
});
