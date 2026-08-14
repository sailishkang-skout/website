import { mapAppPathToUpstream } from "@/lib/app-proxy";

describe("mapAppPathToUpstream", () => {
  it("treats /app as the sign-in page", () => {
    const paths = mapAppPathToUpstream("/app", "");
    expect(paths[0]).toBe("/app/signin");
    expect(paths).toContain("/signin");
  });

  it("maps /app/signin onto Clerk sign-in paths", () => {
    const paths = mapAppPathToUpstream("/app/signin", "");
    expect(paths[0]).toBe("/app/signin");
    expect(paths).toContain("/signin");
  });

  it("forwards dashboard under /app", () => {
    const paths = mapAppPathToUpstream("/app/dashboard", "?x=1");
    expect(paths[0]).toBe("/app/dashboard?x=1");
  });
});
