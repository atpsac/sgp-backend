import { Injectable, NotFoundException } from "@nestjs/common";
import { operations, buyingStations, operationsBuyingStations } from "src/database/database-schema";
import { DrizzleService } from "src/database/drizzle.service";
import { eq, and } from "drizzle-orm";

@Injectable()
export class OperationsService {

    constructor(
        private readonly drizzleService: DrizzleService,
    ) { }

    async getAllOperations() {
        const db = this.drizzleService.db;

        return await db
            .select({
                id: operations.id,
                name: operations.name,
                code: operations.code,
            })
            .from(operations)
            .where(eq(operations.isActive, true));
    }

    async getOperationsByBuyingStation(stationId: number) {

        const db = this.drizzleService.db;

        // 1. Verificar que la sede está activa

        const station = await db.query.buyingStations.findFirst({
            where: and(
                eq(buyingStations.id, stationId),
                eq(buyingStations.isActive, true)
            ),
        });

        if (!station) {
            throw new NotFoundException('La sede no existe o está inactiva.');
        }

        // 2. Consultar operaciones asociadas activas
        const result = await db
            .select({
                id: operations.id,
                name: operations.name,
                code: operations.code,
                description: operations.description,
            })
            .from(operations)
            .innerJoin(
                operationsBuyingStations,
                eq(operations.id, operationsBuyingStations.idOperations)
            )
            .where(
                and(
                    eq(operationsBuyingStations.idBuyingStations, stationId),
                    eq(operations.isActive, true),
                    eq(operationsBuyingStations.isActive, true)
                )
            );

        return result;
    }

}