import { Controller, ForbiddenException, Get, Param, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAccessTokenAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleProtected } from 'src/auth/decorators/role-protected.decorator';
import { PermissionProtected } from 'src/auth/decorators/permission-protected.decorator';
import { UserRolePermissionGuard } from 'src/auth/guards/user-role-permission.guard';
import { ValidRoles, ValidPermissions } from 'src/auth/interfaces';
import { EmployeeStationsResponseDto } from './dto/users-response.dto';
import { ApiResponse } from 'src/common/dto/response.dto';

@Controller('users')
export class UsersController {

    constructor(
        private readonly userService: UsersService
    ) { }

    @Get(":userId/buying-stations")
    @RoleProtected(ValidRoles.user)
    @PermissionProtected(ValidPermissions.read)
    @UseGuards(JwtAccessTokenAuthGuard, UserRolePermissionGuard)
    async getStationsByEmployee(
        @Param('userId', ParseIntPipe) userId: number,
        @Req() req: any):Promise<ApiResponse<EmployeeStationsResponseDto>> {
        
            const tokenUserId = req.user.id;
             
            if(userId !== tokenUserId) {
                throw new ForbiddenException('No tienes permisos para consultar información de otro usuario');
            } 

        return await this.userService.getStationsByEmployee(userId);
    }

}
