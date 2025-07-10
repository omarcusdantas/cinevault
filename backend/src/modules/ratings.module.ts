import { Module } from "@nestjs/common";
import { RatingsService } from "../services/ratings.service";
import { RatingsController } from "../controllers/ratings.controller";

@Module({
  controllers: [RatingsController],
  providers: [RatingsService],
})
export class RatingsModule {}
