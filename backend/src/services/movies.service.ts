import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Movie } from "../entities/movie.entity";
import { Actor } from "../entities/actor.entity";
import { Repository, In } from "typeorm";
import { CreateMovieDto } from "../dto/movie/create-movie.dto";
import { UpdateMovieDto } from "../dto/movie/update-movie.dto";

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) readonly movieRepository: Repository<Movie>,
    @InjectRepository(Actor) readonly actorRepository: Repository<Actor>
  ) {}

  async create(dto: CreateMovieDto) {
  let actors: Actor[] = [];

  if (dto.actorIds.length > 0) {
    actors = await this.actorRepository.find({
      where: { id: In(dto.actorIds) },
    });

    if (actors.length !== dto.actorIds.length) {
      const foundIds = actors.map((a) => a.id);
      const missingIds = dto.actorIds.filter((id) => !foundIds.includes(id));
      throw new BadRequestException(`Invalid actor IDs: ${missingIds.join(', ')}`);
    }
  }

  const movie = this.movieRepository.create({ ...dto, actors });
  return this.movieRepository.save(movie);
}
  findAll() {
    return `This action returns all movies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
