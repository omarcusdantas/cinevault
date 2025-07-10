import { Module } from "@nestjs/common";
import { RatingsService } from "../services/ratings.service";
import { RatingsController } from "../controllers/ratings.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Rating } from "../entities/rating.entity";
import { Movie } from "../entities/movie.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Rating, Movie])],
  controllers: [RatingsController],
  providers: [RatingsService],
  exports: [TypeOrmModule],
})
export class RatingsModule {}
