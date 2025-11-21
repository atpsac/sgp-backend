import { Controller, Get, Post, Body, UseGuards, ParseIntPipe, Param, UseFilters, Req } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RoleProtected } from './decorators/role-protected.decorator';
import { PermissionProtected } from './decorators/permission-protected.decorator';
import { ValidPermissions, ValidRoles } from './interfaces';
import { JwtAccessTokenAuthGuard } from "./guards/jwt-auth.guard"
import { JwtRefreshTokenAuthGuard } from './guards/jwt-refresh.guard';
import { UserRolePermissionGuard } from './guards/user-role-permission.guard';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto);
    }

    // @Get('users/:id')
    // @RoleProtected(ValidRoles.superAdmin)
    // @PermissionProtected(ValidPermissions.read)
    // @UseGuards(JwtAccessTokenAuthGuard,UserRolePermissionGuard)

    // async getUserRolesPermissions(@Param('id', ParseIntPipe) id: number){
    //     return await this.authService.getUserWithRolesAndPermissions(id);
    // }

    @Post('refresh')
    @UseGuards(JwtRefreshTokenAuthGuard)
    refresh(@Req() req) {
        const { user, refreshToken } = req.user;
        return this.authService.refreshTokens(user.id, refreshToken);
    }

    @Post('logout')
    @UseGuards(JwtAccessTokenAuthGuard)
    logout(@Req() req) {
        return this.authService.removeRefreshToken(req.user.id);
    }

}
