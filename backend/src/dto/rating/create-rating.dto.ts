import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, Min, Max } from "class-validator";

export class CreateRatingDto {
  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(5)
  score: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  movieId: number;
}
