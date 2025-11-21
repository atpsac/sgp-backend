import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from "../auth.service";
import { refreshTokenExtractor } from "../extractors/refresh-token.extractor";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, "jwt-refresh-token") {

    constructor(
        private authService: AuthService,
        private configService: ConfigService,
    ) {
        const jwtSecret = configService.get<string>('JWT_REFRESH_SECRET');

        if (!jwtSecret) {
            throw new Error('JWT_REFRESH_SECRET no está definida como variable de enterno');
        }

        super({
            secretOrKey: jwtSecret,
            jwtFromRequest: refreshTokenExtractor,
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: any) {


        const { sub } = payload;
        const { id } = sub;

        const user = await this.authService.validateUser(id);

        if (!user || !user.is_active) {
            throw new UnauthorizedException('Usuario no existe o está inactivo');
        }

        const refreshToken = refreshTokenExtractor(req);

        if (!refreshToken) {
            throw new UnauthorizedException('Esperando refresh token');
        }

        return { user, refreshToken };

    }
}