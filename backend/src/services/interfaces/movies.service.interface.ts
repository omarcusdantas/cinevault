import { CreateMovieDto, UpdateMovieDto } from "../../dto/movie";
import { Movie } from "../../entities/movie.entity";

export interface IMoviesService {
  create(dto: CreateMovieDto): Promise<Movie>;
  findAll(
    page: number,
    limit: number,
    name?: string
  ): Promise<{ data: Movie[]; total: number; page: number; limit: number }>;
  findById(id: number): Promise<Movie>;
  update(id: number, dto: UpdateMovieDto): Promise<Movie>;
  delete(id: number): Promise<{ message: string }>;
}
