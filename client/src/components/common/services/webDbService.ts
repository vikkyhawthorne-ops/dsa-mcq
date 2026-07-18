import sqlite3InitModule from '@sqlite.org/sqlite-wasm';

export interface StorageAdapter {
  init(entities: { name: string; fields: string[] }[]): Promise<void>;
  insert(table: string, data: any): Promise<void>;
  update(table: string, id: string, data: any): Promise<void>;
  delete(table: string, id: string): Promise<void>;
  getById(table: string, id: string): Promise<any | null>;
  getAll(table: string): Promise<any[]>;
  runQuery(sql: string, params?: any[]): Promise<any[]>;
  transaction(callback: () => Promise<void>): Promise<void>;
}

// 1. IndexedDB Storage Adapter (Robust browser-native persistent fallback)
class IndexedDbStorageAdapter implements StorageAdapter {
  private db: IDBDatabase | null = null;
  private dbName = 'dsamcq_indexeddb';

  async init(entities: { name: string; fields: string[] }[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };
      request.onupgradeneeded = (event: any) => {
        const db = event.target.result;
        for (const entity of entities) {
          const keyPath = entity.name === 'user_engagement' ? 'userId' : 'id';
          if (!db.objectStoreNames.contains(entity.name)) {
            db.createObjectStore(entity.name, { keyPath });
          }
        }
      };
    });
  }

  async insert(table: string, data: any): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) return reject(new Error('IndexedDB not initialized'));
      const transaction = this.db.transaction(table, 'readwrite');
      const store = transaction.objectStore(table);
      const request = store.put(data);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async update(table: string, id: string, data: any): Promise<void> {
    const existing = await this.getById(table, id) || {};
    const updated = { ...existing, ...data };
    await this.insert(table, updated);
  }

  async delete(table: string, id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) return reject(new Error('IndexedDB not initialized'));
      const transaction = this.db.transaction(table, 'readwrite');
      const store = transaction.objectStore(table);
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getById(table: string, id: string): Promise<any | null> {
    return new Promise((resolve, reject) => {
      if (!this.db) return reject(new Error('IndexedDB not initialized'));
      const transaction = this.db.transaction(table, 'readonly');
      const store = transaction.objectStore(table);
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  async getAll(table: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) return reject(new Error('IndexedDB not initialized'));
      const transaction = this.db.transaction(table, 'readonly');
      const store = transaction.objectStore(table);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async runQuery(sql: string, params: any[] = []): Promise<any[]> {
    const upperSql = sql.toUpperCase();
    const fromMatch = upperSql.match(/FROM\s+([A-Za-z0-9_]+)/);
    if (!fromMatch) return [];
    const table = fromMatch[1].toLowerCase();

    const all = await this.getAll(table);

    if (upperSql.includes('WHERE IS_DIRTY = 1')) {
      return all.filter(item => item.is_dirty === 1 || item.is_dirty === '1');
    }
    return all;
  }

  async transaction(callback: () => Promise<void>): Promise<void> {
    await callback();
  }
}

// 2. SQLite WASM Storage Adapter (OPFS or Memory depending on flag)
class SqliteStorageAdapter implements StorageAdapter {
  private db: any = null;
  private useOpfs: boolean;

  constructor(useOpfs: boolean) {
    this.useOpfs = useOpfs;
  }

  async init(entities: { name: string; fields: string[] }[]): Promise<void> {
    const sqlite3 = await sqlite3InitModule({
      print: console.log,
      printErr: console.error,
    });

    if (this.useOpfs && 'opfs' in sqlite3) {
      this.db = new sqlite3.oo1.OpfsDb('/dsamcq-local.db', 'c');
      console.log('[SqliteStorageAdapter] Opened OPFS Database successfully.');
    } else {
      this.db = new sqlite3.oo1.DB('/dsamcq-local.db', 'c');
      console.log('[SqliteStorageAdapter] Opened Memory Database successfully.');
    }

    // Perform migrations / create tables dynamically from registered entities
    for (const entity of entities) {
      await this.migrate(entity.name, entity.fields);
    }
  }

  async migrate(tableName: string, fields: string[]): Promise<void> {
    if (!this.db) return;
    const isUserEngagement = tableName === 'user_engagement';
    const primaryKey = isUserEngagement ? 'userId' : 'id';

    const columnsDef = fields.map(field => {
      if (field === primaryKey) {
        return `${field} TEXT PRIMARY KEY NOT NULL`;
      }
      return `${field} TEXT`;
    }).join(', ');

    const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnsDef});`;
    this.db.exec(sql);

    // Dynamic column migrations
    for (const column of fields) {
      try {
        this.db.exec(`ALTER TABLE ${tableName} ADD COLUMN ${column} TEXT;`);
      } catch (e) {
        // Column already exists, ignore
      }
    }
  }

  async insert(table: string, data: any): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');
    const columns = Object.keys(data);
    const placeholders = columns.map(() => '?').join(', ');
    const values = Object.values(data);

    const sql = `INSERT OR REPLACE INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`;
    this.db.exec({
      sql,
      bind: values
    });
  }

  async update(table: string, id: string, data: any): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');
    const keys = Object.keys(data);
    const setClause = keys.map(k => `${k} = ?`).join(', ');
    const values = Object.values(data);

    const isUserEngagement = table === 'user_engagement';
    const primaryKey = isUserEngagement ? 'userId' : 'id';

    const sql = `UPDATE ${table} SET ${setClause} WHERE ${primaryKey} = ?`;
    this.db.exec({
      sql,
      bind: [...values, id]
    });
  }

  async delete(table: string, id: string): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');
    const isUserEngagement = table === 'user_engagement';
    const primaryKey = isUserEngagement ? 'userId' : 'id';
    const sql = `DELETE FROM ${table} WHERE ${primaryKey} = ?`;
    this.db.exec({
      sql,
      bind: [id]
    });
  }

  async getById(table: string, id: string): Promise<any | null> {
    if (!this.db) throw new Error('Database not initialized');
    const isUserEngagement = table === 'user_engagement';
    const primaryKey = isUserEngagement ? 'userId' : 'id';
    const sql = `SELECT * FROM ${table} WHERE ${primaryKey} = ?`;
    const rows: any[] = [];
    this.db.exec({
      sql,
      bind: [id],
      rowMode: 'object',
      callback: (row: any) => {
        rows.push(row);
      }
    });
    return rows[0] || null;
  }

  async getAll(table: string): Promise<any[]> {
    if (!this.db) throw new Error('Database not initialized');
    const sql = `SELECT * FROM ${table}`;
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

  async runQuery(sql: string, params: any[] = []): Promise<any[]> {
    if (!this.db) throw new Error('Database not initialized');
    const rows: any[] = [];
    this.db.exec({
      sql,
      bind: params,
      rowMode: 'object',
      callback: (row: any) => {
        rows.push(row);
      }
    });
    return rows;
  }

  async transaction(callback: () => Promise<void>): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');
    try {
      this.db.exec('BEGIN TRANSACTION;');
      await callback();
      this.db.exec('COMMIT;');
    } catch (e) {
      this.db.exec('ROLLBACK;');
      throw e;
    }
  }
}

// 3. Centralized Higher-Level Browser Database Wrapper
export interface BrowserDatabaseConfig {
  storage: 'opfs' | 'indexeddb' | 'memory';
  fallback: 'indexeddb' | 'memory';
}

class BrowserDatabase {
  private adapter: StorageAdapter | null = null;
  private entities: { name: string; fields: string[] }[] = [];
  private initialized = false;

  public registerEntity(name: string, fields: string[]) {
    if (!this.entities.some(e => e.name === name)) {
      this.entities.push({ name, fields });
    }
  }

  public async open(config: BrowserDatabaseConfig): Promise<void> {
    if (this.initialized) return;

    try {
      if (config.storage === 'opfs') {
        const adapter = new SqliteStorageAdapter(true);
        await adapter.init(this.entities);
        this.adapter = adapter;
        console.log('[BrowserDatabase] OPFS SQLite adapter initialized.');
      } else if (config.storage === 'indexeddb') {
        const adapter = new IndexedDbStorageAdapter();
        await adapter.init(this.entities);
        this.adapter = adapter;
        console.log('[BrowserDatabase] IndexedDB adapter initialized.');
      } else {
        const adapter = new SqliteStorageAdapter(false);
        await adapter.init(this.entities);
        this.adapter = adapter;
        console.log('[BrowserDatabase] Memory SQLite adapter initialized.');
      }
    } catch (err) {
      console.warn('[BrowserDatabase] Primary storage opening failed. Falling back to:', config.fallback, err);
      try {
        if (config.fallback === 'indexeddb') {
          const adapter = new IndexedDbStorageAdapter();
          await adapter.init(this.entities);
          this.adapter = adapter;
        } else {
          const adapter = new SqliteStorageAdapter(false);
          await adapter.init(this.entities);
          this.adapter = adapter;
        }
      } catch (fallbackErr) {
        console.error('[BrowserDatabase] Fallback storage failed:', fallbackErr);
        // Pure memory fallback adapter as absolute last resort
        const adapter = new SqliteStorageAdapter(false);
        await adapter.init(this.entities);
        this.adapter = adapter;
      }
    }

    this.initialized = true;
  }

  public async init(): Promise<void> {
    // Default initialization
    await this.open({ storage: 'opfs', fallback: 'indexeddb' });
  }

  public async close(): Promise<void> {
    this.adapter = null;
    this.initialized = false;
    console.log('[BrowserDatabase] Web database closed.');
  }

  public async create(tableName: string, data: any): Promise<any> {
    await this.ensureInitialized();
    const sanitized = this.serializeRecord(data);
    await this.adapter!.insert(tableName, sanitized);
    return { rowsAffected: 1 };
  }

  public async getById(tableName: string, id: string): Promise<any | null> {
    await this.ensureInitialized();
    const result = await this.adapter!.getById(tableName, id);
    return this.deserializeRecord(result);
  }

  public async getAll(tableName: string): Promise<any[]> {
    await this.ensureInitialized();
    const results = await this.adapter!.getAll(tableName);
    return results.map(r => this.deserializeRecord(r));
  }

  public async update(tableName: string, id: string, data: any): Promise<any> {
    await this.ensureInitialized();
    const sanitized = this.serializeRecord(data);
    await this.adapter!.update(tableName, id, sanitized);
    return { rowsAffected: 1 };
  }

  public async delete(tableName: string, id: string): Promise<any> {
    await this.ensureInitialized();
    await this.adapter!.delete(tableName, id);
    return { rowsAffected: 1 };
  }

  public async runQuery(sql: string, params: any[] = []): Promise<any> {
    await this.ensureInitialized();
    const rows = await this.adapter!.runQuery(sql, params);
    const deserializedRows = rows.map(r => this.deserializeRecord(r));

    return [{
      rows: {
        raw: () => deserializedRows,
        length: deserializedRows.length,
        item: (index: number) => deserializedRows[index],
      }
    }];
  }

  public async transaction(callback: () => Promise<void>): Promise<void> {
    await this.ensureInitialized();
    await this.adapter!.transaction(callback);
  }

  private async ensureInitialized() {
    if (!this.initialized) {
      await this.init();
    }
  }

  private serializeRecord(data: any): any {
    const sanitized = { ...data };
    for (const key in sanitized) {
      if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
        sanitized[key] = JSON.stringify(sanitized[key]);
      }
    }
    return sanitized;
  }

  private deserializeRecord(record: any): any {
    if (!record) return null;
    const deserialized = { ...record };
    for (const key in deserialized) {
      const val = deserialized[key];
      if (typeof val === 'string' && (val.startsWith('{') || val.startsWith('['))) {
        try {
          deserialized[key] = JSON.parse(val);
        } catch (e) {
          // Keep as string
        }
      }
    }
    return deserialized;
  }
}

export const webDbService = new BrowserDatabase();
