import { Injectable, NotFoundException } from '@nestjs/common';
import { buyingStations, users, employees, employeesBuyingStations } from 'src/database/database-schema';
import { DrizzleService } from "src/database/drizzle.service";
import { eq, and } from "drizzle-orm";

@Injectable()
export class UsersService {

    constructor(
        private readonly drizzleService: DrizzleService,
    ) { }

    async getBuyingStationsByEmployee(userId: number) {
        const db = this.drizzleService.db;

        // 1. Validar usuario
        const user = await db.query.users.findFirst({
            where: eq(users.id, userId),
        });

        if (!user || !user.isActive) {
            throw new NotFoundException('Usuario no encontrado o inactivo');
        }

        // 2. Validar empleado asociado al usuario
        const employee = await db.query.employees.findFirst({
            where: eq(employees.idUsers, user.id),
        });

        if (!employee || !employee.isActive) {
            throw new NotFoundException('Empleado no encontrado o inactivo');
        }

        // 3. Obtener sedes activas vinculadas al empleado
        const stations = await db
            .select({
                id: buyingStations.id,
                name: buyingStations.name,
                address: buyingStations.address,
                isPrincipal: buyingStations.isPrincipal,
            })
            .from(employeesBuyingStations)
            .innerJoin(
                buyingStations,
                eq(employeesBuyingStations.idBuyingStations, buyingStations.id),
            )
            .where(
                and(
                    eq(employeesBuyingStations.idEmployees, employee.id),
                    eq(employeesBuyingStations.isActive, true), // vínculo activo
                    eq(buyingStations.isActive, true)           // sede activa
                ),
            );

        return stations;
    }
}

