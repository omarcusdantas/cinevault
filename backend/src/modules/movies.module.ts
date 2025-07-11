import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MoviesService } from "../services/movies.service";
import { MOVIES_SERVICE } from "../utils/constants";
import { MoviesController } from "../controllers/movies.controller";
import { Movie } from "../entities/movie.entity";
import { Actor } from "../entities/actor.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Actor])],
  controllers: [MoviesController],
  providers: [
    {
      provide: MOVIES_SERVICE,
      useClass: MoviesService,
    },
  ],
  exports: [TypeOrmModule],
})
export class MoviesModule {}
