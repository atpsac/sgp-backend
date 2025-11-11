import { defineConfig } from 'drizzle-kit';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/database/database-schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: `postgres://${configService.get('POSTGRES_USER')}:${configService.get('POSTGRES_PASSWORD')}@${configService.get('POSTGRES_HOST')}:${configService.get('POSTGRES_PORT')}/${configService.get('POSTGRES_DB')}`,
  },
  migrations: {
    schema: 'public', // used in PostgreSQL only, `drizzle` by default
  },
});