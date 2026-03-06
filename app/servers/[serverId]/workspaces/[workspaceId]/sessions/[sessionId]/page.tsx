import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getServer, getSession, getWorkspace } from "@/lib/mock-data";
import { ConversationClient } from "./conversation-client";

export default function ConversationPage({
  params,
}: {
  params: { serverId: string; workspaceId: string; sessionId: string };
}) {
  const server = getServer(params.serverId);
  const workspace = getWorkspace(params.serverId, params.workspaceId);
  const session = getSession(params.serverId, params.workspaceId, params.sessionId);

  if (!server || !workspace || !session) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl p-4">
      <Card>
        <CardHeader>
          <div className="mb-3">
            <Link href={`/servers/${server.id}/workspaces/${workspace.id}/sessions`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-1 h-4 w-4" /> Sessions
              </Button>
            </Link>
          </div>
          <CardTitle className="flex items-center gap-2 text-base">
            <Terminal className="h-4 w-4" /> {session.title}
          </CardTitle>
          <CardDescription>Step 4: Read history and send new messages.</CardDescription>
        </CardHeader>
        <CardContent>
          <ConversationClient initialMessages={session.messages} />
        </CardContent>
      </Card>
    </main>
  );
}
