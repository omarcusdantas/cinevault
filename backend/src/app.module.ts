import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceOptions } from "../database/data-source";
import { MoviesModule } from "./movies/movies.module";
import { ActorsModule } from "./actors/actors.module";
import { RatingsModule } from "./ratings/ratings.module";

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), MoviesModule, ActorsModule, RatingsModule],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class AppModule {}
