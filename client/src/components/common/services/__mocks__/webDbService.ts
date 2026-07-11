class MockWebDbService {
  private initialized = false;
  private mockStore: { [key: string]: any[] } = {};

  public async init(): Promise<void> {
    if (this.initialized) {
      return;
    }
    console.log('[MockWebDbService] Initializing mock memory DB for tests...');
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
      if (!this.mockStore[table]) {
        this.mockStore[table] = [];
      }
    }
    this.initialized = true;
  }

  public async close(): Promise<void> {
    this.initialized = false;
    console.log('[MockWebDbService] Mock database closed.');
  }

  public async create(tableName: string, data: any): Promise<any> {
    await this.init();
    const tableData = this.mockStore[tableName] || [];
    const id = data.id || data.userId;
    const filtered = tableData.filter(item => (item.id || item.userId) !== id);
    filtered.push(data);
    this.mockStore[tableName] = filtered;
    return { rowsAffected: 1 };
  }

  public async getById(tableName: string, id: string): Promise<any | null> {
    await this.init();
    const tableData = this.mockStore[tableName] || [];
    const found = tableData.find(item => (item.id || item.userId) === id);
    return found || null;
  }

  public async getAll(tableName: string): Promise<any[]> {
    await this.init();
    return this.mockStore[tableName] || [];
  }

  public async update(tableName: string, id: string, data: any): Promise<any> {
    await this.init();
    const tableData = this.mockStore[tableName] || [];
    const updated = tableData.map(item => {
      if ((item.id || item.userId) === id) {
        return { ...item, ...data };
      }
      return item;
    });
    this.mockStore[tableName] = updated;
    return { rowsAffected: 1 };
  }

  public async delete(tableName: string, id: string): Promise<any> {
    await this.init();
    const tableData = this.mockStore[tableName] || [];
    const filtered = tableData.filter(item => (item.id || item.userId) !== id);
    this.mockStore[tableName] = filtered;
    return { rowsAffected: 1 };
  }

  public async runQuery(sql: string, params: any[] = []): Promise<any> {
    await this.init();
    console.log('[MockWebDbService] runQuery:', sql, params);
    const selectMatch = sql.match(/SELECT\s+\*\s+FROM\s+(\w+)(?:\s+WHERE\s+(\w+)\s*=\s*(\d+))?/i);
    if (selectMatch) {
      const tableName = selectMatch[1];
      const whereCol = selectMatch[2];
      const whereVal = selectMatch[3];
      let data = this.mockStore[tableName] || [];
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

export const webDbService = new MockWebDbService();
