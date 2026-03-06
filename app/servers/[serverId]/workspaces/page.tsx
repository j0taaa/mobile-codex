import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getServer } from "@/lib/mock-data";
import { FolderExplorerClient } from "./folder-explorer-client";

export default function WorkspacesPage({ params }: { params: { serverId: string } }) {
  const server = getServer(params.serverId);

  if (!server) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl p-4">
      <Card>
        <CardHeader>
          <div className="mb-3">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-1 h-4 w-4" /> Servers
              </Button>
            </Link>
          </div>
          <CardTitle className="flex items-center gap-2 text-base">
            <FolderOpen className="h-4 w-4" /> {server.name}: Workspaces
          </CardTitle>
          <CardDescription>Step 2: Explore folders step by step, then open one with Codex history.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FolderExplorerClient serverId={server.id} workspaces={server.workspaces} />

          <div>
            <p className="mb-2 text-sm font-medium">Past Codex locations</p>
            <div className="space-y-2">
              {server.workspaces.map((workspace) => (
                <Link
                  key={workspace.id}
                  href={`/servers/${server.id}/workspaces/${workspace.id}/sessions`}
                  className="block rounded border p-3 hover:bg-slate-50"
                >
                  <p className="font-medium">{workspace.path}</p>
                  <p className="text-xs text-slate-500">{workspace.sessions.length} sessions</p>
                </Link>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
