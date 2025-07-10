import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { SignupDto } from "../dto/auth/signup.dto";
import { SigninDto } from "../dto/auth/signin.dto";
import { UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";

describe("AuthService", () => {
  let service: AuthService;
  let repo: jest.Mocked<Repository<User>>;
  let jwtService: jest.Mocked<JwtService>;

  const mockUser: User = {
    id: 1,
    email: "test@example.com",
    password: "hashedPassword",
  } as User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    repo = module.get(getRepositoryToken(User));
    jwtService = module.get(JwtService);
  });

  describe("signup", () => {
    it("should throw if email already exists", async () => {
      repo.findOne.mockResolvedValue(mockUser);

      const dto: SignupDto = { email: mockUser.email, password: "test" };

      await expect(service.signup(dto)).rejects.toThrow(UnauthorizedException);
    });

    it("should create a user and return a JWT", async () => {
      const dto: SignupDto = { email: "new@example.com", password: "password123" };
      const hashedPassword = await bcrypt.hash(dto.password, 10);

      repo.findOne.mockResolvedValue(null);
      repo.create.mockReturnValue({ ...dto, password: hashedPassword } as User);
      repo.save.mockResolvedValue({ ...mockUser, email: dto.email });
      jwtService.sign.mockReturnValue("signed-jwt");

      const result = await service.signup(dto);

      expect(repo.findOne).toHaveBeenCalledWith({ where: { email: dto.email } });
      expect(repo.create).toHaveBeenCalledWith(expect.objectContaining({ email: dto.email }));
      expect(repo.save).toHaveBeenCalled();
      expect(result).toEqual({ token: "signed-jwt" });
    });
  });

  describe("signin", () => {
    it("should throw if user not found", async () => {
      repo.findOne.mockResolvedValue(null);

      const dto: SigninDto = { email: "fail@example.com", password: "pass" };

      await expect(service.signin(dto)).rejects.toThrow(UnauthorizedException);
    });

    it("should throw if password is incorrect", async () => {
      repo.findOne.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, "compare").mockResolvedValue(false);

      const dto: SigninDto = { email: mockUser.email, password: "wrongpass" };

      await expect(service.signin(dto)).rejects.toThrow(UnauthorizedException);
    });

    it("should return a JWT if credentials are valid", async () => {
      repo.findOne.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, "compare").mockResolvedValue(true);
      jwtService.sign.mockReturnValue("valid-jwt");

      const dto: SigninDto = { email: mockUser.email, password: "correct" };

      const result = await service.signin(dto);

      expect(jwtService.sign).toHaveBeenCalledWith({ sub: mockUser.id });
      expect(result).toEqual({ token: "valid-jwt" });
    });
  });

  describe("validateUser", () => {
    it("should return user by id", async () => {
      repo.findOne.mockResolvedValue(mockUser);

      const result = await service.validateUser(mockUser.id);

      expect(repo.findOne).toHaveBeenCalledWith({ where: { id: mockUser.id } });
      expect(result).toEqual(mockUser);
    });
  });
});
