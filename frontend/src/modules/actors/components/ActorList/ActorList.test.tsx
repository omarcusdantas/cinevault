import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { Actor } from "@/lib/interfaces/actor/Actor";
import { ActorList } from "./index";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}));

vi.mock("motion/react", () => ({
  motion: {
    div: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  },
}));

const mockActors: Actor[] = [
  { id: 1, name: "Tom Hanks" },
  { id: 2, name: "Meryl Streep" },
];

describe("ActorList component", () => {
  it('should render "No actors found" when the actors list is empty', () => {
    render(<ActorList actors={[]} />);
    expect(screen.getByText("No actors found")).toBeInTheDocument();
  });

  it("should render a list of actors with correct links", () => {
    render(<ActorList actors={mockActors} />);

    const actorLinks = screen.getAllByRole("link");
    expect(actorLinks).toHaveLength(2);

    expect(screen.getByText("Tom Hanks")).toBeInTheDocument();
    expect(actorLinks[0]).toHaveAttribute("href", "/actors/1");

    expect(screen.getByText("Meryl Streep")).toBeInTheDocument();
    expect(actorLinks[1]).toHaveAttribute("href", "/actors/2");
  });
});
