import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { ResponseRatingDto } from "./response-rating.dto";
import { ResponseMovieDto } from "../movie/response-movie.dto";

export class ResponseRatingWithRelationsDto extends ResponseRatingDto {
  @ApiProperty()
  @Expose()
  @Type(() => ResponseMovieDto)
  movie: ResponseMovieDto;
}
