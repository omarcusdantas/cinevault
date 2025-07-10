import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Rating } from "../entities/rating.entity";
import { Movie } from "../entities/movie.entity";
import { Repository } from "typeorm";
import { CreateRatingDto } from "../dto/rating/create-rating.dto";
import { UpdateRatingDto } from "../dto/rating/update-rating.dto";

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating) readonly ratingRepository: Repository<Rating>,
    @InjectRepository(Movie) readonly movieRepository: Repository<Movie>
  ) {}

  async findOne(id: number) {
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
