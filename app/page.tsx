"use client";

import React from "react";
import Link from "next/link";
import { Copy, Plus, Server, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { installCommand, remoteServers } from "@/lib/mock-data";

export default function HomePage() {
  const [newServerName, setNewServerName] = React.useState("");
  const [newServerUrl, setNewServerUrl] = React.useState("");
  const [isAddServerOpen, setIsAddServerOpen] = React.useState(false);

  function copyInstallCommand() {
    navigator.clipboard.writeText(installCommand);
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl p-4">
      <Card className="relative">
        <Button
          size="icon"
          type="button"
          aria-label={isAddServerOpen ? "Close add server" : "Open add server"}
          className="absolute right-4 top-4 z-10"
          onClick={() => setIsAddServerOpen((prev) => !prev)}
        >
          {isAddServerOpen ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </Button>

        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base pr-12">
            <Server className="h-4 w-4" /> Servers
          </CardTitle>
          <CardDescription>
            Step 1: Select a computer running your Codex HTTPS agent. Each selection opens the next page.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {isAddServerOpen && (
            <div className="rounded border bg-slate-50 p-3">
              <p className="text-sm font-medium">Add another server</p>
              <div className="mt-3 flex gap-2">
                <Input value={newServerName} onChange={(e) => setNewServerName(e.target.value)} placeholder="Server name" />
                <Input value={newServerUrl} onChange={(e) => setNewServerUrl(e.target.value)} placeholder="https://..." />
                <Button size="icon" type="button" aria-label="Add server">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-2 text-xs text-slate-500">Server creation is currently UI-only in this prototype.</p>
            </div>
          )}

          <Button variant="outline" className="w-full justify-between" onClick={copyInstallCommand}>
            Copy install command
            <Copy className="h-4 w-4" />
          </Button>
          <code className="block rounded bg-slate-900 p-2 text-xs text-slate-100">{installCommand}</code>

          <div className="space-y-2">
            {remoteServers.map((server) => (
              <Link
                key={server.id}
                href={`/servers/${server.id}/workspaces`}
                className="flex w-full items-center justify-between rounded border p-3 text-left hover:bg-slate-50"
              >
                <div>
                  <p className="font-medium">{server.name}</p>
                  <p className="text-xs text-slate-500">{server.url}</p>
                </div>
                <Badge>{server.status}</Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
