"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Message } from "@/lib/mock-data";

export function ConversationClient({ initialMessages }: { initialMessages: Message[] }) {
  const [messages, setMessages] = React.useState(initialMessages);
  const [prompt, setPrompt] = React.useState("");

  function sendMessage() {
    if (!prompt.trim()) return;

    const now = new Date().toLocaleTimeString();
    setMessages((prev) => [
      ...prev,
      { role: "user", content: prompt, createdAt: now },
      {
        role: "assistant",
        content: "(Mock response) This prompt would be sent to your selected machine agent over HTTPS.",
        createdAt: now,
      },
    ]);
    setPrompt("");
  }

  return (
    <div className="flex h-[70vh] flex-col gap-3">
      <div className="flex-1 space-y-2 overflow-y-auto rounded border bg-slate-50 p-3">
        {messages.map((message, index) => (
          <div key={`${message.createdAt}-${index}`} className="rounded-md border bg-white p-3">
            <p className="mb-1 text-xs uppercase text-slate-500">{message.role}</p>
            <p className="text-sm">{message.content}</p>
            <p className="mt-1 text-xs text-slate-400">{message.createdAt}</p>
          </div>
        ))}
      </div>
      <Textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Send command/prompt to Codex CLI" />
      <Button onClick={sendMessage}>Send</Button>
    </div>
  );
}
