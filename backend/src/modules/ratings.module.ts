import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RatingsService } from "../services/ratings.service";
import { RATINGS_SERVICE } from "../utils/constants";
import { RatingsController } from "../controllers/ratings.controller";
import { Rating } from "../entities/rating.entity";
import { Movie } from "../entities/movie.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Rating, Movie])],
  controllers: [RatingsController],
  providers: [
    {
      provide: RATINGS_SERVICE,
      useClass: RatingsService,
    },
  ],
  exports: [TypeOrmModule],
})
export class RatingsModule {}
