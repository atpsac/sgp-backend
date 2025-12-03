import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { and, eq, sql } from 'drizzle-orm';
import { businessPartners, carriers, documentTypes, drivers, identityDocumentTypes } from 'drizzle/schema';
import { DrizzleService } from 'src/database/drizzle.service';

@Injectable()
export class DriversService {

    constructor(
        private readonly drizzleService: DrizzleService,
    ) {}


}
