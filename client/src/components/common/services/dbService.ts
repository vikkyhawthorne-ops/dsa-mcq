import { sqliteService } from './sqliteService';
import { webDbService } from './webDbService';

// Determine the active DB service depending on DB_TYPE env or environment availability
const isWeb = typeof window !== 'undefined' || process.env.DB_TYPE === 'WEB';

export const dbService = isWeb ? webDbService : sqliteService;
