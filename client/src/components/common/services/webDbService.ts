import sqlite3InitModule from '@sqlite.org/sqlite-wasm';

class WebDbService {
  private initialized = false;
  private db: any = null;

  public async init(): Promise<void> {
    if (this.initialized) {
      return;
    }

    console.log('[WebDbService] Initializing SQLite WASM + OPFS browser database...');
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
      throw err;
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
      throw new Error('[WebDbService] Database not initialized');
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
      throw new Error('[WebDbService] Database not initialized');
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
      throw new Error('[WebDbService] Database not initialized');
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
      throw new Error('[WebDbService] Database not initialized');
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
      throw new Error('[WebDbService] Database not initialized');
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
      throw new Error('[WebDbService] Database not initialized');
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
