import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CarriersService } from './carriers.service';
import { CarrierResponseDto } from './dto/carriers-response.dto';
import { RoleProtected } from 'src/auth/decorators/role-protected.decorator';
import { PermissionProtected } from 'src/auth/decorators/permission-protected.decorator';
import { JwtAccessTokenAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserRolePermissionGuard } from 'src/auth/guards/user-role-permission.guard';
import { ValidPermissions, ValidRoles } from 'src/auth/interfaces';
import { ApiResponse } from 'src/common/dto/response.dto';
import { DriverResponseDto } from 'src/drivers/dto/driver-response.dto';
import { TruckResponseDto } from 'src/trucks/dto/trucks-response.dto';
import { TrailerResponseDto } from 'src/trailers/dto/trailers-response.dto';

@Controller('carriers')
export class CarriersController {

    constructor(private readonly carriersService: CarriersService) { }


    @Get("")
    @RoleProtected(ValidRoles.user)
    @PermissionProtected(ValidPermissions.read)
    @UseGuards(JwtAccessTokenAuthGuard, UserRolePermissionGuard)
    async getCarriers(): Promise<ApiResponse<CarrierResponseDto>> {
        return this.carriersService.getCarriers();
    }

    @Get(":carrierId/drivers")
    @RoleProtected(ValidRoles.user)
    @PermissionProtected(ValidPermissions.read)
    @UseGuards(JwtAccessTokenAuthGuard, UserRolePermissionGuard)
    async getDriversByCarrier(
        @Param('carrierId', ParseIntPipe) carrierId: number,
    ): Promise<ApiResponse<DriverResponseDto>> {
        return this.carriersService.getDriversByCarrier(carrierId);
    }


    @Get(":carrierId/trucks")
    @RoleProtected(ValidRoles.user)
    @PermissionProtected(ValidPermissions.read)
    @UseGuards(JwtAccessTokenAuthGuard, UserRolePermissionGuard)
    async getTrucksByCarrier(
        @Param('carrierId', ParseIntPipe) carrierId: number,
    ):Promise<ApiResponse<TruckResponseDto>> {
        return this.carriersService.getTrucksByCarrier(carrierId)
    }


    @Get(":carrierId/trailers")
    @RoleProtected(ValidRoles.user)
    @PermissionProtected(ValidPermissions.read)
    @UseGuards(JwtAccessTokenAuthGuard, UserRolePermissionGuard)
    async getTrailersByCarrier(
        @Param('carrierId', ParseIntPipe) carrierId: number,
    ):Promise<ApiResponse<TrailerResponseDto>> {
        return this.carriersService.getTrailersByCarrier(carrierId)
    }



}
