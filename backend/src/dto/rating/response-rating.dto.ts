import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class ResponseRatingDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  score: string;

  @ApiProperty()
  @Expose()
  movieId: number;
}
