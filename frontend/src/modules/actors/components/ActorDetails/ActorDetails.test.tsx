import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { ActorWithRelations } from "@/lib/interfaces/actor/ActorWithRelations";
import { ActorDetails } from "./index";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}));

vi.mock("motion/react", () => ({
  motion: {
    div: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  },
}));

const mockActor: ActorWithRelations = {
  id: 1,
  name: "Keanu Reeves",
  movies: [
    { id: 101, title: "The Matrix" },
    { id: 102, title: "John Wick" },
  ],
};

describe("ActorDetails component", () => {
  it("should render the actor's name", () => {
    render(<ActorDetails actor={mockActor} />);
    expect(screen.getByRole("heading", { name: /Keanu Reeves/i })).toBeInTheDocument();
  });

  it('should render "No movies registered" when the movies list is empty', () => {
    const actorWithoutMovies = { ...mockActor, movies: [] };
    render(<ActorDetails actor={actorWithoutMovies} />);
    expect(screen.getByText("No movies registered")).toBeInTheDocument();
  });
});
