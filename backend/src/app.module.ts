import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceOptions } from "./database/data-source";
import { MoviesModule, ActorsModule, RatingsModule, AuthModule } from "./modules";

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), MoviesModule, ActorsModule, RatingsModule, AuthModule],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class AppModule {}
