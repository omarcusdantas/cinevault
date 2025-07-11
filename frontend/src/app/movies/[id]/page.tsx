import { notFound } from "next/navigation";
import { fetchMovieById } from "@/lib/api/moviesApi";
import { MovieDetails } from "@/modules/movies/components/MovieDetails";

interface MoviePageProps {
  readonly params: Promise<{
    id: string;
  }>;
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  const movieId = Number.parseInt(id);

  try {
    const movie = await fetchMovieById(movieId);

    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <MovieDetails movie={movie} />
      </div>
    );
  } catch (error) {
    if (error instanceof Response && error.status === 404) {
      return notFound();
    }

    throw error;
  }
}
