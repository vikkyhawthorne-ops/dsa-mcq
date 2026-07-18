import { webDbService } from './webDbService';

// Re-export webDbService as sqliteService on Web
export const sqliteService = webDbService;
