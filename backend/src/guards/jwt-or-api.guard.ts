import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import * as jwt from "jsonwebtoken";

@Injectable()
export class JwtOrApiGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers["authorization"];

    if (!authHeader?.startsWith("Bearer ")) {
      throw new UnauthorizedException("Missing or malformed Authorization header");
    }

    const token = authHeader.split(" ")[1];
    const jwtSecret = process.env.JWT_SECRET;
    const apiKey = process.env.API_KEY;

    try {
      const payload = jwt.verify(token, jwtSecret);
      (request as any).user = payload;
      return true;
    } catch {
      if (token === apiKey) {
        (request as any).user = { apiKey: true };
        return true;
      }
    }

    throw new UnauthorizedException("Invalid token or API key");
  }
}
