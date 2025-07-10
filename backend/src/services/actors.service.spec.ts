import { Test, TestingModule } from "@nestjs/testing";
import { ActorsService } from "./actors.service";
import { Actor } from "../entities/actor.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";
import { CreateActorDto } from "../dto/actor/create-actor.dto";
import { UpdateActorDto } from "../dto/actor/update-actor.dto";

const mockActor: Actor = {
  id: 1,
  name: "Leonardo DiCaprio",
  createdAt: new Date(),
  updatedAt: new Date(),
  movies: [],
};

describe("ActorsService", () => {
  let service: ActorsService;
  let repo: jest.Mocked<Repository<Actor>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActorsService,
        {
          provide: getRepositoryToken(Actor),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            softDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ActorsService>(ActorsService);
    repo = module.get(getRepositoryToken(Actor));
  });

  describe("create", () => {
    it("should create and save an actor", async () => {
      const dto: CreateActorDto = {
        name: mockActor.name,
      };

      repo.create.mockReturnValue(mockActor);
      repo.save.mockResolvedValue(mockActor);

      const result = await service.create(dto);
      expect(repo.create).toHaveBeenCalledWith(dto);
      expect(repo.save).toHaveBeenCalledWith(mockActor);
      expect(result).toEqual(mockActor);
    });
  });

  describe("findAll", () => {
    it("should return a paginated list without search", async () => {
      repo.find.mockResolvedValue([mockActor]);

      const result = await service.findAll(1, 10);
      expect(repo.find).toHaveBeenCalledWith({ skip: 0, take: 10 });
      expect(result).toEqual([mockActor]);
    });

    it("should return a paginated list with name search", async () => {
      repo.find.mockResolvedValue([mockActor]);

      const result = await service.findAll(1, 10, "Leo");
      expect(repo.find).toHaveBeenCalledWith({
        where: { name: expect.anything() },
        skip: 0,
        take: 10,
      });
      expect(result).toEqual([mockActor]);
    });
  });

  describe("findById", () => {
    it("should return actor with relations", async () => {
      repo.findOne.mockResolvedValue(mockActor);

      const result = await service.findById(1);
      expect(repo.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ["movies"],
      });
      expect(result).toEqual(mockActor);
    });

    it("should throw NotFoundException if actor not found", async () => {
      repo.findOne.mockResolvedValue(null);

      await expect(service.findById(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe("update", () => {
    it("should update and return the updated actor", async () => {
      const updateDto: UpdateActorDto = { name: "Updated name" };

      repo.findOne.mockResolvedValue(mockActor);
      repo.save.mockResolvedValue({ ...mockActor, ...updateDto });

      const result = await service.update(1, updateDto);
      expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repo.save).toHaveBeenCalledWith({ ...mockActor, ...updateDto });
      expect(result.name).toBe(updateDto.name);
    });

    it("should throw NotFoundException if actor not found", async () => {
      repo.findOne.mockResolvedValue(null);

      await expect(service.update(1, { name: "Updated" })).rejects.toThrow(NotFoundException);
    });
  });

  describe("delete", () => {
    it("should soft delete an actor", async () => {
      repo.findOne.mockResolvedValue(mockActor);
      repo.softDelete.mockResolvedValue({ affected: 1 } as any);

      const result = await service.delete(1);
      expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repo.softDelete).toHaveBeenCalledWith(1);
      expect(result).toEqual({ message: "Actor deleted" });
    });

    it("should throw NotFoundException if actor not found", async () => {
      repo.findOne.mockResolvedValue(null);

      await expect(service.delete(123)).rejects.toThrow(NotFoundException);
    });
  });
});
