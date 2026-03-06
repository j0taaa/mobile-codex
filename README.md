# Mobile Codex

A Next.js + Bun + shadcn/ui web app for controlling Codex CLI sessions from a phone via HTTPS agents running on remote computers.

## Architecture

- **UI server (this app):** hosts the mobile-friendly interface and stores server metadata.
- **Agent server (`client-server/`):** runs on each target computer and exposes Codex operations over HTTPS.
- **Multi-server flow:** one UI can connect to multiple computers, each with many workspaces and sessions.

## Product flow implemented

1. Main page lists all connected servers and uses a corner plus icon to toggle the add-server form.
2. Tap a server to navigate to a dedicated **workspaces page** with step-by-step folder exploration.
3. Tap a workspace to navigate to a dedicated **sessions page**.
4. Tap a session to navigate to a dedicated **conversation page**.
5. Conversation page shows history and lets you send new prompts.

## PWA support

- Manifest at `public/manifest.webmanifest`
- Service worker at `public/sw.js`
- SVG app icons (`public/icon.svg`, `public/icon-maskable.svg`)
- Registration via `app/pwa-register.tsx`

## Run UI

```bash
bun install
bun run dev
```

## Run target machine agent

```bash
cd client-server
bun install
PORT=8787 bun run dev
```

## Production notes

- Put the agent behind TLS (Caddy/Nginx/Tailscale Funnel/Cloudflare Tunnel).
- Add auth (JWT/mTLS) before internet exposure.
- Replace mock front-end state with API calls to agent endpoints.
- Consider SSE/WebSocket streaming for live Codex tokens.
