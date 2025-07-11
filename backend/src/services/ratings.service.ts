import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Rating } from "../entities/rating.entity";
import { Movie } from "../entities/movie.entity";
import { CreateRatingDto, UpdateRatingDto } from "../dto/rating";
import { IRatingsService } from "./interfaces/ratings.service.interface";

@Injectable()
export class RatingsService implements IRatingsService {
  constructor(
    @InjectRepository(Rating) private readonly ratingRepository: Repository<Rating>,
    @InjectRepository(Movie) private readonly movieRepository: Repository<Movie>
  ) {}

  async findById(id: number) {
    const rating = await this.ratingRepository.findOne({
      where: { id },
      relations: ["movie"],
    });
    if (!rating) throw new NotFoundException("Rating not found");
    return rating;
  }

  async create(dto: CreateRatingDto) {
    const movie = await this.movieRepository.findOne({ where: { id: dto.movieId } });
    if (!movie) throw new NotFoundException("Movie not found");

    const rating = this.ratingRepository.create({ ...dto, movie });
    return this.ratingRepository.save(rating);
  }

  async update(id: number, dto: UpdateRatingDto) {
    const rating = await this.ratingRepository.findOne({ where: { id } });
    if (!rating) throw new NotFoundException("Rating not found");

    return this.ratingRepository.save({
      ...rating,
      ...dto,
    });
  }

  async delete(id: number) {
    const rating = await this.ratingRepository.findOne({ where: { id } });
    if (!rating) throw new NotFoundException("Rating not found");

    await this.ratingRepository.softDelete(id);
    return { message: "Rating deleted" };
  }
}
