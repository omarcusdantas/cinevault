import { Movie } from "./Movie";
import { Actor } from "../actor/Actor";
import { Rating } from "../rating/Rating";

export interface MovieWithRelations extends Movie {
  ratings: Rating[];
  actors: Actor[];
}
