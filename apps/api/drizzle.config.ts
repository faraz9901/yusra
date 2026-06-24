import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { configService } from './src/core/config.service';

export default defineConfig({
    out: './src/db/drizzle',
    schema: './src/db/schemas',
    dialect: 'postgresql',
    dbCredentials: {
        url: configService.getValue('DATABASE_URL'),
    },
});
