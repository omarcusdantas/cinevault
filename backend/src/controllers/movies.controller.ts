import {
  ApiTags,
  ApiOperation,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiQuery,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
} from "@nestjs/swagger";
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Query,
} from "@nestjs/common";
import { MoviesService } from "../services/movies.service";
import { CreateMovieDto } from "../dto/movie/create-movie.dto";
import { UpdateMovieDto } from "../dto/movie/update-movie.dto";
import { Movie } from "../entities/movie.entity";

@ApiTags("Movies")
@Controller("v1/movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new movie" })
  @ApiCreatedResponse({ description: "Movie created" })
  @ApiBadRequestResponse({
    description: "Invalid input",
  })
  create(@Body() dto: CreateMovieDto) {
    return this.moviesService.create(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Retrieve a paginated list of movies" })
  @ApiQuery({ name: "page", required: false, type: Number, example: 1 })
  @ApiQuery({ name: "limit", required: false, type: Number, example: 10 })
  @ApiOkResponse({ description: "List of movies", type: [Movie] })
  getAll(@Query("page") page = 1, @Query("limit") limit = 10) {
    return this.moviesService.findAll(page, limit);
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get a movie by ID, including actors and ratings" })
  @ApiOkResponse({ description: "Movie found", type: Movie })
  @ApiNotFoundResponse({ description: "Movie not found" })
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.moviesService.findOne(id);
  }

  @Put(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Update an existing movie" })
  @ApiOkResponse({ description: "Movie updated", type: Movie })
  @ApiBadRequestResponse({ description: "Invalid input" })
  @ApiNotFoundResponse({ description: "Movie not found" })
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateMovieDto) {
    return this.moviesService.update(id, dto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Soft delete a movie" })
  @ApiNoContentResponse({ description: "Movie deleted" })
  @ApiNotFoundResponse({ description: "Movie not found" })
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.moviesService.softDelete(id);
  }
}
