import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In, ILike } from "typeorm";
import { Movie } from "../entities/movie.entity";
import { Actor } from "../entities/actor.entity";
import { CreateMovieDto, UpdateMovieDto } from "../dto/movie";
import { IMoviesService } from "./interfaces/movies.service.interface";

@Injectable()
export class MoviesService implements IMoviesService {
  constructor(
    @InjectRepository(Movie) private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Actor) private readonly actorRepository: Repository<Actor>
  ) {}

  async create(dto: CreateMovieDto) {
    const actors = await this.verifyActors(dto.actorIds);
    const movie = this.movieRepository.create({ ...dto, actors });
    return this.movieRepository.save(movie);
  }

  async findAll(page: number, limit: number, title?: string) {
    const skip = (page - 1) * limit;

    const [items, total] = await this.movieRepository.findAndCount({
      where: title ? { title: ILike(`%${title}%`) } : {},
      skip,
      take: limit,
    });

    return {
      data: items,
      total,
      page,
      limit,
    };
  }

  async findById(id: number) {
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

  async delete(id: number) {
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
