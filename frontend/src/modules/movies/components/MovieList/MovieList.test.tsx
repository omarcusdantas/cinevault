import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { Movie } from "@/lib/interfaces/movie/Movie";
import { MovieList } from "./index";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}));

vi.mock("motion/react", () => ({
  motion: {
    div: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  },
}));

const mockMovies: Movie[] = [
  { id: 101, title: "The Matrix" },
  { id: 102, title: "The Matrix Reloaded" },
];

describe("MovieList component", () => {
  it('should render "No movies found" when the movies list is empty', () => {
    render(<MovieList movies={[]} />);
    expect(screen.getByText("No movies found")).toBeInTheDocument();
  });

  it("should render a list of movies with correct links", () => {
    render(<MovieList movies={mockMovies} />);

    const movieLinks = screen.getAllByRole("link");
    expect(movieLinks).toHaveLength(2);

    expect(screen.getByText("The Matrix")).toBeInTheDocument();
    expect(movieLinks[0]).toHaveAttribute("href", "/movies/101");

    expect(screen.getByText("The Matrix Reloaded")).toBeInTheDocument();
    expect(movieLinks[1]).toHaveAttribute("href", "/movies/102");
  });
});
