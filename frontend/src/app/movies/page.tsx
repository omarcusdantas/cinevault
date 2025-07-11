import { Suspense } from "react";
import { fetchMovies } from "@/lib/api/moviesApi";
import { MovieList } from "@/modules/movies/components/MovieList";
import { Pagination } from "@/shared/components/Pagination";
import { SearchForm } from "@/shared/components/SearchForm";

interface MoviesPageProps {
  readonly searchParams: Promise<{
    readonly search?: string;
    readonly page?: string;
  }>;
}

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  const params = await searchParams;
  const search = params.search || "";
  const pageQuery = Number.parseInt(params.page || "1");

  const { data, totalPages, currentPage } = await fetchMovies(search, pageQuery);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 text-center">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Movies</h1>

      <SearchForm placeholder="Search movies..." />

      <Suspense fallback={null}>
        <MovieList movies={data} />
      </Suspense>

      {data.length > 0 && <Pagination currentPage={currentPage} totalPages={totalPages} search={search} />}
    </div>
  );
}
