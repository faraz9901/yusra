import { drizzle } from 'drizzle-orm/node-postgres';
import { configService } from '../core/config.service';

const db = drizzle(configService.getValue('DATABASE_URL'));

export { db };

