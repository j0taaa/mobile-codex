import { getServer, getSession, getWorkspace, listFolders } from "@/lib/mock-data";

describe("mock data selectors", () => {
  it("finds server, workspace, and session by ids", () => {
    expect(getServer("srv-1")?.name).toBe("MacBook Pro");
    expect(getWorkspace("srv-1", "wk-1")?.path).toContain("mobile-codex");
    expect(getSession("srv-1", "wk-1", "se-1")?.title).toContain("Architecture");
  });

  it("returns undefined for missing ids", () => {
    expect(getServer("missing")).toBeUndefined();
    expect(getWorkspace("srv-1", "missing")).toBeUndefined();
    expect(getSession("srv-1", "wk-1", "missing")).toBeUndefined();
  });

  it("lists folder children for step-by-step folder exploration", () => {
    expect(listFolders("srv-1", "~").map((folder) => folder.path)).toContain("~/projects");
    expect(listFolders("srv-1", "~/projects").map((folder) => folder.path)).toContain("~/projects/mobile-codex");
  });
});
