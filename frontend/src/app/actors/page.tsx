import { Suspense } from "react";
import { fetchActors } from "@/lib/api/actorsApi";
import { ActorList } from "@/modules/actors/components/ActorList";
import { Pagination } from "@/shared/components/Pagination";
import { SearchForm } from "@/shared/components/SearchForm";

interface ActorsPageProps {
  readonly searchParams: Promise<{
    readonly search?: string;
    readonly page?: string;
  }>;
}

export default async function ActorsPage({ searchParams }: ActorsPageProps) {
  const params = await searchParams;
  const search = params.search || "";
  const pageQuery = Number.parseInt(params.page || "1");

  const { data, totalPages, currentPage } = await fetchActors(search, pageQuery);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 text-center">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Actors</h1>

      <SearchForm placeholder="Search actors..." />

      <Suspense fallback={null}>
        <ActorList actors={data} />
      </Suspense>

      {data.length > 0 && <Pagination currentPage={currentPage} totalPages={totalPages} search={search} />}
    </div>
  );
}
