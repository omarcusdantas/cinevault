import { ApiTags, ApiOperation, ApiBadRequestResponse, ApiCreatedResponse } from "@nestjs/swagger";
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from "@nestjs/common";
import { MoviesService } from "../services/movies.service";
import { CreateMovieDto } from "../dto/movie/create-movie.dto";
import { UpdateMovieDto } from "../dto/movie/update-movie.dto";

@ApiTags("Movies")
@Controller("v1/movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new movie" })
  @ApiCreatedResponse({ description: "Movie created" })
  @ApiBadRequestResponse({
    description: 'Invalid input',
  })
  create(@Body() dto: CreateMovieDto) {
    return this.moviesService.create(dto);
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.moviesService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(+id, updateMovieDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.moviesService.remove(+id);
  }
}
