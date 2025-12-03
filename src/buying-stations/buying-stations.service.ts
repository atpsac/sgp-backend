import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { operations, buyingStations, operationsBuyingStations, ubigeos } from "src/database/database-schema";
import { DrizzleService } from "src/database/drizzle.service";
import { eq, and, not } from "drizzle-orm";
import { ApiResponse } from "src/common/dto/response.dto";
import { BuyingStationsResponseDto } from "./dto/buying-stations-response.dto";

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

    async getNonPrincipalBuyingStations(): Promise<ApiResponse<BuyingStationsResponseDto>> {


        const db = this.drizzleService.db;

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
                // Desde la tabla de ubigeos
            })
            .from(buyingStations)
            .leftJoin(ubigeos, eq(buyingStations.idUbigeos, ubigeos.id))
            .where(
                and(
                    eq(buyingStations.isActive, true),
                    eq(buyingStations.isPrincipal, false)
                )
            );

        if (!stations) {
            return new ApiResponse(
                [],
                'No existen sedes principales.',
                'success'
            );
        }

        const mappedResponse: BuyingStationsResponseDto[] = stations.map(station => ({
            id: station.id,
            name: station.name,
            address: station.address,
            isPrincipal: station.isPrincipal,
            ubigeoCode: station.ubigeoCode || '',
            ubigeoRegion: station.ubigeoRegion || '',
            ubigeoProvince: station.ubigeoProvince || '',
            ubigeoDistrict: station.ubigeoDistrict || '',
        }));

        return new ApiResponse(
            mappedResponse,
            'Sedes no principales obtenidas exitosamente.',
            'success'
        );

    }

    async getPrincipalBuyingStations(): Promise<ApiResponse<BuyingStationsResponseDto>> {


        const db = this.drizzleService.db;
        // 1. Obtener la sede activa principal
        
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
                // Desde la tabla de ubigeos
            })
            .from(buyingStations)
            .leftJoin(ubigeos, eq(buyingStations.idUbigeos, ubigeos.id)) // LEFT JOIN
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
            return new ApiResponse(
                [],
                'No existen sedes principales.',
                'success'
            );
        }

        // 3. Mapear al DTO
        const mappedResponse: BuyingStationsResponseDto = {
            id: station.id,
            name: station.name,
            address: station.address,
            isPrincipal: station.isPrincipal,
            ubigeoCode: station.ubigeoCode || '',
            ubigeoRegion: station.ubigeoRegion || '',
            ubigeoProvince: station.ubigeoProvince || '',
            ubigeoDistrict: station.ubigeoDistrict || '',
        };

        // 4. Retornar la respuesta mapeada
        return new ApiResponse(
            [mappedResponse],
            'Sede principal obtenida exitosamente.',
            'success'
        );

    }
}