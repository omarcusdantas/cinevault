import { CreateActorDto, UpdateActorDto } from "../../dto/actor";
import { Actor } from "../../entities/actor.entity";

export interface IActorsService {
  create(dto: CreateActorDto): Promise<Actor>;
  findAll(
    page: number,
    limit: number,
    name?: string
  ): Promise<{ data: Actor[]; total: number; page: number; limit: number }>;
  findById(id: number): Promise<Actor>;
  update(id: number, dto: UpdateActorDto): Promise<Actor>;
  delete(id: number): Promise<{ message: string }>;
}
