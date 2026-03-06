import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

describe("HomePage", () => {
  it("renders servers panel with plus icon toggle for add-server form", () => {
    render(<HomePage />);
    expect(screen.getByText("Servers")).toBeTruthy();
    expect(screen.getByText("Copy install command")).toBeTruthy();
    expect(screen.queryByText("Add another server")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: /open add server/i }));
    expect(screen.getByText("Add another server")).toBeTruthy();

    expect(screen.getByRole("link", { name: /MacBook Pro/i }).getAttribute("href")).toBe("/servers/srv-1/workspaces");
  });
});
