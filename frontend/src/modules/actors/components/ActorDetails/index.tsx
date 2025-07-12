"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ActorWithRelations } from "@/lib/interfaces/actor/ActorWithRelations";

interface ActorDetailsProps {
  readonly actor: ActorWithRelations;
}

export function ActorDetails({ actor }: ActorDetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border bg-primary p-8 shadow-sm"
    >
      <h2 className="mb-6 text-3xl font-bold text-primary-foreground">{actor.name}</h2>

      <div className="space-y-6">
        <div>
          <h3 className="mb-2 text-xl font-semibold text-tertiary">Movies</h3>
          {actor.movies.length > 0 ? (
            <ul className="space-y-1">
              {actor.movies.map((movie) => (
                <li key={movie.id}>
                  <Link href={`/movies/${movie.id}`} className="text-secondary hover:underline">
                    {movie.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-tertiary">No movies registered</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
