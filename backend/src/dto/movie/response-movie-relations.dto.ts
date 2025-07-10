import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { ResponseMovieDto } from "./response-movie.dto";
import { ResponseActorDto } from "../actor/response-actor.dto";
import { ResponseRatingDto } from "../rating/response-rating.dto";

export class ResponseMovieWithRelationsDto extends ResponseMovieDto {
  @ApiProperty()
  @Expose()
  @Type(() => ResponseRatingDto)
  ratings: ResponseRatingDto[];

  @ApiProperty()
  @Expose()
  @Type(() => ResponseActorDto)
  actors: ResponseActorDto[];
}
