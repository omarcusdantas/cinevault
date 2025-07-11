import { SignupDto, SigninDto } from "../../dto/auth";
import { User } from "../../entities/user.entity";

export interface IAuthService {
  signup(dto: SignupDto): Promise<{ token: string }>;
  signin(dto: SigninDto): Promise<{ token: string }>;
  validateUser(userId: number): Promise<User | null>;
}
