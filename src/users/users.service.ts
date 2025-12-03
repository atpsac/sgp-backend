import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { buyingStations, users, employees, employeesBuyingStations, ubigeos } from 'src/database/database-schema';
import { DrizzleService } from "src/database/drizzle.service";
import { eq, and, asc, desc, sql } from "drizzle-orm";
import { EmployeeStationsResponseDto } from './dto/users-response.dto';
import { ApiResponse } from 'src/common/dto/response.dto';

@Injectable()
export class UsersService {

    constructor(
        private readonly drizzleService: DrizzleService,
    ) { }

    async getStationsByEmployee(userId: number): Promise<ApiResponse<EmployeeStationsResponseDto>> {
        const db = this.drizzleService.db;

        try {
            // 1. Obtener datos del empleado y usuario
            const employeeUserData = await db
                .select({
                    employeeId: employees.id,
                    employeeFullName: sql`${employees.firstName} || ' ' || ${employees.fLastname} || ' ' || ${employees.mLastname}`,
                    userId: users.id,
                    username: users.username,
                })
                .from(employees)
                .innerJoin(users, eq(employees.idUsers, userId))
                .where(
                    and(
                        eq(users.id, userId),
                        eq(employees.isActive, true),
                        eq(users.isActive, true)
                    )
                )
                .limit(1);

                if (employeeUserData.length === 0) {
                    return new ApiResponse(
                        [], // Array vacío
                        `Usuario con ID ${userId} no encontrado o no tiene empleado asociado activo`,
                        'error'
                    );
                }

            const userInfo = employeeUserData[0];

            // 2. Obtener sedes del empleado
            const stations = await db
                .select({
                    id: buyingStations.id,
                    name: buyingStations.name,
                    address: buyingStations.address,
                    isPrincipal: buyingStations.isPrincipal,
                    ubigeoCode: ubigeos.code,
                    ubigeoRegion: ubigeos.region,
                    ubigeoProvince: ubigeos.province,
                    ubigeoDistrict: ubigeos.district,
                })
                .from(employeesBuyingStations)
                .innerJoin(
                    buyingStations,
                    eq(employeesBuyingStations.idBuyingStations, buyingStations.id)
                )
                .leftJoin(
                    ubigeos,
                    eq(buyingStations.idUbigeos, ubigeos.id)
                )
                .where(
                    and(
                        eq(employeesBuyingStations.idEmployees, userInfo.employeeId),
                        eq(employeesBuyingStations.isActive, true),
                        eq(buyingStations.isActive, true)
                    )
                )
                .orderBy(desc(buyingStations.isPrincipal), asc(buyingStations.name));

            // 3. Construir respuesta
            const mappedResponse: EmployeeStationsResponseDto = {
                userId: userInfo.userId,
                username: userInfo.username,
                employeeId: userInfo.employeeId,
                employeeFullName: String(userInfo.employeeFullName).trim(),
                stations: stations.map(station => ({
                    id: station.id,
                    name: station.name,
                    address: station.address || '',
                    isPrincipal: Boolean(station.isPrincipal),
                    ubigeoCode: station.ubigeoCode || '',
                    ubigeoRegion: station.ubigeoRegion || '',
                    ubigeoProvince: station.ubigeoProvince || '',
                    ubigeoDistrict: station.ubigeoDistrict || '',
                }))
            };

            return new ApiResponse([mappedResponse], "Listado de sedes obtenidas exitosamente");

        } catch (error) {
            throw new HttpException(
                {
                    success: false,
                    message: error.message || 'Error al obtener sedes del empleado',
                },
                HttpStatus.BAD_REQUEST
            );
        }
    }
}

