import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { SignupDto } from "../dto/auth/signup.dto";
import { SigninDto } from "../dto/auth/signin.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async signup(dto: SignupDto) {
    const existing = await this.userRepository.findOne({ where: { email: dto.email } });
    if (existing) throw new UnauthorizedException("Email already in use");

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.userRepository.create({ ...dto, password: hashed });
    await this.userRepository.save(user);

    return { token: this.jwtService.sign({ sub: user.id }) };
  }

  async signin(dto: SigninDto) {
    const user = await this.userRepository.findOne({ where: { email: dto.email } });
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return { token: this.jwtService.sign({ sub: user.id }) };
  }

  async validateUser(userId: number) {
    return this.userRepository.findOne({ where: { id: userId } });
  }
}
