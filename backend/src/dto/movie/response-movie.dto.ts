import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class ResponseMovieDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  description?: string;
}
