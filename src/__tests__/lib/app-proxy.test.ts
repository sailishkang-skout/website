import { mapAppPathToUpstream } from "@/lib/app-proxy";

describe("mapAppPathToUpstream", () => {
  it("treats /app as the login page", () => {
    const paths = mapAppPathToUpstream("/app", "");
    expect(paths[0]).toBe("/app");
    expect(paths).toContain("/sign-in");
  });

  it("forwards dashboard under /app", () => {
    const paths = mapAppPathToUpstream("/app/dashboard", "?x=1");
    expect(paths[0]).toBe("/app/dashboard?x=1");
  });
});
