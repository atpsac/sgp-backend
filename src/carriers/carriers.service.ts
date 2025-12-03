import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { and, eq, sql } from 'drizzle-orm';
import { businessPartners, carriers, drivers, identityDocumentTypes, driversCarriers, trucks, trailers } from 'drizzle/schema';
import { DrizzleService } from 'src/database/drizzle.service';
import { CarrierResponseDto } from './dto/carriers-response.dto';
import { DriverResponseDto } from '../drivers/dto/driver-response.dto';
import { alias } from 'drizzle-orm/pg-core';
import { ApiResponse } from 'src/common/dto/response.dto';
import { TruckResponseDto } from 'src/trucks/dto/trucks-response.dto';
import { TrailerResponseDto } from 'src/trailers/dto/trailers-response.dto';


@Injectable()
export class CarriersService {

    constructor(
        private readonly drizzleService: DrizzleService,
    ) { }

    async getCarriers(): Promise<ApiResponse<CarrierResponseDto>> {
        const db = this.drizzleService.db;
        const rows = await db
            .select({
                id: businessPartners.id,
                companyName: businessPartners.companyName,
                documentNumber: businessPartners.documentNumber,
                documentTypeName: identityDocumentTypes.name,
                documentTypeCode: identityDocumentTypes.code,
                registrationNumber: carriers.registrationNumber,
            })
            .from(carriers)
            .innerJoin(
                businessPartners,
                eq(carriers.idBusinessPartners, businessPartners.id),
            )
            .innerJoin(
                identityDocumentTypes,
                eq(businessPartners.idIdentityDocumentTypes, identityDocumentTypes.id),
            )
            .where(
                and(
                    eq(carriers.isActive, true),
                    eq(businessPartners.isActive, true),
                    eq(identityDocumentTypes.isActive, true),
                ),
            );

        if (!rows.length) {
            throw new NotFoundException('No se encontraron transportistas activos.');
        }

        return new ApiResponse(rows, 'Listado de transportistas obtenido correctamente');
    }

    async getDriversByCarrier(carrierId: number): Promise<ApiResponse<DriverResponseDto>> {
        const db = this.drizzleService.db;

        if (!carrierId || carrierId <= 0) {
            throw new BadRequestException('El ID de la empresa de transportes es inválido.');
        }

        // Verificar que el carrier existe y está activo
        const carrierExists = await db
            .select({ id: carriers.idBusinessPartners })
            .from(carriers)
            .where(
                and(
                    eq(carriers.idBusinessPartners, carrierId),
                    eq(carriers.isActive, true)
                )
            );

        if (!carrierExists.length) {
            throw new NotFoundException('La empresa de transportes no existe o no está activa.');
        }

        // Obtener conductores asociados al carrier

        const carrierBP = alias(businessPartners, 'carrierBP');

        const rows = await db
            .select({
                id: businessPartners.id,
                fullName: sql`${businessPartners.name} || ' ' || ${businessPartners.fLastname} || ' ' || ${businessPartners.mLastname}`,
                documentNumber: businessPartners.documentNumber,
                documentTypeName: identityDocumentTypes.name,
                documentTypeCode: identityDocumentTypes.code,
                license: drivers.license,
            })
            .from(driversCarriers)
            .innerJoin(
                drivers,
                eq(drivers.idBusinessPartners, driversCarriers.idBusinessPartnersDrivers)
            )
            .innerJoin(
                businessPartners,
                eq(businessPartners.id, drivers.idBusinessPartners)
            )
            .innerJoin(
                identityDocumentTypes,
                eq(identityDocumentTypes.id, businessPartners.idIdentityDocumentTypes)
            )
            .innerJoin(
                carriers,
                eq(carriers.idBusinessPartners, driversCarriers.idBusinessPartnersCarriers)
            )
            .innerJoin(
                carrierBP,
                eq(carrierBP.id, carriers.idBusinessPartners)
            )
            .where(
                and(
                    eq(driversCarriers.idBusinessPartnersCarriers, carrierId),
                    eq(driversCarriers.isActive, true),
                    eq(drivers.isActive, true),
                    eq(businessPartners.isActive, true),
                    eq(identityDocumentTypes.isActive, true),
                    eq(carrierBP.isActive, true)
                )
            );

        if (!rows.length) {
            throw new NotFoundException('No se encontraron conductores activos para esta empresa.');
        }


        const items = rows.map(r => {
            const dto = new DriverResponseDto();
            dto.id = r.id;
            dto.fullName = String(r.fullName).trim(); // <-- convertimos a string
            dto.documentNumber = r.documentNumber;
            dto.documentTypeCode = r.documentTypeCode;
            dto.documentTypeName = r.documentTypeName;
            dto.license = r.license;
            return dto;
        });

        return new ApiResponse(items, 'Listado de conductores por transportista obtenido correctamente');
    }

    async getTrucksByCarrier(carrierId: number): Promise<ApiResponse<TruckResponseDto>> {
        const db = this.drizzleService.db;
        const carrier = await db
            .select()
            .from(carriers)
            .where(and(
                eq(carriers.idBusinessPartners, carrierId),
                eq(carriers.isActive, true)))
            .limit(1);

        if (carrier.length === 0) {
            throw new NotFoundException(`Tranportista con id ${carrierId} no encontrado`);
        }

        const carrierTrucks = await db
            .select({
                id: trucks.id,
                licensePlate: trucks.licensePlate,
                payloadCapacity: trucks.payloadCapacity,
                configuration: trucks.configuration,
            })
            .from(trucks)
            .where(and(
                eq(trucks.idBusinessPartnersCarriers, carrierId),
                eq(trucks.isActive, true)
            ));

        if (!carrierTrucks.length) {
            throw new NotFoundException('El transportista no tiene camiones activos registrados.');
        }

        const items = carrierTrucks.map(truck => ({
            id: truck.id,
            licensePlate: truck.licensePlate,
            payloadCapacity: Number(truck.payloadCapacity),
            configuration: truck.configuration,
        }));

        return new ApiResponse(items, 'Listado de camiones por transportista obtenido correctamente');
    }

    async getTrailersByCarrier(carrierId: number): Promise<ApiResponse<TrailerResponseDto>> {
        if (!carrierId || carrierId <= 0) {
            throw new BadRequestException('El ID de transportista es inválido.');
        }

        // 1. Validar que el carrier exista
        const db = this.drizzleService.db;
        const carrier = await db
            .select()
            .from(carriers)
            .where(and(
                eq(carriers.idBusinessPartners, carrierId),
                eq(carriers.isActive, true)))
            .limit(1);

        if (carrier.length === 0) {
            throw new NotFoundException(`Tranportista con id ${carrierId} no encontrado`);
        }

        // 2. Obtener los trailers activos del carrier
        const rows = await db
            .select({
                id: trailers.id,
                licensePlate: trailers.licensePlate,
                payloadCapacity: trailers.payloadCapacity,
                axleCount: trailers.axleCount,
            })
            .from(trailers)
            .where(
                and(
                    eq(trailers.idBusinessPartnersCarriers, carrierId),
                    eq(trailers.isActive, true)
                )
            );

        if (!rows.length) {
            throw new NotFoundException('El transportista no tiene trailers activos registrados.');
        }

        // 3. Mapear a DTO
        const mappedResponse: TrailerResponseDto[] = rows.map(r => ({
            id: r.id,
            licensePlate: r.licensePlate,
            payloadCapacity: Number(r.payloadCapacity),
            axleCount: r.axleCount,
        }));

        return new ApiResponse(mappedResponse, 'Listado de trailers por transportista obtenido correctamente.');
    }



}
