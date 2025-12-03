import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { operations, buyingStations, operationsBuyingStations, documentTypes, operationsDocumentTypes } from "src/database/database-schema";
import { DrizzleService } from "src/database/drizzle.service";
import { eq, and } from "drizzle-orm";
import { DocumentItemDto, OperationDocumentsResponseDto, OperationsBuyingStationResponseDto } from "./dto/operation-documents-response.dto";
import { ApiResponse } from "src/common/dto/response.dto";

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

    async getOperationsByBuyingStation(stationId: number): Promise<ApiResponse<OperationsBuyingStationResponseDto>> {
        
        const db = this.drizzleService.db;
      
        // 1. Validar que la buying station existe y está activa
        const station = await db.query.buyingStations.findFirst({
          where: and(
            eq(buyingStations.id, stationId),
            eq(buyingStations.isActive, true)
          ),
        });
      
        if (!station) {
          return new ApiResponse<OperationsBuyingStationResponseDto>(
            [],
            `La sede con id ${stationId} no existe o está inactiva`,
            'error',
          );
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
      
        // 3. Respuesta estandarizada
        return new ApiResponse(result,"Listado de operaciones por sede obtenido correctamente");
      }


    async getDocumentsByOperation(operationId: number): Promise<ApiResponse<OperationDocumentsResponseDto>> {
        const db = this.drizzleService.db;
        // 1. Validar que la operación exista y esté activa
        const operation = await db.query.operations.findFirst({
            where: and(
                eq(operations.id, operationId),
                eq(operations.isActive, true),
            ),
        });

        if (!operation) {
            throw new NotFoundException(
                `La operación con id ${operationId} no existe o está inactiva.`,
            );
        }

        // 2. Obtener documentos asociados a la operación
        const records = await db
            .select({
                id: documentTypes.id,
                code: documentTypes.code,
                name: documentTypes.name,
            })
            .from(operationsDocumentTypes)
            .innerJoin(
                documentTypes,
                eq(documentTypes.id, operationsDocumentTypes.idDocumentTypes),
            )
            .where(
                and(
                    eq(operationsDocumentTypes.idOperations, operationId),
                    eq(operationsDocumentTypes.isActive, true),
                    eq(documentTypes.isActive, true),
                ),
            );

        // 3. Mapear a DTO (aunque no existan documentos)
        const documents: DocumentItemDto[] = records.map((d) => ({
            id: d.id,
            code: d.code,
            name: d.name,
        }));

        // 4. Construir DTO final

        const items: OperationDocumentsResponseDto = {
            operationId: operation.id,
            operationName: operation.name,
            documents: documents,
        };

        return new ApiResponse([items], 'Listado de trailers por transportista obtenido correctamente.');

 
    }


}