import { Controller, Get, Post, Body, UseGuards, ParseIntPipe, Param, UseFilters } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidPermissions, ValidRoles } from './interfaces';
import { AuthGuard } from '@nestjs/passport';
import { UserRolePermissionGuard } from './guards/user-role-permission.guard';
import { PermissionProtected } from './decorators/permission-protected.decorator';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Get('login')
    getUserRoles(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(  loginUserDto);
    }

    @Get('users/:id')
    @RoleProtected(ValidRoles.superAdmin)
    @PermissionProtected(ValidPermissions.print)
    @UseGuards(AuthGuard(),UserRolePermissionGuard)
    getUserRolesPermissions(@Param('id') id: number){
        return this.authService.getUserWithRolesAndPermissions(id);
    }

    @Get('users')
    @RoleProtected()
    @PermissionProtected()
    @UseGuards(AuthGuard(),UserRolePermissionGuard)
    getAllUsers() {
        return {
            message :"hello world"
        }
    }
}
