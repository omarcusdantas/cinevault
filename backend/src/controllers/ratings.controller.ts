import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Inject,
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { JwtOrApiGuard } from "../guards/jwt-or-api.guard";
import { IRatingsService } from "../services/interfaces/ratings.service.interface";
import { RATINGS_SERVICE } from "../utils/constants";
import { CreateRatingDto, UpdateRatingDto, ResponseRatingDto, ResponseRatingWithRelationsDto } from "../dto/rating";

@ApiTags("Ratings")
@Controller("v1/ratings")
export class RatingsController {
  constructor(
    @Inject(RATINGS_SERVICE)
    private readonly ratingsService: IRatingsService
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtOrApiGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a new rating" })
  @ApiCreatedResponse({ description: "Rating created", type: ResponseRatingDto })
  @ApiBadRequestResponse({ description: "Invalid input" })
  create(@Body() dto: CreateRatingDto) {
    const rating = this.ratingsService.create(dto);
    return plainToInstance(ResponseRatingDto, rating, { excludeExtraneousValues: true });
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: "Get a rating by ID" })
  @ApiOkResponse({ description: "Rating found", type: ResponseRatingWithRelationsDto })
  @ApiNotFoundResponse({ description: "Rating not found" })
  findOne(@Param("id", ParseIntPipe) id: number) {
    const rating = this.ratingsService.findById(id);
    return plainToInstance(ResponseRatingWithRelationsDto, rating, { excludeExtraneousValues: true });
  }

  @Put(":id")
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtOrApiGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update a rating" })
  @ApiOkResponse({ description: "Rating updated", type: ResponseRatingDto })
  @ApiNotFoundResponse({ description: "Rating not found" })
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateRatingDto) {
    const rating = this.ratingsService.update(id, dto);
    return plainToInstance(ResponseRatingDto, rating, { excludeExtraneousValues: true });
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtOrApiGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete a rating" })
  @ApiNoContentResponse({ description: "Rating deleted" })
  @ApiNotFoundResponse({ description: "Rating not found" })
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.ratingsService.delete(id);
  }
}
