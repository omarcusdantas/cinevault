import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus, ParseIntPipe } from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
} from "@nestjs/swagger";
import { RatingsService } from "../services/ratings.service";
import { CreateRatingDto } from "../dto/rating/create-rating.dto";
import { UpdateRatingDto } from "../dto/rating/update-rating.dto";
import { Rating } from "../entities/rating.entity";

@ApiTags("Ratings")
@Controller("v1/ratings")
export class RatingsController {
  constructor(private readonly service: RatingsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new rating" })
  @ApiCreatedResponse({ description: "Rating created", type: Rating })
  @ApiBadRequestResponse({ description: "Invalid input" })
  create(@Body() dto: CreateRatingDto) {
    return this.service.create(dto);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a rating by ID" })
  @ApiOkResponse({ description: "Rating found", type: Rating })
  @ApiNotFoundResponse({ description: "Rating not found" })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a rating" })
  @ApiOkResponse({ description: "Rating updated", type: Rating })
  @ApiNotFoundResponse({ description: "Rating not found" })
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateRatingDto) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Delete a rating" })
  @ApiNoContentResponse({ description: "Rating deleted" })
  @ApiNotFoundResponse({ description: "Rating not found" })
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
