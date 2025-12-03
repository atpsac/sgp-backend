import { Controller, Get, Param, ParseIntPipe, UseGuards } from "@nestjs/common";
import { BuyingStationsService } from "./buying-stations.service";

import { JwtAccessTokenAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RoleProtected } from "src/auth/decorators/role-protected.decorator";
import { PermissionProtected } from "src/auth/decorators/permission-protected.decorator";
import { UserRolePermissionGuard } from "src/auth/guards/user-role-permission.guard";
import { ValidPermissions, ValidRoles } from "src/auth/interfaces";
import { ApiResponse } from "src/common/dto/response.dto";
import { BuyingStationsResponseDto } from "./dto/buying-stations-response.dto";

@Controller('buying-stations')
export class BuyingStationsController {
    constructor(private readonly buyingStationsService: BuyingStationsService) { }

    @Get("/operation/:id")
    @RoleProtected(ValidRoles.user)
    @PermissionProtected(ValidPermissions.read)
    @UseGuards(JwtAccessTokenAuthGuard, UserRolePermissionGuard)
    async findOperationsBuyingStations(@Param("id", ParseIntPipe) id: number) {
        return await this.buyingStationsService.findBuyingStationsByOperation(id);
    }

    @Get("/non-principal")
    @RoleProtected(ValidRoles.user)
    @PermissionProtected(ValidPermissions.read)
    @UseGuards(JwtAccessTokenAuthGuard, UserRolePermissionGuard)
    async getNonPrincipalBuyingStations(): Promise<ApiResponse<BuyingStationsResponseDto>> {
        return await this.buyingStationsService.getNonPrincipalBuyingStations();
    }

    @Get("/principal")
    @RoleProtected(ValidRoles.user)
    @PermissionProtected(ValidPermissions.read)
    @UseGuards(JwtAccessTokenAuthGuard, UserRolePermissionGuard)
    async getPrincipalBuyingStations(): Promise<ApiResponse<BuyingStationsResponseDto>> {
        return await this.buyingStationsService.getPrincipalBuyingStations();
    }

}