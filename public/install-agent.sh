#!/usr/bin/env bash
set -euo pipefail

if ! command -v bun >/dev/null 2>&1; then
  echo "Bun is required. Install from https://bun.sh first." >&2
  exit 1
fi

TARGET_DIR=${TARGET_DIR:-$HOME/codex-https-agent}
mkdir -p "$TARGET_DIR"
cd "$TARGET_DIR"

cat > package.json <<'JSON'
{
  "name": "codex-https-agent",
  "private": true,
  "type": "module",
  "scripts": {
    "start": "bun run index.ts"
  },
  "dependencies": {
    "zod": "^3.23.8"
  }
}
JSON

cat > index.ts <<'TS'
import { spawnSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { z } from "zod";

const SessionRequest = z.object({ workspacePath: z.string(), prompt: z.string().min(1) });

Bun.serve({
  port: Number(process.env.PORT ?? 8787),
  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/health") return Response.json({ ok: true });
    if (url.pathname === "/api/workspaces") {
      const root = process.env.CODEX_ROOT ?? process.cwd();
      const folders = readdirSync(root, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => resolve(root, d.name));
      return Response.json({ root, folders });
    }
    if (url.pathname === "/api/sessions" && req.method === "POST") {
      const body = SessionRequest.parse(await req.json());
      if (!existsSync(body.workspacePath)) return Response.json({ error: "Missing workspace" }, { status: 404 });
      const run = spawnSync("codex", ["exec", body.prompt], { cwd: body.workspacePath, encoding: "utf8" });
      return Response.json({ stdout: run.stdout, stderr: run.stderr, status: run.status });
    }
    return new Response("Not found", { status: 404 });
  },
});
TS

bun install

echo "Installed in $TARGET_DIR"
echo "Run: cd $TARGET_DIR && PORT=8787 bun run start"
