import { Module } from "@nestjs/common";
import { ActorsService } from "../services/actors.service";
import { ActorsController } from "../controllers/actors.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Actor } from "../entities/actor.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Actor])],
  controllers: [ActorsController],
  providers: [ActorsService],
  exports: [TypeOrmModule],
})

export class ActorsModule {}
