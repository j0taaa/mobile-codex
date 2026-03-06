import { spawnSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { z } from "zod";

const SessionRequest = z.object({
  workspacePath: z.string(),
  prompt: z.string().min(1),
});

const server = Bun.serve({
  port: Number(process.env.PORT ?? 8787),
  async fetch(req: Request) {
    const url = new URL(req.url);

    if (url.pathname === "/health") {
      return Response.json({ ok: true, agent: "codex-https-agent" });
    }

    if (url.pathname === "/api/workspaces") {
      const root = process.env.CODEX_ROOT ?? process.cwd();
      const folders = readdirSync(root, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .slice(0, 60)
        .map((entry) => resolve(root, entry.name));
      return Response.json({ root, folders });
    }

    if (url.pathname === "/api/sessions" && req.method === "POST") {
      const payload = SessionRequest.parse(await req.json());
      if (!existsSync(payload.workspacePath)) {
        return Response.json({ error: "Workspace not found" }, { status: 404 });
      }

      // Replace this with a safer streaming integration using codex once auth/session strategy is finalized.
      const output = spawnSync("codex", ["exec", payload.prompt], {
        cwd: payload.workspacePath,
        encoding: "utf8",
      });

      return Response.json({
        stdout: output.stdout,
        stderr: output.stderr,
        status: output.status,
      });
    }

    return new Response("Not found", { status: 404 });
  },
});

console.log(`codex-https-agent listening on http://localhost:${server.port}`);
