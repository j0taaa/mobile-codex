import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getServer, getWorkspace } from "@/lib/mock-data";

export default function SessionsPage({ params }: { params: { serverId: string; workspaceId: string } }) {
  const server = getServer(params.serverId);
  const workspace = getWorkspace(params.serverId, params.workspaceId);

  if (!server || !workspace) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl p-4">
      <Card>
        <CardHeader>
          <div className="mb-3">
            <Link href={`/servers/${server.id}/workspaces`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-1 h-4 w-4" /> Workspaces
              </Button>
            </Link>
          </div>
          <CardTitle className="flex items-center gap-2 text-base">
            <MessageSquare className="h-4 w-4" /> Sessions in {workspace.path}
          </CardTitle>
          <CardDescription>Step 3: Choose a conversation or start a new one.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button type="button" className="w-full">New session</Button>
          <p className="text-xs text-slate-500">Session creation is mocked in this prototype.</p>
          <div className="space-y-2">
            {workspace.sessions.map((session) => (
              <Link
                key={session.id}
                href={`/servers/${server.id}/workspaces/${workspace.id}/sessions/${session.id}`}
                className="block rounded border p-3 hover:bg-slate-50"
              >
                <p className="text-sm font-medium">{session.title}</p>
                <p className="text-xs text-slate-500">{session.messages.length} messages</p>
              </Link>
            ))}
            {workspace.sessions.length === 0 && <p className="text-sm text-slate-500">No sessions yet.</p>}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
