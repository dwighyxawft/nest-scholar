import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private authService: AuthService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // Extract the access_token from the cookie
    const accessToken = req.cookies['access_token'];

    if (accessToken) {
      try {
        // Verify the access_token
        const decodedToken = this.jwtService.verify(accessToken);

        // Attach user details to the request object
        req["user"] = decodedToken;
        // Continue with the request processing
        next();
      } catch (error) {
        // Handle token verification failure (e.g., expired token)
        await this.authService.deleteToken(accessToken);
        res.redirect('/auth');
      }
    } else {
      // No access_token found in the cookie
      res.redirect('/auth');
    }
  }
}
