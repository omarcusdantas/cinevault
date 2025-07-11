import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ActorsService } from "../services/actors.service";
import { ACTORS_SERVICE } from "../utils/constants";
import { ActorsController } from "../controllers/actors.controller";
import { Actor } from "../entities/actor.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Actor])],
  controllers: [ActorsController],
  providers: [
    {
      provide: ACTORS_SERVICE,
      useClass: ActorsService,
    },
  ],
  exports: [TypeOrmModule],
})
export class ActorsModule {}
