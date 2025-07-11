import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiOkResponse,
} from "@nestjs/swagger";
import { AuthService } from "../services/auth.service";
import { SignupDto, SigninDto } from "../dto/auth";

@ApiTags("Auth")
@Controller("v1/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Register a new user" })
  @ApiCreatedResponse({ description: "User successfully registered and token issued" })
  @ApiBadRequestResponse({ description: "Email already in use or invalid input" })
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post("signin")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Authenticate an existing user" })
  @ApiOkResponse({ description: "Authentication successful" })
  @ApiUnauthorizedResponse({ description: "Invalid credentials" })
  signin(@Body() dto: SigninDto) {
    return this.authService.signin(dto);
  }
}
