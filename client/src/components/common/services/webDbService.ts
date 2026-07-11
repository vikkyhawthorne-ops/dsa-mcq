import sqlite3InitModule from '@sqlite.org/sqlite-wasm';

const isNode = typeof window === 'undefined';

class WebDbService {
  private initialized = false;
  private db: any = null;

  // Fallback in-memory storage for non-browser/Node environment
  private mockStore: { [key: string]: any[] } = {};

  public async init(): Promise<void> {
    if (this.initialized) {
      return;
    }

    if (isNode) {
      console.log('[WebDbService] Running in Node.js/Jest. Initializing mock memory DB...');
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
      return;
    }

    console.log('[WebDbService] Running in Browser. Initializing SQLite WASM + OPFS...');
    try {
      const sqlite3 = await sqlite3InitModule({
        print: console.log,
        printErr: console.error,
      });

      if ('opfs' in sqlite3) {
        this.db = new sqlite3.oo1.OpfsDb('/dsamcq-local.db', 'c');
        console.log('[WebDbService] SQLite WASM OPFS database opened successfully:', this.db.filename);
      } else {
        this.db = new sqlite3.oo1.DB('/dsamcq-local.db', 'c');
        console.log('[WebDbService] SQLite WASM Memory database opened successfully:', this.db.filename);
      }

      await this.createTables();
      this.initialized = true;
    } catch (err) {
      console.error('[WebDbService] Failed to load/initialize SQLite WASM:', err);
      // Fallback to in-memory mock store on Web if WASM load fails
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
  }

  private async createTables(): Promise<void> {
    if (!this.db) return;
    const queries = [
      `CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT,
        masteryScore REAL,
        createdAt INTEGER,
        updatedAt INTEGER,
        is_dirty INTEGER DEFAULT 0
      );`,
      `CREATE TABLE IF NOT EXISTS learning_sessions (
        id TEXT PRIMARY KEY NOT NULL,
        userId TEXT,
        allQuestionIds TEXT,
        questionIds TEXT,
        subsetHistory TEXT,
        currentQuestionIndex INTEGER,
        answers TEXT,
        summary TEXT,
        startTime INTEGER,
        endTime INTEGER,
        createdAt INTEGER,
        updatedAt INTEGER,
        is_dirty INTEGER DEFAULT 0
      );`,
      `CREATE TABLE IF NOT EXISTS user_question_data (
        id TEXT PRIMARY KEY NOT NULL,
        questionId TEXT NOT NULL,
        userId TEXT NOT NULL,
        correctAttempts INTEGER,
        totalAttempts INTEGER,
        recallStrength REAL,
        lastAttemptTimestamp INTEGER,
        techniqueTransferScores TEXT,
        sm2 TEXT,
        createdAt INTEGER,
        updatedAt INTEGER,
        is_dirty INTEGER DEFAULT 0
      );`,
      `CREATE TABLE IF NOT EXISTS notifications (
        id TEXT PRIMARY KEY NOT NULL,
        userId TEXT,
        message TEXT,
        type TEXT,
        isRead INTEGER,
        createdAt INTEGER,
        updatedAt INTEGER,
        sendAt INTEGER,
        is_dirty INTEGER DEFAULT 0
      );`,
      `CREATE TABLE IF NOT EXISTS user_engagement (
        userId TEXT PRIMARY KEY NOT NULL,
        session_attendance REAL,
        streak_length INTEGER,
        response_latency REAL,
        xp_progress REAL,
        leaderboard_rank INTEGER,
        last_session_timestamp INTEGER,
        createdAt INTEGER,
        updatedAt INTEGER,
        is_dirty INTEGER DEFAULT 0
      );`,
      `CREATE TABLE IF NOT EXISTS anomalies (
        id TEXT PRIMARY KEY NOT NULL,
        metricId TEXT,
        type TEXT NOT NULL,
        severity TEXT NOT NULL,
        timestamp INTEGER NOT NULL,
        updatedAt INTEGER,
        deviation REAL,
        evidence TEXT,
        is_dirty INTEGER DEFAULT 0
      );`,
      `CREATE TABLE IF NOT EXISTS devops_metrics (
        id TEXT PRIMARY KEY NOT NULL,
        type TEXT NOT NULL,
        payload TEXT NOT NULL,
        createdAt INTEGER,
        updatedAt INTEGER,
        is_dirty INTEGER DEFAULT 0
      );`
    ];
    for (const sql of queries) {
      this.db.exec(sql);
    }
  }

  public async close(): Promise<void> {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
    this.initialized = false;
    console.log('[WebDbService] Web database closed.');
  }

  public async create(tableName: string, data: any): Promise<any> {
    await this.init();
    if (!this.db) {
      const tableData = this.mockStore[tableName] || [];
      const id = data.id || data.userId;
      const filtered = tableData.filter(item => (item.id || item.userId) !== id);
      filtered.push(data);
      this.mockStore[tableName] = filtered;
      return { rowsAffected: 1 };
    }

    const columns = Object.keys(data);
    const placeholders = columns.map(() => '?').join(', ');
    const values = Object.values(data).map(val =>
      (typeof val === 'object' && val !== null) ? JSON.stringify(val) : val
    );

    const sql = `INSERT OR REPLACE INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders})`;
    this.db.exec({
      sql,
      bind: values
    });
    return { rowsAffected: 1 };
  }

  public async getById(tableName: string, id: string): Promise<any | null> {
    await this.init();
    if (!this.db) {
      const tableData = this.mockStore[tableName] || [];
      const found = tableData.find(item => (item.id || item.userId) === id);
      return found || null;
    }

    const sql = `SELECT * FROM ${tableName} WHERE id = ? OR userId = ?`;
    const rows: any[] = [];
    this.db.exec({
      sql,
      bind: [id, id],
      rowMode: 'object',
      callback: (row: any) => {
        rows.push(row);
      }
    });
    return rows[0] || null;
  }

  public async getAll(tableName: string): Promise<any[]> {
    await this.init();
    if (!this.db) {
      return this.mockStore[tableName] || [];
    }

    const sql = `SELECT * FROM ${tableName}`;
    const rows: any[] = [];
    this.db.exec({
      sql,
      rowMode: 'object',
      callback: (row: any) => {
        rows.push(row);
      }
    });
    return rows;
  }

  public async update(tableName: string, id: string, data: any): Promise<any> {
    await this.init();
    if (!this.db) {
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

    const keys = Object.keys(data);
    const setClause = keys.map(k => `${k} = ?`).join(', ');
    const values = Object.values(data).map(val =>
      (typeof val === 'object' && val !== null) ? JSON.stringify(val) : val
    );

    const sql = `UPDATE ${tableName} SET ${setClause} WHERE id = ? OR userId = ?`;
    this.db.exec({
      sql,
      bind: [...values, id, id]
    });
    return { rowsAffected: 1 };
  }

  public async delete(tableName: string, id: string): Promise<any> {
    await this.init();
    if (!this.db) {
      const tableData = this.mockStore[tableName] || [];
      const filtered = tableData.filter(item => (item.id || item.userId) !== id);
      this.mockStore[tableName] = filtered;
      return { rowsAffected: 1 };
    }

    const sql = `DELETE FROM ${tableName} WHERE id = ? OR userId = ?`;
    this.db.exec({
      sql,
      bind: [id, id]
    });
    return { rowsAffected: 1 };
  }

  public async runQuery(sql: string, params: any[] = []): Promise<any> {
    await this.init();
    if (!this.db) {
      console.log('[WebDbService] Mock runQuery:', sql, params);
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

    const rows: any[] = [];
    this.db.exec({
      sql,
      bind: params.map(val => (typeof val === 'object' && val !== null) ? JSON.stringify(val) : val),
      rowMode: 'object',
      callback: (row: any) => {
        rows.push(row);
      }
    });

    return [{
      rows: {
        raw: () => rows,
        length: rows.length,
        item: (index: number) => rows[index],
      }
    }];
  }
}

export const webDbService = new WebDbService();
