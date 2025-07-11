import { CreateRatingDto, UpdateRatingDto } from "../../dto/rating";
import { Rating } from "../../entities/rating.entity";

export interface IRatingsService {
  findById(id: number): Promise<Rating>;
  create(dto: CreateRatingDto): Promise<Rating>;
  update(id: number, dto: UpdateRatingDto): Promise<Rating>;
  delete(id: number): Promise<{ message: string }>;
}
