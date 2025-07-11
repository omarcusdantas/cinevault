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
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
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
  ApiBearerAuth,
} from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { JwtOrApiGuard } from "../guards/jwt-or-api.guard";
import { ActorsService } from "../services/actors.service";
import { CreateActorDto } from "../dto/actor/create-actor.dto";
import { UpdateActorDto } from "../dto/actor/update-actor.dto";
import { ResponseActorDto } from "../dto/actor/response-actor.dto";
import { PaginationResponseDto } from "src/dto/pagination-response.dto";
import { ResponseActorWithRelationsDto } from "../dto/actor/response-actor-relations.dto";

@ApiTags("Actors")
@Controller("v1/actors")
export class ActorsController {
  constructor(private readonly actorsService: ActorsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtOrApiGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a new actor" })
  @ApiCreatedResponse({ description: "Actor created", type: ResponseActorDto })
  @ApiBadRequestResponse({
    description: "Invalid input",
  })
  create(@Body() dto: CreateActorDto) {
    const actor = this.actorsService.create(dto);
    return plainToInstance(ResponseActorDto, actor, { excludeExtraneousValues: true });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: "Get paginated list of actors (with optional name search)" })
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "name", required: false, type: String })
  @ApiOkResponse({ description: "List of actors", type: PaginationResponseDto<ResponseActorDto> })
  async findAll(@Query("page") page = 1, @Query("limit") limit = 10, @Query("name") name?: string) {
    const actors = await this.actorsService.findAll(page, limit, name);
    const formatedActors = plainToInstance(ResponseActorDto, actors.data, { excludeExtraneousValues: true });

    return {
      data: formatedActors,
      total: actors.total,
      page: actors.page,
      limit: actors.limit,
    };
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: "Get an actor by ID, including movies" })
  @ApiOkResponse({ description: "Actor found", type: ResponseActorWithRelationsDto })
  @ApiNotFoundResponse({ description: "Actor not found" })
  findById(@Param("id", ParseIntPipe) id: number) {
    const actor = this.actorsService.findById(id);
    return plainToInstance(ResponseActorWithRelationsDto, actor, { excludeExtraneousValues: true });
  }

  @Put(":id")
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtOrApiGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update actor" })
  @ApiOkResponse({ description: "Actor updated", type: ResponseActorDto })
  @ApiNotFoundResponse({ description: "Actor not found" })
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateActorDto) {
    const actor = this.actorsService.update(id, dto);
    return plainToInstance(ResponseActorDto, actor, { excludeExtraneousValues: true });
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtOrApiGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete an actor" })
  @ApiNoContentResponse({ description: "Actor deleted" })
  @ApiNotFoundResponse({ description: "Actor not found" })
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.actorsService.delete(id);
  }
}
