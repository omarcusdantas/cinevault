import { notFound } from "next/navigation";
import { fetchActorById } from "@/lib/api/actorsApi";
import { ActorDetails } from "@/modules/actors/components/ActorDetails";

interface ActorPageProps {
  readonly params: Promise<{
    id: string;
  }>;
}

export default async function ActorPage({ params }: ActorPageProps) {
  const { id } = await params;
  const actorId = Number.parseInt(id);

  try {
    const actor = await fetchActorById(actorId);

    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <ActorDetails actor={actor} />
      </div>
    );
  } catch (error) {
    if (error instanceof Response && error.status === 404) {
      return notFound();
    }

    throw error;
  }
}
