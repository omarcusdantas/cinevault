import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Actor } from "../entities/actor.entity";
import { Repository, ILike } from "typeorm";
import { UpdateActorDto } from "../dto/actor/update-actor.dto";

@Injectable()
export class ActorsService {
  constructor(@InjectRepository(Actor) readonly actorRepository: Repository<Actor>) {}

  async findAll(page = 1, limit = 10) {
    const [items, total] = await this.actorRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data: items, total, page, limit };
  }

  async findById(id: number) {
    const actor = await this.actorRepository.findOne({
      where: { id },
      relations: ["movies"],
    });
    if (!actor) throw new NotFoundException("Actor not found");
    return actor;
  }

  async searchByName(name: string) {
    return this.actorRepository.find({
      where: { name: ILike(`%${name}%`) },
      take: 10,
    });
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

    await this.actorRepository.delete(id);
    return { message: "Actor deleted" };
  }
}
