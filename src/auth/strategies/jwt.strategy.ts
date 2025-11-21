import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from "../auth.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt-access-token") {

    constructor(
        private authService: AuthService,
        private configService: ConfigService,
    ) {
        const jwtSecret = configService.get<string>('JWT_ACCESS_SECRET');

        if (!jwtSecret) {
            throw new Error('JWT_ACCESS_SECRET is not defined in environment variables');
        }
        
        super({
            secretOrKey: jwtSecret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
        });
    }

    async validate(payload: any) {


        const { sub } = payload;
        const {id} = sub;    

        const user = await this.authService.getUserWithRolesAndPermissions(id);

        if(!user) {
            throw new UnauthorizedException('Token no valido');
        } 

        return user;

    }
}