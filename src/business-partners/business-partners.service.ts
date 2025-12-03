import { Injectable, NotFoundException } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { bpRoles, businessPartners, businessPartnersBpRoles, carriers, operations, operationsBpRoles } from 'drizzle/schema';
import { ApiResponse } from 'src/common/dto/response.dto';
import { OperationBusinessPartnersResponseDto } from './dto/business-partners.dto';
import { DrizzleService } from 'src/database/drizzle.service';

@Injectable()
export class BusinessPartnersService {

    constructor(
        private readonly drizzleService: DrizzleService,
    ) { }

    async getBusinessPartnersByOperation(idOperation: number) : Promise<ApiResponse<OperationBusinessPartnersResponseDto>> {
        const db = this.drizzleService.db;
        // 1. validar que exista la operación
        const operation = await db.query.operations.findFirst({
            where: eq(operations.id, idOperation),
        });

        if (!operation || !operation.isActive) {
            throw new NotFoundException(`La operación con id ${idOperation} no existe o está inactiva`);
        }

        // 2. obtener los BP asociados
        const result = await db
            .select({
                id: businessPartners.id,
                companyName: businessPartners.companyName,
            })
            .from(operationsBpRoles)
            .innerJoin(bpRoles, eq(bpRoles.id, operationsBpRoles.idBpRoles))
            .innerJoin(
                businessPartnersBpRoles,
                eq(businessPartnersBpRoles.idBpRoles, bpRoles.id)
            )
            .innerJoin(
                businessPartners,
                eq(businessPartners.id, businessPartnersBpRoles.idBusinessPartners)
            )
            .where(
                and(
                    eq(operationsBpRoles.idOperations, idOperation),
                    eq(operationsBpRoles.isActive, true),
                    eq(bpRoles.isActive, true),
                    eq(businessPartnersBpRoles.isActive, true),
                    eq(businessPartners.isActive, true)
                )
            );

        // 3. normalizar la salida
        if (!result || result.length === 0) {
            return new ApiResponse<OperationBusinessPartnersResponseDto>(
                [],
                "No existen Business Partners asociados a esta operación.",
                "success"
            );
        }
    
        // 4. Ajustar estructura al DTO final
        const mapped: OperationBusinessPartnersResponseDto[] = result.map(r => ({
            id: r.id,
            companyName: r.companyName,
        }));
    
        return new ApiResponse<OperationBusinessPartnersResponseDto>((mapped),"Listado de socios de negocio por operación");
    }

    

}

