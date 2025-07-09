import { Movie } from "../../src/movies/entities/movie.entity";
import { Actor } from "../../src/actors/entities/actor.entity";
import { Rating } from "../../src/ratings/entities/rating.entity";

import { dataSource } from "../data-source";

async function seed() {
  await dataSource.initialize();
  console.log("Data source has been initialized.");

  const actorRepo = dataSource.getRepository(Actor);
  const movieRepo = dataSource.getRepository(Movie);
  const ratingRepo = dataSource.getRepository(Rating);

  const actors = [
    { name: "Leonardo DiCaprio" },
    { name: "Scarlett Johansson" },
    { name: "Morgan Freeman" },
    { name: "Jennifer Lawrence" },
    { name: "Tom Hanks" },
    { name: "Natalie Portman" },
    { name: "Robert Downey Jr." },
    { name: "Emma Stone" },
    { name: "Samuel L. Jackson" },
    { name: "Christian Bale" },
    { name: "Anne Hathaway" },
    { name: "Brad Pitt" },
    { name: "Gal Gadot" },
    { name: "Ryan Gosling" },
    { name: "Zoe Saldana" },
  ];

  const actorEntities = await actorRepo.save(actors);

  const movies = [
    { title: "Inception", actors: [actorEntities[0], actorEntities[9]] },
    { title: "Lost in Translation", actors: [actorEntities[1], actorEntities[13]] },
    { title: "Shawshank Redemption", actors: [actorEntities[2]] },
    { title: "Hunger Games", actors: [actorEntities[3], actorEntities[10]] },
    { title: "Forrest Gump", actors: [actorEntities[4]] },
    { title: "Black Swan", actors: [actorEntities[5]] },
    { title: "Iron Man", actors: [actorEntities[6], actorEntities[8]] },
    { title: "La La Land", actors: [actorEntities[7], actorEntities[13]] },
    { title: "Pulp Fiction", actors: [actorEntities[8], actorEntities[11]] },
    { title: "The Dark Knight", actors: [actorEntities[9], actorEntities[10]] },
    { title: "Les Misérables", actors: [actorEntities[10], actorEntities[3]] },
    { title: "Fight Club", actors: [actorEntities[11], actorEntities[2]] },
    { title: "Wonder Woman", actors: [actorEntities[12]] },
    { title: "Blade Runner 2049", actors: [actorEntities[13], actorEntities[7]] },
    { title: "Avatar", actors: [actorEntities[14]] },
  ];

  const movieEntities = await movieRepo.save(movies);

  const ratings = [
    { movie: movieEntities[0], score: 9 },
    { movie: movieEntities[0], score: 8 },
    { movie: movieEntities[1], score: 7 },
    { movie: movieEntities[1], score: 9 },
    { movie: movieEntities[2], score: 10 },
    { movie: movieEntities[3], score: 6 },
    { movie: movieEntities[3], score: 7 },
    { movie: movieEntities[6], score: 8 },
    { movie: movieEntities[6], score: 9 },
    { movie: movieEntities[7], score: 8 },
    { movie: movieEntities[7], score: 10 },
    { movie: movieEntities[7], score: 9 },
    { movie: movieEntities[9], score: 10 },
    { movie: movieEntities[9], score: 9 },
    { movie: movieEntities[10], score: 6 },
    { movie: movieEntities[12], score: 7 },
    { movie: movieEntities[12], score: 8 },
    { movie: movieEntities[14], score: 8 },
    { movie: movieEntities[14], score: 9 },
    { movie: movieEntities[14], score: 10 },
  ];

  await ratingRepo.save(ratings);

  console.log("Seeding complete.");
  await dataSource.destroy();
}

seed().catch((e) => {
  console.error("Seeding failed:", e);
  dataSource.destroy();
});
