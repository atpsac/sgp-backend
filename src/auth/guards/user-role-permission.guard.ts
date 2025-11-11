import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { DrizzleService } from "src/database/drizzle.service";
import { META_ROLES } from "../decorators/role-protected.decorator";
import { META_PERMISSIONS } from "../decorators/permission-protected.decorator";

@Injectable()
export class UserRolePermissionGuard implements CanActivate {

    constructor(
        private readonly reflector: Reflector,
        private readonly drizzleService: DrizzleService
    ) {

    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const requiredRoles: string[] = this.reflector.get(META_ROLES, context.getHandler()) || [];
        const requiredPermissions: string[] = this.reflector.get(META_PERMISSIONS, context.getHandler() || []);

        if (requiredRoles.length === 0 && requiredPermissions.length === 0) {
            return true;
        }

        console.log(`Roles: ${requiredRoles}`);
        console.log(`Permisos: ${requiredPermissions}`);

        const req = context.switchToHttp().getRequest();
        const user = req.user;

        if (!user) {
            throw new BadRequestException('Usuario no autenticado');
        }

        console.log(`User: ${JSON.stringify(user)}`);

        const userRoles = this.extractUserRoles(user);
        const userPermissions = this.extractUserPermissions(user);

        console.log(userRoles);
        console.log(userPermissions);

        const hasRequiredRoles = requiredRoles.length === 0 ||
            this.checkRequiredRoles(requiredRoles, userRoles);

        const hasRequiredPermissions = requiredPermissions.length === 0 ||
            this.checkRequiredPermissions(requiredPermissions, userPermissions);

        if (!hasRequiredRoles || !hasRequiredPermissions) {
            this.throwForbiddenException(requiredRoles, requiredPermissions, hasRequiredRoles, hasRequiredPermissions);
        }

        return true;

        //const roleNames = user.roles.map(role => role.name);

        // for (const role of roleNames) {
        //     if (requiredRoles.includes(role)) {
        //         return true;
        //     }
        // }

        // throw new ForbiddenException(
        //     `User ${user.email} necesita un rol válido: [${requiredRoles}]`
        // );

    }

    private extractUserRoles(user: any): string[] {
        if (!user.roles) return [];

        if (Array.isArray(user.roles)) {
            if (typeof user.roles[0] === 'string') {
                return user.roles;
            } else if (typeof user.roles[0] === 'object' && user.roles[0].name) {
                return user.roles.map((role: any) => role.name);
            }
        }

        return [];
    }

    private extractUserPermissions(user: any): string[] {
        if (!user.roles) return [];

        const permissions: string[] = [];

        if (Array.isArray(user.roles)) {
            user.roles.forEach((role: any) => {
                if (role.permissions && Array.isArray(role.permissions)) {
                    permissions.push(...role.permissions);
                }
            });
        }

        return [...new Set(permissions)];
    }

    private checkRequiredRoles(requiredRoles: string[], userRoles: string[]): boolean {
        return requiredRoles.every(requiredRole =>
            userRoles.includes(requiredRole)
        );
    }

    private checkRequiredPermissions(requiredPermissions: string[], userPermissions: string[]): boolean {
        return requiredPermissions.every(requiredPermission =>
            userPermissions.includes(requiredPermission)
        );
    }

    private throwForbiddenException(
        requiredRoles: string[],
        requiredPermissions: string[],
        hasRoles: boolean,
        hasPermissions: boolean
      ): never {
        const missingRequirements: string[] = [];
    
        if (!hasRoles && requiredRoles.length > 0) {
          missingRequirements.push(`roles: ${requiredRoles.join(', ')}`);
        }
    
        if (!hasPermissions && requiredPermissions.length > 0) {
          missingRequirements.push(`permisos: ${requiredPermissions.join(', ')}`);
        }
    
        throw new ForbiddenException(
          `Acceso denegado. Se requieren: ${missingRequirements.join(' y ')}`
        );
      }


}


