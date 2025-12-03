import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { BusinessPartnersService } from './business-partners.service';
import { PermissionProtected } from 'src/auth/decorators/permission-protected.decorator';
import { RoleProtected } from 'src/auth/decorators/role-protected.decorator';
import { JwtAccessTokenAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserRolePermissionGuard } from 'src/auth/guards/user-role-permission.guard';
import { ValidRoles, ValidPermissions } from 'src/auth/interfaces';
import { OperationBusinessPartnersResponseDto } from './dto/business-partners.dto';
import { ApiResponse } from 'src/common/dto/response.dto';

@Controller('business-partners')
export class BusinessPartnersController {

    constructor(private readonly businessPartnersService: BusinessPartnersService) { }

    @Get("/operation/:operationId")
    @RoleProtected(ValidRoles.user)
    @PermissionProtected(ValidPermissions.read)
    @UseGuards(JwtAccessTokenAuthGuard, UserRolePermissionGuard)
    async getBusinessPartnersByOperation(@Param("operationId", ParseIntPipe) operationId: number):Promise<ApiResponse<OperationBusinessPartnersResponseDto>> {
        return await this.businessPartnersService.getBusinessPartnersByOperation(operationId);
    }
}
