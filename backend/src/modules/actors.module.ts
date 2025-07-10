import { Module } from "@nestjs/common";
import { ActorsService } from "../services/actors.service";
import { ActorsController } from "../controllers/actors.controller";

@Module({
  controllers: [ActorsController],
  providers: [ActorsService],
})
export class ActorsModule {}
