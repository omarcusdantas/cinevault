import { Module } from "@nestjs/common";
import { MoviesService } from "../services/movies.service";
import { MoviesController } from "../controllers/movies.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Movie } from "../entities/movie.entity";
import { Actor } from "../entities/actor.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Actor])],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [TypeOrmModule],
})
export class MoviesModule {}
