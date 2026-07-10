/**
 * A centralized service for web database operations using localStorage.
 * Mimics the SQLiteService interface to allow transparent switching.
 */
class WebDbService {
  private dbInitialized = false;

  public async init(): Promise<void> {
    if (this.dbInitialized) {
      console.log('[WebDbService] Web DB already initialized.');
      return;
    }
    this.dbInitialized = true;
    console.log('[WebDbService] Web DB initialized.');
  }

  public async close(): Promise<void> {
    this.dbInitialized = false;
    console.log('[WebDbService] Web DB closed.');
  }

  private getTableData(tableName: string): any[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(`dsamcq_web_db_${tableName}`);
    return data ? JSON.parse(data) : [];
  }

  private setTableData(tableName: string, data: any[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(`dsamcq_web_db_${tableName}`, JSON.stringify(data));
  }

  public async create(tableName: string, data: any): Promise<any> {
    const tableData = this.getTableData(tableName);
    const newRecord = { ...data };
    if (!newRecord.id) {
      newRecord.id = Math.random().toString(36).substr(2, 9);
    }
    tableData.push(newRecord);
    this.setTableData(tableName, tableData);
    return { insertId: newRecord.id, rowsAffected: 1 };
  }

  public async getById(tableName: string, id: string): Promise<any | null> {
    const tableData = this.getTableData(tableName);
    return tableData.find((item) => item.id === id) || null;
  }

  public async getAll(tableName: string): Promise<any[]> {
    return this.getTableData(tableName);
  }

  public async update(tableName: string, id: string, data: any): Promise<any> {
    const tableData = this.getTableData(tableName);
    const index = tableData.findIndex((item) => item.id === id);
    if (index !== -1) {
      tableData[index] = { ...tableData[index], ...data };
      this.setTableData(tableName, tableData);
      return { rowsAffected: 1 };
    }
    return { rowsAffected: 0 };
  }

  public async delete(tableName: string, id: string): Promise<any> {
    const tableData = this.getTableData(tableName);
    const filtered = tableData.filter((item) => item.id !== id);
    const rowsAffected = tableData.length - filtered.length;
    this.setTableData(tableName, filtered);
    return { rowsAffected };
  }

  public async runQuery(sql: string, params: any[] = []): Promise<any[]> {
    // Basic SQL pattern matching for simple queries used in our sync service
    const trimmedSql = sql.trim().replace(/\s+/g, ' ');

    if (trimmedSql.toUpperCase().startsWith('SELECT * FROM')) {
      // e.g., "SELECT * FROM tableName WHERE is_dirty = 1" or "SELECT * FROM tableName"
      const parts = trimmedSql.split(' ');
      const tableName = parts[3].toLowerCase();
      let records = this.getTableData(tableName);

      if (trimmedSql.toUpperCase().includes('WHERE IS_DIRTY = 1')) {
        records = records.filter((item) => item.is_dirty === 1 || item.is_dirty === '1');
      }

      const resultSet = {
        rows: {
          length: records.length,
          item: (idx: number) => records[idx],
          raw: () => records,
        },
      };
      return [resultSet];
    }

    if (trimmedSql.toUpperCase().startsWith('INSERT OR REPLACE INTO') || trimmedSql.toUpperCase().startsWith('INSERT INTO')) {
      // e.g., "INSERT OR REPLACE INTO tableName (col1, col2) VALUES (?, ?)"
      const parts = trimmedSql.split(' ');
      // INSERT OR REPLACE INTO tableName
      const tableName = parts[parts.length - 3].split('(')[0].trim().toLowerCase();
      // Wait, let's find the table name correctly:
      const openParenIdx = trimmedSql.indexOf('(');
      let tableNameExtracted = '';
      if (trimmedSql.toUpperCase().startsWith('INSERT OR REPLACE INTO')) {
        tableNameExtracted = trimmedSql.substring(22, openParenIdx).trim();
      } else {
        tableNameExtracted = trimmedSql.substring(12, openParenIdx).trim();
      }
      tableNameExtracted = tableNameExtracted.toLowerCase();

      const columnsStr = trimmedSql.substring(openParenIdx + 1, trimmedSql.indexOf(')'));
      const columns = columnsStr.split(',').map((c) => c.trim());

      const record: any = {};
      columns.forEach((col, idx) => {
        record[col] = params[idx];
      });

      const tableData = this.getTableData(tableNameExtracted);
      const existingIdx = tableData.findIndex((item) => item.id === record.id);
      if (existingIdx !== -1) {
        tableData[existingIdx] = { ...tableData[existingIdx], ...record };
      } else {
        tableData.push(record);
      }
      this.setTableData(tableNameExtracted, tableData);

      const resultSet = {
        rowsAffected: 1,
        rows: {
          length: 0,
          item: () => null,
          raw: () => [],
        },
      };
      return [resultSet];
    }

    console.warn('[WebDbService] Unsupported custom SQL fallback executed:', sql);
    return [
      {
        rowsAffected: 0,
        rows: {
          length: 0,
          item: () => null,
          raw: () => [],
        },
      },
    ];
  }
}

export const webDbService = new WebDbService();
