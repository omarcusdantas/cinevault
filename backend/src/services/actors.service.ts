import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, ILike } from "typeorm";
import { Actor } from "../entities/actor.entity";
import { CreateActorDto, UpdateActorDto } from "../dto/actor";
import { IActorsService } from "./interfaces/actors.service.interface";

@Injectable()
export class ActorsService implements IActorsService {
  constructor(@InjectRepository(Actor) private readonly actorRepository: Repository<Actor>) {}

  async create(dto: CreateActorDto) {
    const actor = this.actorRepository.create(dto);
    return this.actorRepository.save(actor);
  }

  async findAll(page: number, limit: number, name?: string) {
    const skip = (page - 1) * limit;

    const [items, total] = await this.actorRepository.findAndCount({
      where: name ? { name: ILike(`%${name}%`) } : {},
      skip,
      take: limit,
    });

    return {
      data: items,
      total,
      page,
      limit,
    };
  }

  async findById(id: number) {
    const actor = await this.actorRepository.findOne({
      where: { id },
      relations: ["movies"],
    });
    if (!actor) throw new NotFoundException("Actor not found");
    return actor;
  }

  async update(id: number, dto: UpdateActorDto) {
    const actor = await this.actorRepository.findOne({ where: { id } });
    if (!actor) throw new NotFoundException("Actor not found");

    return this.actorRepository.save({
      ...actor,
      ...dto,
    });
  }

  async delete(id: number) {
    const actor = await this.actorRepository.findOne({ where: { id } });
    if (!actor) throw new NotFoundException("Actor not found");

    await this.actorRepository.softDelete(id);
    return { message: "Actor deleted" };
  }
}
