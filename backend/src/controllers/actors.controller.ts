import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from "@nestjs/swagger";
import { ActorsService } from "../services/actors.service";
import { Actor } from "../entities/actor.entity";
import { CreateActorDto } from "src/dto/actor/create-actor.dto";
import { UpdateActorDto } from "../dto/actor/update-actor.dto";

@ApiTags("Actors")
@Controller("v1/actors")
export class ActorsController {
  constructor(private readonly actorsService: ActorsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new actor" })
  @ApiCreatedResponse({ description: "Actor created" })
  @ApiBadRequestResponse({
    description: "Invalid input",
  })
  create(@Body() dto: CreateActorDto) {
    return this.actorsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get paginated list of actors (with optional name search)" })
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "name", required: false, type: String })
  @ApiOkResponse({ description: "List of actors", type: [Actor] })
  findAll(@Query("page") page = 1, @Query("limit") limit = 10, @Query("name") name?: string) {
    return this.actorsService.findAll(page, limit, name);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get an actor by ID, including movies" })
  @ApiOkResponse({ description: "Actor found", type: Actor })
  @ApiNotFoundResponse({ description: "Actor not found" })
  findById(@Param("id", ParseIntPipe) id: number) {
    return this.actorsService.findById(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update actor" })
  @ApiOkResponse({ description: "Actor updated", type: Actor })
  @ApiNotFoundResponse({ description: "Actor not found" })
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateActorDto) {
    return this.actorsService.update(id, dto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Delete an actor" })
  @ApiNoContentResponse({ description: "Actor deleted" })
  @ApiNotFoundResponse({ description: "Actor not found" })
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.actorsService.delete(id);
  }
}
