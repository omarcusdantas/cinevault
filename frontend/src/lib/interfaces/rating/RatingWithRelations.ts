import { Rating } from "./Rating";
import { Movie } from "../movie/Movie";

export interface RatingWithRelations extends Rating {
  movie: Movie;
}
