import {
  ApiTags,
  ApiOperation,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiQuery,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiBearerAuth,
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
  UseGuards,
  Inject,
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { JwtOrApiGuard } from "../guards/jwt-or-api.guard";
import { IMoviesService } from "../services/interfaces/movies.service.interface";
import { MOVIES_SERVICE } from "../utils/constants";
import { CreateMovieDto, UpdateMovieDto, ResponseMovieDto, ResponseMovieWithRelationsDto } from "../dto/movie";
import { ResponsePaginatedDto } from "../dto/pagination/reponse-paginated.dto";

@ApiTags("Movies")
@Controller("v1/movies")
export class MoviesController {
  constructor(
    @Inject(MOVIES_SERVICE)
    private readonly moviesService: IMoviesService
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtOrApiGuard)
  @ApiBearerAuth()
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
  @ApiOkResponse({ description: "List of movies", type: ResponsePaginatedDto<ResponseMovieDto> })
  async findAll(@Query("page") page = 1, @Query("limit") limit = 10, @Query("title") title?: string) {
    const movies = await this.moviesService.findAll(page, limit, title);
    const formatedMovies = plainToInstance(ResponseMovieDto, movies.data, { excludeExtraneousValues: true });

    return {
      data: formatedMovies,
      total: movies.total,
      page: movies.page,
      limit: movies.limit,
    };
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: "Get a movie by ID, including actors and ratings" })
  @ApiOkResponse({ description: "Movie found", type: ResponseMovieWithRelationsDto })
  @ApiNotFoundResponse({ description: "Movie not found" })
  getById(@Param("id", ParseIntPipe) id: number) {
    const movie = this.moviesService.findById(id);
    return plainToInstance(ResponseMovieWithRelationsDto, movie, { excludeExtraneousValues: true });
  }

  @Put(":id")
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtOrApiGuard)
  @ApiBearerAuth()
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
  @UseGuards(JwtOrApiGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Soft delete a movie" })
  @ApiNoContentResponse({ description: "Movie deleted" })
  @ApiNotFoundResponse({ description: "Movie not found" })
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.moviesService.delete(id);
  }
}
