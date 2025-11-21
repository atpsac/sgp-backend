import { AuthGuard } from "@nestjs/passport";
export class JwtAccessTokenAuthGuard extends AuthGuard("jwt-access-token") {}