import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
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
    const actors = await this.verifyActors(dto.actorIds);
    const movie = this.movieRepository.create({ ...dto, actors });
    return this.movieRepository.save(movie);
  }

  async findAll(page = 1, limit = 10) {
    const [items, total] = await this.movieRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return {
      data: items,
      total,
      page,
      limit,
    };
  }

  async findOne(id: number) {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ["actors", "ratings"],
      withDeleted: false,
    });
    if (!movie) throw new NotFoundException("Movie not found");
    return movie;
  }

  async update(id: number, dto: UpdateMovieDto) {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) throw new NotFoundException("Movie not found");

    const actors = await this.verifyActors(dto.actorIds);

    return this.movieRepository.save({
      ...movie,
      ...dto,
      actors,
    });
  }

  async softDelete(id: number) {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) throw new NotFoundException("Movie not found");

    await this.movieRepository.softDelete(id);
    return { message: "Movie soft-deleted" };
  }

  async verifyActors(actorIds: number[]) {
    if (actorIds.length === 0) return;

    const actors = await this.actorRepository.find({ where: { id: In(actorIds) } });
    if (actors.length !== actorIds.length) {
      const foundIds = actors.map((a) => a.id);
      const missingIds = actorIds.filter((id) => !foundIds.includes(id));
      throw new BadRequestException(`Invalid actor IDs: ${missingIds.join(", ")}`);
    }

    return actors;
  }
}
