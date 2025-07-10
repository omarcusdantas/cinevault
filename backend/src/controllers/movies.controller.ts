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
  UseInterceptors,
  ClassSerializerInterceptor,
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { MoviesService } from "../services/movies.service";
import { CreateMovieDto } from "../dto/movie/create-movie.dto";
import { UpdateMovieDto } from "../dto/movie/update-movie.dto";
import { ResponseMovieDto } from "src/dto/movie/response-movie.dto";
import { ResponseMovieWithRelationsDto } from "src/dto/movie/response-movie-relations.dto";

@ApiTags("Movies")
@Controller("v1/movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: "Create a new movie" })
  @ApiCreatedResponse({ description: "Movie created", type: ResponseMovieDto })
  @ApiBadRequestResponse({
    description: "Invalid input",
  })
  create(@Body() dto: CreateMovieDto) {
    const movie = this.moviesService.create(dto);
    return plainToInstance(ResponseMovieDto, movie, { excludeExtraneousValues: true });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: "Get paginated list of movies (with optional title search)" })
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "title", required: false, type: String })
  @ApiOkResponse({ description: "List of movies", type: [ResponseMovieDto] })
  findAll(@Query("page") page = 1, @Query("limit") limit = 10, @Query("title") title?: string) {
    const movies = this.moviesService.findAll(page, limit, title);
    return plainToInstance(ResponseMovieDto, movies, { excludeExtraneousValues: true });
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: "Get a movie by ID, including actors and ratings" })
  @ApiOkResponse({ description: "Movie found", type: ResponseMovieWithRelationsDto })
  @ApiNotFoundResponse({ description: "Movie not found" })
  getById(@Param("id", ParseIntPipe) id: number) {
    const movie = this.moviesService.findOne(id);
    return plainToInstance(ResponseMovieWithRelationsDto, movie, { excludeExtraneousValues: true });
  }

  @Put(":id")
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: "Update an existing movie" })
  @ApiOkResponse({ description: "Movie updated", type: ResponseMovieDto })
  @ApiBadRequestResponse({ description: "Invalid input" })
  @ApiNotFoundResponse({ description: "Movie not found" })
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateMovieDto) {
    const movie = this.moviesService.update(id, dto);
    return plainToInstance(ResponseMovieDto, movie, { excludeExtraneousValues: true });
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
