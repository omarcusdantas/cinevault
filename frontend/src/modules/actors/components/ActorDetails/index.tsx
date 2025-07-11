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
      className="rounded-lg border bg-white p-8 shadow-sm"
    >
      <h2 className="mb-6 text-3xl font-bold text-gray-900">{actor.name}</h2>

      <div className="space-y-6">
        <div>
          <h3 className="mb-2 text-xl font-semibold text-gray-900">Movies</h3>
          {actor.movies.length > 0 ? (
            <ul className="space-y-1">
              {actor.movies.map((movie) => (
                <li key={movie.id}>
                  <Link href={`/movies/${movie.id}`} className="text-blue-600 hover:underline">
                    {movie.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No movies registered</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
