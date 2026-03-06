export type Message = {
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

export type Session = {
  id: string;
  title: string;
  messages: Message[];
};

export type Workspace = {
  id: string;
  path: string;
  sessions: Session[];
};

export type RemoteServer = {
  id: string;
  name: string;
  url: string;
  status: "connected" | "offline";
  workspaces: Workspace[];
};

export type FolderTree = {
  [path: string]: string[];
};

export const installCommand = "curl -fsSL https://your-ui-domain.com/install-agent.sh | sh";

export const remoteServers: RemoteServer[] = [
  {
    id: "srv-1",
    name: "MacBook Pro",
    url: "https://devbox.home:8443",
    status: "connected",
    workspaces: [
      {
        id: "wk-1",
        path: "~/projects/mobile-codex",
        sessions: [
          {
            id: "se-1",
            title: "Architecture planning",
            messages: [
              { role: "user", content: "Propose an HTTPS bridge architecture", createdAt: "09:10" },
              { role: "assistant", content: "Use a tiny local agent that exposes codex sessions via REST + SSE.", createdAt: "09:10" },
            ],
          },
          {
            id: "se-2",
            title: "PWA roadmap",
            messages: [
              { role: "user", content: "How do we support installable experience?", createdAt: "10:45" },
              { role: "assistant", content: "Add manifest, service worker, and install-friendly UI metadata.", createdAt: "10:46" },
            ],
          },
        ],
      },
      {
        id: "wk-2",
        path: "~/projects/codex-cli",
        sessions: [
          {
            id: "se-3",
            title: "Agent hardening",
            messages: [
              { role: "user", content: "List auth options", createdAt: "08:20" },
              { role: "assistant", content: "JWT + mTLS is a strong baseline for internet exposure.", createdAt: "08:21" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "srv-2",
    name: "Linux Workstation",
    url: "https://labbox.example.com",
    status: "offline",
    workspaces: [
      {
        id: "wk-3",
        path: "~/workspace/infra",
        sessions: [],
      },
    ],
  },
];

export const serverFolders: Record<string, FolderTree> = {
  "srv-1": {
    "~": ["projects", "downloads", "documents"],
    "~/projects": ["mobile-codex", "codex-cli", "playground"],
    "~/projects/mobile-codex": ["app", "client-server", "tests"],
    "~/projects/codex-cli": ["codex-rs", "docs"],
    "~/downloads": ["archives"],
    "~/documents": ["notes"],
    "~/workspace": [],
  },
  "srv-2": {
    "~": ["workspace", "tmp"],
    "~/workspace": ["infra", "apps"],
    "~/workspace/infra": ["terraform", "ansible"],
    "~/workspace/apps": ["dashboard"],
  },
};

export function getServer(serverId: string) {
  return remoteServers.find((server) => server.id === serverId);
}

export function getWorkspace(serverId: string, workspaceId: string) {
  return getServer(serverId)?.workspaces.find((workspace) => workspace.id === workspaceId);
}

export function getSession(serverId: string, workspaceId: string, sessionId: string) {
  return getWorkspace(serverId, workspaceId)?.sessions.find((session) => session.id === sessionId);
}

export function listFolders(serverId: string, currentPath: string) {
  const tree = serverFolders[serverId] ?? {};
  const children = tree[currentPath] ?? [];
  return children.map((name) => ({
    name,
    path: currentPath === "~" ? `~/${name}` : `${currentPath}/${name}`,
  }));
}
