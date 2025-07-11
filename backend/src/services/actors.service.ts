import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Actor } from "../entities/actor.entity";
import { Repository, ILike } from "typeorm";
import { CreateActorDto } from "../dto/actor/create-actor.dto";
import { UpdateActorDto } from "../dto/actor/update-actor.dto";

@Injectable()
export class ActorsService {
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
