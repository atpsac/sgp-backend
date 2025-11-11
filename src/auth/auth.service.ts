// src/rbac/rbac.service.ts
import { BadRequestException, ForbiddenException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DrizzleService } from '../database/drizzle.service';
import { eq, sql, and } from 'drizzle-orm';
import { users, roles, usersRoles, permissions, rolesPermissions } from '../database/database-schema';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserWithRolesResult } from './interfaces/user-with-roles.interface';

@Injectable()
export class AuthService {

    constructor(
        private readonly drizzleService: DrizzleService,
        private readonly jwtService: JwtService,
    ) { }

    async createUser() {

    }

    async login(loginUserDto: LoginUserDto) {

        const { password, email } = loginUserDto;

        // SQL Raw

        // const userQuery = await this.drizzleService.db.
        // execute(
        //     sql`
        //     SELECT u.id, u.email, u.name, u.password 
        //     FROM users AS u
        //     WHERE u.email = ${email}
        //     AND u.is_active = TRUE
        //     LIMIT 1;`
        // );

        //const user = userQuery.rows[0] as typeof users.$inferSelect | undefined;

        // Drizzle Query Builder

        const [user] = await this.drizzleService.db.
            select(
                {
                    id: users.id,
                    email: users.email,
                    username: users.username,
                    password: users.password,
                }
            )
            .from(users)
            .where(and(eq(users.email, email), eq(users.isActive, true)))
            .limit(1);

        if (!user)
            throw new UnauthorizedException('Credentials are not valid (email)');

        if (!bcrypt.compareSync(password, user.password))
            throw new UnauthorizedException('Credentials are not valid (password)');

        const { password: rawPass, ...userWithoutPassword } = user;

        return {
            ...userWithoutPassword,
            token: this.getJwtToken({ id: user.id })
        };

    }

    private getJwtToken(payload: JwtPayload) {

        const token = this.jwtService.sign(payload);
        return token;
    }

    // async getUserWithRolesAndPermissions(userId: number) {
    //     try {

    //         const result = await this.drizzleService.db.execute(sql
    //             `
    //             SELECT * FROM get_user_with_roles_permissions(${userId})         
    //             `);


    //         if (result.rows.length === 0) {
    //             throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    //         }

    //         return result.rows[0] as {
    //             id: number;
    //             email: string;
    //             username: string;
    //             roles: Array<{
    //                 name: string;
    //                 permissions: string[];
    //             }>;
    //         };

    //     }
    //     catch (error) {
    //         console.log(error)
    //         throw new HttpException(
    //             'Something went wrong',
    //             HttpStatus.INTERNAL_SERVER_ERROR,
    //         );
    //     }
    // }

    async getUserWithRolesAndPermissions(userId: number): Promise<UserWithRolesResult> {
        // Validación 1: ID válido (en aplicación)
        this.validateUserId(userId);

        // Validación 2: Usuario existe y está activo (en aplicación)
        await this.validateUserExistsAndActive(userId);

        // Obtener datos desde la función PostgreSQL
        const result = await this.getUserDataFromFunction(userId);

        // Validación 3: Datos retornados correctamente
        if (!result) {
            throw new NotFoundException('No se pudieron obtener los datos del usuario');
        }

        return result;
    }

    private validateUserId(userId: number): void {
        if (!userId || userId <= 0 || !Number.isInteger(userId)) {
            throw new BadRequestException('ID de usuario inválido');
        }
    }

    private async validateUserExistsAndActive(userId: number): Promise<void> {
        const userResult = await this.drizzleService.db
            .select({
                id: users.id,
                is_active: users.isActive,
                email: users.email
            })
            .from(users)
            .where(eq(users.id, userId))
            .limit(1);

        if (userResult.length === 0) {
            throw new NotFoundException('Usuario no encontrado');
        }

        const user = userResult[0];

        if (!user.is_active) {
            throw new ForbiddenException(`Usuario ${user.email} está inactivo`);
        }
    }

    private async getUserDataFromFunction(userId: number): Promise<UserWithRolesResult | null> {
        try {
            console.log(userId)
            // Ejecutar la función PostgreSQL
            const result = await this.drizzleService.db.execute(sql
                `
                            SELECT * FROM get_user_with_roles_permissions(${userId})         
                            `);

            return result.rows[0] as UserWithRolesResult || null;

        } catch (error) {
            console.error('Error ejecutando función PostgreSQL:', error);
            return null;
        }
    }


}
