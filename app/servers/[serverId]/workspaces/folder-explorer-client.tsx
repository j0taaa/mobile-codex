"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, FolderTree } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Workspace } from "@/lib/mock-data";
import { listFolders } from "@/lib/mock-data";

export function FolderExplorerClient({
  serverId,
  workspaces,
}: {
  serverId: string;
  workspaces: Workspace[];
}) {
  const [currentPath, setCurrentPath] = React.useState("~");
  const childFolders = listFolders(serverId, currentPath);

  const crumbs = currentPath === "~" ? ["~"] : currentPath.split("/");
  const activeWorkspace = workspaces.find((workspace) => workspace.path === currentPath);

  function goToCrumb(index: number) {
    if (index === 0) {
      setCurrentPath("~");
      return;
    }
    setCurrentPath(crumbs.slice(0, index + 1).join("/"));
  }

  return (
    <div className="space-y-3 rounded-md border bg-slate-50 p-3">
      <p className="flex items-center gap-2 text-sm font-medium"><FolderTree className="h-4 w-4" /> Folder explorer</p>
      <div className="flex flex-wrap items-center gap-1 text-xs text-slate-600">
        {crumbs.map((crumb, index) => (
          <React.Fragment key={`${crumb}-${index}`}>
            {index > 0 && <ChevronRight className="h-3 w-3" />}
            <button className="rounded px-1 py-0.5 hover:bg-slate-200" onClick={() => goToCrumb(index)}>
              {crumb}
            </button>
          </React.Fragment>
        ))}
      </div>

      <div className="space-y-2">
        {childFolders.length > 0 ? (
          childFolders.map((folder) => (
            <button
              key={folder.path}
              onClick={() => setCurrentPath(folder.path)}
              className="block w-full rounded border bg-white p-2 text-left text-sm hover:bg-slate-100"
            >
              {folder.name}
            </button>
          ))
        ) : (
          <p className="text-xs text-slate-500">No more subfolders here.</p>
        )}
      </div>

      {activeWorkspace ? (
        <Link href={`/servers/${serverId}/workspaces/${activeWorkspace.id}/sessions`}>
          <Button className="w-full">Open {activeWorkspace.path}</Button>
        </Link>
      ) : (
        <p className="text-xs text-slate-500">This folder has no Codex workspace history yet.</p>
      )}
    </div>
  );
}
