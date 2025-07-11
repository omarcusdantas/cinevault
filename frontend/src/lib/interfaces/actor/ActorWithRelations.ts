import { Actor } from "./Actor";
import { Movie } from "../movie/Movie";

export interface ActorWithRelations extends Actor {
  movies: Movie[];
}
