import { Controller, Get, Put, Delete, Param, Body, Query, HttpCode, HttpStatus, ParseIntPipe } from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
} from "@nestjs/swagger";
import { ActorsService } from "../services/actors.service";
import { Actor } from "../entities/actor.entity";
import { UpdateActorDto } from "../dto/actor/update-actor.dto";

@ApiTags("Actors")
@Controller("v1/actors")
export class ActorsController {
  constructor(private readonly service: ActorsService) {}

  @Get()
  @ApiOperation({ summary: "Get paginated list of actors" })
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiOkResponse({ description: "List of actors", type: [Actor] })
  findAll(@Query("page") page = 1, @Query("limit") limit = 10) {
    return this.service.findAll(page, limit);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get an actor by ID, including movies" })
  @ApiOkResponse({ description: "Actor found", type: Actor })
  @ApiNotFoundResponse({ description: "Actor not found" })
  findById(@Param("id", ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @Get("search/by-name")
  @ApiOperation({ summary: "Search actors by partial name" })
  @ApiQuery({ name: "name", required: true, type: String })
  @ApiOkResponse({ description: "Matching actors", type: [Actor] })
  search(@Query("name") name: string) {
    return this.service.searchByName(name);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update actor" })
  @ApiOkResponse({ description: "Actor updated", type: Actor })
  @ApiNotFoundResponse({ description: "Actor not found" })
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateActorDto) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Delete an actor" })
  @ApiNoContentResponse({ description: "Actor deleted" })
  @ApiNotFoundResponse({ description: "Actor not found" })
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
