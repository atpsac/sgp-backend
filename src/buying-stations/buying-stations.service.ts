import { Injectable } from "@nestjs/common";
import { operations, buyingStations, operationsBuyingStations } from "src/database/database-schema";
import { DrizzleService } from "src/database/drizzle.service";
import { eq, and } from "drizzle-orm";

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

}