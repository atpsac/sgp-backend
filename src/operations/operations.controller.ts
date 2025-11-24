import { Controller, Get, UseGuards } from "@nestjs/common";
import { OperationsService } from "./operations.service";

import { JwtAccessTokenAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RoleProtected } from "src/auth/decorators/role-protected.decorator";
import { PermissionProtected } from "src/auth/decorators/permission-protected.decorator";
import { UserRolePermissionGuard } from "src/auth/guards/user-role-permission.guard";
import { ValidPermissions, ValidRoles } from "src/auth/interfaces";

@Controller('operations')
export class OperationsController {
    constructor(private readonly operationsService: OperationsService) { }

    @Get("")
    @RoleProtected(ValidRoles.user)
    @PermissionProtected(ValidPermissions.read)
    @UseGuards(JwtAccessTokenAuthGuard, UserRolePermissionGuard)
    async findAllOperationsActive() {
        return await this.operationsService.findAllActive();
    }

}