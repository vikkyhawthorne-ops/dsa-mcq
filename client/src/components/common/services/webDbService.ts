class WebDbService {
  private initialized = false;

  public async init(): Promise<void> {
    if (this.initialized) {
      console.log('[WebDbService] Web database already initialized.');
      return;
    }
    console.log('[WebDbService] Initializing web database (localStorage)...');
    // Ensure table arrays exist in localStorage
    const tables = [
      'categories',
      'learning_sessions',
      'user_question_data',
      'notifications',
      'user_engagement',
      'anomalies',
      'devops_metrics'
    ];
    for (const table of tables) {
      const key = `dsamcq_${table}`;
      if (typeof window !== 'undefined' && window.localStorage) {
        if (!window.localStorage.getItem(key)) {
          window.localStorage.setItem(key, JSON.stringify([]));
        }
      }
    }
    this.initialized = true;
  }

  public async close(): Promise<void> {
    console.log('[WebDbService] Web database closed.');
    this.initialized = false;
  }

  private getTableData(tableName: string): any[] {
    const key = `dsamcq_${tableName}`;
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = window.localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    }
    return [];
  }

  private setTableData(tableName: string, data: any[]): void {
    const key = `dsamcq_${tableName}`;
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, JSON.stringify(data));
    }
  }

  public async create(tableName: string, data: any): Promise<any> {
    await this.init();
    const tableData = this.getTableData(tableName);
    const id = data.id || data.userId;
    const filtered = tableData.filter(item => (item.id || item.userId) !== id);
    filtered.push(data);
    this.setTableData(tableName, filtered);
    return { rowsAffected: 1 };
  }

  public async getById(tableName: string, id: string): Promise<any | null> {
    await this.init();
    const tableData = this.getTableData(tableName);
    const found = tableData.find(item => (item.id || item.userId) === id);
    return found || null;
  }

  public async getAll(tableName: string): Promise<any[]> {
    await this.init();
    return this.getTableData(tableName);
  }

  public async update(tableName: string, id: string, data: any): Promise<any> {
    await this.init();
    const tableData = this.getTableData(tableName);
    const updated = tableData.map(item => {
      if ((item.id || item.userId) === id) {
        return { ...item, ...data };
      }
      return item;
    });
    this.setTableData(tableName, updated);
    return { rowsAffected: 1 };
  }

  public async delete(tableName: string, id: string): Promise<any> {
    await this.init();
    const tableData = this.getTableData(tableName);
    const filtered = tableData.filter(item => (item.id || item.userId) !== id);
    this.setTableData(tableName, filtered);
    return { rowsAffected: 1 };
  }

  /**
   * Mock runQuery to handle syncService's calls.
   */
  public async runQuery(sql: string, params: any[] = []): Promise<any> {
    await this.init();
    console.log('[WebDbService] runQuery:', sql, params);

    // Simple parser for syncService SELECT or INSERT OR REPLACE queries
    const selectMatch = sql.match(/SELECT\s+\*\s+FROM\s+(\w+)(?:\s+WHERE\s+(\w+)\s*=\s*(\d+))?/i);
    if (selectMatch) {
      const tableName = selectMatch[1];
      const whereCol = selectMatch[2];
      const whereVal = selectMatch[3];
      let data = this.getTableData(tableName);
      if (whereCol && whereVal !== undefined) {
        data = data.filter(item => String(item[whereCol]) === String(whereVal));
      }
      return [{
        rows: {
          raw: () => data,
          length: data.length,
          item: (index: number) => data[index],
        }
      }];
    }

    const insertReplaceMatch = sql.match(/INSERT\s+OR\s+REPLACE\s+INTO\s+(\w+)\s*\(([^)]+)\)\s*VALUES\s*\(([^)]+)\)/i);
    if (insertReplaceMatch) {
      const tableName = insertReplaceMatch[1];
      const cols = insertReplaceMatch[2].split(',').map(s => s.trim());
      const record: any = {};
      cols.forEach((col, idx) => {
        record[col] = params[idx];
      });
      await this.create(tableName, record);
      return [{ rowsAffected: 1 }];
    }

    return [{
      rows: {
        raw: () => [],
        length: 0,
        item: () => null,
      }
    }];
  }
}

export const webDbService = new WebDbService();
