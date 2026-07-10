import { sqliteService } from './sqliteService';
import { webDbService } from './webDbService';

// Determine if the environment is configured to use web database.
const isWebDb = process.env.DB_TYPE === 'web' || process.env.REACT_APP_DB_TYPE === 'web' || typeof window !== 'undefined';

export const dbService = isWebDb ? webDbService : sqliteService;
