import { Test, TestingModule } from "@nestjs/testing";
import { RatingsService } from "./ratings.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Rating } from "../entities/rating.entity";
import { Movie } from "../entities/movie.entity";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";
import { CreateRatingDto } from "../dto/rating/create-rating.dto";
import { UpdateRatingDto } from "../dto/rating/update-rating.dto";

describe("RatingsService", () => {
  let service: RatingsService;
  let ratingRepo: jest.Mocked<Repository<Rating>>;
  let movieRepo: jest.Mocked<Repository<Movie>>;

  const mockRating = {
    id: 1,
    score: 4,
    movie: { id: 1, title: "Test Movie" },
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Rating;
  const mockMovie = { id: 1, title: "Test Movie" } as Movie;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RatingsService,
        {
          provide: getRepositoryToken(Rating),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            softDelete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Movie),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RatingsService>(RatingsService);
    ratingRepo = module.get(getRepositoryToken(Rating));
    movieRepo = module.get(getRepositoryToken(Movie));
  });

  describe("findOne", () => {
    it("should return rating with movie relation", async () => {
      ratingRepo.findOne.mockResolvedValue(mockRating);

      const result = await service.findById(1);

      expect(ratingRepo.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ["movie"],
      });
      expect(result).toEqual(mockRating);
    });

    it("should throw if rating not found", async () => {
      ratingRepo.findOne.mockResolvedValue(null);

      await expect(service.findById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe("create", () => {
    it("should throw if movie not found", async () => {
      movieRepo.findOne.mockResolvedValue(null);
      const dto: CreateRatingDto = { score: 5, movieId: 1 };

      await expect(service.create(dto)).rejects.toThrow(NotFoundException);
    });

    it("should create and return rating", async () => {
      const dto: CreateRatingDto = { score: 5, movieId: 1 };
      movieRepo.findOne.mockResolvedValue(mockMovie);
      ratingRepo.create.mockReturnValue({
        ...dto,
        movie: mockMovie,
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Rating);
      ratingRepo.save.mockResolvedValue(mockRating);

      const result = await service.create(dto);

      expect(movieRepo.findOne).toHaveBeenCalledWith({ where: { id: dto.movieId } });
      expect(ratingRepo.create).toHaveBeenCalled();
      expect(result).toEqual(mockRating);
    });
  });

  describe("update", () => {
    it("should throw if rating not found", async () => {
      ratingRepo.findOne.mockResolvedValue(null);
      const dto: UpdateRatingDto = { score: 3, movieId: 1 };

      await expect(service.update(1, dto)).rejects.toThrow(NotFoundException);
    });

    it("should update and return the rating", async () => {
      const dto: UpdateRatingDto = { score: 3, movieId: 1 };
      ratingRepo.findOne.mockResolvedValue(mockRating);
      ratingRepo.save.mockResolvedValue({ ...mockRating, ...dto });

      const result = await service.update(1, dto);

      expect(result).toEqual({ ...mockRating, ...dto });
    });
  });

  describe("delete", () => {
    it("should throw if rating not found", async () => {
      ratingRepo.findOne.mockResolvedValue(null);

      await expect(service.delete(1)).rejects.toThrow(NotFoundException);
    });

    it("should soft delete the rating", async () => {
      ratingRepo.findOne.mockResolvedValue(mockRating);
      ratingRepo.softDelete.mockResolvedValue({ affected: 1 } as any);

      const result = await service.delete(1);

      expect(ratingRepo.softDelete).toHaveBeenCalledWith(1);
      expect(result).toEqual({ message: "Rating deleted" });
    });
  });
});
