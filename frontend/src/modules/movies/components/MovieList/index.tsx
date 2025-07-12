"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Movie } from "@/lib/interfaces/movie/Movie";

interface MovieListProps {
  readonly movies: Movie[];
}

export function MovieList({ movies }: MovieListProps) {
  if (movies.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-secondary-foreground">No movies found</p>
      </div>
    );
  }

  return (
    <div className="mb-8 space-y-2">
      {movies.map((movie, index) => (
        <motion.div
          key={movie.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link
            href={`/movies/${movie.id}`}
            className="block rounded-lg border bg-secondary p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <h3 className="text-lg font-medium text-secondary-foreground">{movie.title}</h3>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
