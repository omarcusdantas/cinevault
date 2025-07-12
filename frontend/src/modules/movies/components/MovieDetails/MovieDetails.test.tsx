import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { MovieWithRelations } from "@/lib/interfaces/movie/MovieWithRelations";
import { MovieDetails } from "./index";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}));

const mockMovie: MovieWithRelations = {
  id: 1,
  title: "Inception",
  description: "A thief who steals corporate secrets through the use of dream-sharing technology",
  ratings: [
    { id: 1, score: 5 },
    { id: 2, score: 4 },
  ],
  actors: [
    { id: 1, name: "Leonardo DiCaprio" },
    { id: 2, name: "Joseph Gordon-Levitt" },
  ],
};

describe("MovieDetails component", () => {
  it("should render movie title and description", () => {
    render(<MovieDetails movie={mockMovie} />);
    expect(screen.getByRole("heading", { name: /Inception/i })).toBeInTheDocument();
    expect(screen.getByText(mockMovie.description!)).toBeInTheDocument();
  });

  it('should render "No description available" when description is undefined', () => {
    const movieWithoutDescription = { ...mockMovie, description: undefined };
    render(<MovieDetails movie={movieWithoutDescription} />);
    expect(screen.getByText("No description available")).toBeInTheDocument();
  });

  it('should render "No actors registered" when there are no actors', () => {
    const movieWithoutActors = { ...mockMovie, actors: [] };
    render(<MovieDetails movie={movieWithoutActors} />);
    expect(screen.getByText("No actors registered")).toBeInTheDocument();
  });

  it("should handle pluralization for a single rating", () => {
    const movieWithOneRating = {
      ...mockMovie,
      ratings: [{ id: 1, score: 5, movieId: 1, userId: "user1" }],
    };
    render(<MovieDetails movie={movieWithOneRating} />);
    expect(screen.getByText("5.0")).toBeInTheDocument();
    expect(screen.getByText(/based on 1 rating/i)).toBeInTheDocument();
    expect(screen.queryByText(/based on 1 ratings/i)).toBeNull();
  });

  it('should render "No ratings available" when there are no ratings', () => {
    const movieWithoutRatings = { ...mockMovie, ratings: [] };
    render(<MovieDetails movie={movieWithoutRatings} />);
    expect(screen.getByText("No ratings available")).toBeInTheDocument();
  });
});
