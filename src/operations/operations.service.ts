import { Injectable } from "@nestjs/common";
import { operations, buyingStations, operationsBuyingStations } from "src/database/database-schema";
import { DrizzleService } from "src/database/drizzle.service";
import { eq, and } from "drizzle-orm";

@Injectable()
export class OperationsService {

    constructor(
        private readonly drizzleService: DrizzleService,
    ) { }

    async findAllActive() {
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

}