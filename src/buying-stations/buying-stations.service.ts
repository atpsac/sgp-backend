import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { operations, buyingStations, operationsBuyingStations } from "src/database/database-schema";
import { DrizzleService } from "src/database/drizzle.service";
import { eq, and, not } from "drizzle-orm";

@Injectable()
export class BuyingStationsService {

    constructor(
        private readonly drizzleService: DrizzleService,
    ) { }

    async findBuyingStationsByOperation(idOperation: number) {
        const db = this.drizzleService.db;

        return await db
            .select({
                id: buyingStations.id,
                name: buyingStations.name,
                address: buyingStations.address,
                idUbigeos: buyingStations.idUbigeos,
                isPrincipal: buyingStations.isPrincipal,
            })
            .from(buyingStations)
            .innerJoin(
                operationsBuyingStations,
                eq(buyingStations.id, operationsBuyingStations.idBuyingStations)
            )
            .where(
                and(
                    eq(operationsBuyingStations.idOperations, idOperation),
                    eq(buyingStations.isActive, true),
                    eq(operationsBuyingStations.isActive, true)
                )
            );
    }

    async getNonPrincipalBuyingStations() {


        const db = this.drizzleService.db;
        // 1. Obtener sedes activas excepto la principal

        const stations = await db
            .select({
                id: buyingStations.id,
                name: buyingStations.name,
                address: buyingStations.address,
                isPrincipal: buyingStations.isPrincipal,
            })
            .from(buyingStations)
            .where(
                and(
                    eq(buyingStations.isActive, true),
                    not(eq(buyingStations.isPrincipal, true))
                )
            );

        // 2. Validación: No existen sedes
        if (!stations || stations.length === 0) {
            throw new NotFoundException(
                'No se encontraron sedes activas que no sean la sede principal.'
            );
        }

        return stations;

    }

    async getPrincipalBuyingStations() {


        const db = this.drizzleService.db;
        // 1. Obtener la sede activa principal

        const stations = await db
            .select({
                id: buyingStations.id,
                name: buyingStations.name,
                address: buyingStations.address,
                isPrincipal: buyingStations.isPrincipal,
            })
            .from(buyingStations)
            .where(
                and(
                    eq(buyingStations.isActive, true),
                    eq(buyingStations.isPrincipal, true)
                )
            )
            .limit(1);

        const station = stations[0];

        // 2. Validación: No existe sede principal
        if (!station) {
            throw new NotFoundException(
                'No se encontró la sedes activa que sea la principal.'
            );
        }

        return station;


    }

}