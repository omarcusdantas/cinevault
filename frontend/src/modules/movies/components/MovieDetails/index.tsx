"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { motion } from "motion/react";
import { MovieWithRelations } from "@/lib/interfaces/movie/MovieWithRelations";

interface MovieDetailsProps {
  readonly movie: MovieWithRelations;
}

export function MovieDetails({ movie }: MovieDetailsProps) {
  const averageRating =
    movie.ratings.length > 0
      ? movie.ratings.reduce((total, rating) => total + rating.score, 0) / movie.ratings.length
      : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border bg-primary p-8 shadow-sm"
    >
      <h2 className="mb-6 text-3xl font-bold text-primary-foreground">{movie.title}</h2>

      <div className="space-y-6">
        <div>
          <h3 className="mb-2 text-xl font-semibold text-tertiary">Description</h3>
          <p className="text-tertiary">{movie.description || "No description available"}</p>
        </div>

        <div>
          <h3 className="mb-2 text-xl font-semibold text-tertiary">Actors</h3>
          {movie.actors.length > 0 ? (
            <ul className="space-y-1">
              {movie.actors.map((actor) => (
                <li key={actor.id}>
                  <Link href={`/actors/${actor.id}`} className="text-secondary hover:underline">
                    {actor.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-tertiary">No actors registered</p>
          )}
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold text-tertiary">Rating</h2>
          {averageRating ? (
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-current text-primary-foreground" />
                <span className="ml-1 text-lg font-medium text-tertiary">{averageRating.toFixed(1)}</span>
              </div>
              <span className="text-tertiary">
                based on {movie.ratings.length} rating{movie.ratings.length !== 1 ? "s" : ""}
              </span>
            </div>
          ) : (
            <p className="text-tertiary">No ratings available</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
