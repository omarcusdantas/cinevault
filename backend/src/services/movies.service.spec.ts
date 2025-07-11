import { Test, TestingModule } from "@nestjs/testing";
import { MoviesService } from "./movies.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Movie } from "../entities/movie.entity";
import { Actor } from "../entities/actor.entity";
import { Repository } from "typeorm";
import { NotFoundException, BadRequestException } from "@nestjs/common";
import { CreateMovieDto } from "../dto/movie/create-movie.dto";
import { UpdateMovieDto } from "../dto/movie/update-movie.dto";

describe("MoviesService", () => {
  let service: MoviesService;
  let movieRepo: jest.Mocked<Repository<Movie>>;
  let actorRepo: jest.Mocked<Repository<Actor>>;

  const mockMovie = { id: 1, title: "Inception", createdAt: new Date(), updatedAt: new Date() } as Movie;
  const mockActor = { id: 1, name: "Leonardo DiCaprio" } as Actor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(Movie),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findAndCount: jest.fn(),
            findOne: jest.fn(),
            softDelete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Actor),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    movieRepo = module.get(getRepositoryToken(Movie));
    actorRepo = module.get(getRepositoryToken(Actor));
  });

  describe("create", () => {
    it("should throw if actor IDs are invalid", async () => {
      const dto: CreateMovieDto = { title: "Movie A", actorIds: [1, 2] };
      actorRepo.find.mockResolvedValue([{ id: 1 } as Actor]);

      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });

    it("should create and save a movie with valid actors", async () => {
      const dto: CreateMovieDto = { title: "Movie A", actorIds: [1] };
      actorRepo.find.mockResolvedValue([mockActor]);
      movieRepo.create.mockReturnValue(mockMovie);
      movieRepo.save.mockResolvedValue(mockMovie);

      const result = await service.create(dto);

      expect(actorRepo.find).toHaveBeenCalled();
      expect(movieRepo.create).toHaveBeenCalled();
      expect(result).toEqual(mockMovie);
    });
  });

  describe("findAll", () => {
    const mockMovie: Movie = {
      id: 1,
      title: "Inception",
      description: "A mind-bending thriller",
      createdAt: new Date(),
      updatedAt: new Date(),
      actors: [],
      ratings: [],
    };

    it("should return all movies without title filter", async () => {
      movieRepo.findAndCount.mockResolvedValue([[mockMovie], 1]);

      const result = await service.findAll(1, 10);

      expect(movieRepo.findAndCount).toHaveBeenCalledWith({
        where: {},
        skip: 0,
        take: 10,
      });

      expect(result).toEqual({
        data: [mockMovie],
        total: 1,
        page: 1,
        limit: 10,
      });
    });

    it("should return filtered movies by title", async () => {
      movieRepo.findAndCount.mockResolvedValue([[mockMovie], 1]);

      const result = await service.findAll(1, 10, "Inception");

      expect(movieRepo.findAndCount).toHaveBeenCalledWith({
        where: { title: expect.any(Object) },
        skip: 0,
        take: 10,
      });

      expect(result).toEqual({
        data: [mockMovie],
        total: 1,
        page: 1,
        limit: 10,
      });
    });
  });

  describe("findOne", () => {
    it("should return a movie with relations", async () => {
      movieRepo.findOne.mockResolvedValue(mockMovie);

      const result = await service.findById(1);

      expect(result).toEqual(mockMovie);
    });

    it("should throw if movie not found", async () => {
      movieRepo.findOne.mockResolvedValue(null);

      await expect(service.findById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe("update", () => {
    it("should throw if movie not found", async () => {
      movieRepo.findOne.mockResolvedValue(null);

      await expect(service.update(1, { title: "Updated", actorIds: [] })).rejects.toThrow(NotFoundException);
    });

    it("should update and save the movie", async () => {
      movieRepo.findOne.mockResolvedValue(mockMovie);
      actorRepo.find.mockResolvedValue([mockActor]);
      movieRepo.save.mockResolvedValue({ ...mockMovie, title: "Updated" });

      const dto: UpdateMovieDto = { title: "Updated", actorIds: [1] };

      const result = await service.update(1, dto);

      expect(movieRepo.save).toHaveBeenCalled();
      expect(result).toEqual(expect.objectContaining({ title: "Updated" }));
    });
  });

  describe("softDelete", () => {
    it("should throw if movie not found", async () => {
      movieRepo.findOne.mockResolvedValue(null);

      await expect(service.delete(1)).rejects.toThrow(NotFoundException);
    });

    it("should soft delete the movie", async () => {
      movieRepo.findOne.mockResolvedValue(mockMovie);
      movieRepo.softDelete.mockResolvedValue({ affected: 1 } as any);

      const result = await service.delete(1);

      expect(movieRepo.softDelete).toHaveBeenCalledWith(1);
      expect(result).toEqual({ message: "Movie soft-deleted" });
    });
  });

  describe("verifyActors", () => {
    it("should return actors if all exist", async () => {
      actorRepo.find.mockResolvedValue([mockActor]);

      const result = await service.verifyActors([1]);

      expect(result).toEqual([mockActor]);
    });

    it("should throw if any actor ID is missing", async () => {
      actorRepo.find.mockResolvedValue([mockActor]);

      await expect(service.verifyActors([1, 2])).rejects.toThrow(BadRequestException);
    });

    it("should return undefined if actorIds is empty", async () => {
      const result = await service.verifyActors([]);

      expect(result).toBeUndefined();
    });
  });
});
