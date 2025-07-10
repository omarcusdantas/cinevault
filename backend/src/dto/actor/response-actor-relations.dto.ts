import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { ResponseActorDto } from "./response-actor.dto";
import { ResponseMovieDto } from "../movie/response-movie.dto";

export class ResponseActorWithRelationsDto extends ResponseActorDto {
  @ApiProperty()
  @Expose()
  @Type(() => ResponseMovieDto)
  movies: ResponseMovieDto[];
}
