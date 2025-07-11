"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Actor } from "@/lib/interfaces/actor/Actor";

interface ActorListProps {
  readonly actors: Actor[];
}

export function ActorList({ actors }: ActorListProps) {
  if (actors.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">No actors found</p>
      </div>
    );
  }

  return (
    <div className="mb-8 space-y-2">
      {actors.map((actor, index) => (
        <motion.div
          key={actor.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link
            href={`/actors/${actor.id}`}
            className="block rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <h3 className="text-lg font-medium text-gray-900">{actor.name}</h3>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
