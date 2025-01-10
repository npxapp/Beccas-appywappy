// ./backend/libs/tests/src/adapters/SqliteAdapter.js
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const DatabaseInterface = require('../interfaces/DatabaseInterface');

class SqliteAdapter extends DatabaseInterface {
  constructor(config) {
    super();
    this.db = null;
    this.config = config;
  }

  async initialize() {
    this.db = await open({
      filename: this.config.filename,
      driver: sqlite3.Database,
    });
  }

  async find(table, conditions = {}, options = {}) {
    const { limit, orderBy } = options;
    const values = [];
    let query = `SELECT * FROM ${table}`;

    // Build WHERE clause
    const whereConditions = Object.entries(conditions).map(([key, value], index) => {
      values.push(value);
      return `${key} = ?`;
    });

    if (whereConditions.length > 0) {
      query += ` WHERE ${whereConditions.join(' AND ')}`;
    }

    if (orderBy) {
      query += ` ORDER BY ${orderBy}`;
    }

    if (limit) {
      query += ` LIMIT ${limit}`;
    }

    const result = await this.execute(query, values);
    return result;
  }

  async create(table, data) {
    const columns = Object.keys(data);
    const values = Object.values(data);
    const placeholders = values.map(() => '?');

    const query = `
      INSERT INTO ${table} (${columns.join(', ')})
      VALUES (${placeholders.join(', ')})
    `;

    const result = await this.execute(query, values);
    return result.lastID;
  }

  async update(table, data, conditions) {
    const values = [];
    const setClause = Object.entries(data).map(([key, value]) => {
      values.push(value);
      return `${key} = ?`;
    });

    const whereClause = Object.entries(conditions).map(([key, value]) => {
      values.push(value);
      return `${key} = ?`;
    });

    const query = `
      UPDATE ${table}
      SET ${setClause.join(', ')}
      WHERE ${whereClause.join(' AND ')}
    `;

    const result = await this.execute(query, values);
    return result.changes;
  }

  async delete(table, conditions) {
    const values = [];
    const whereClause = Object.entries(conditions).map(([key, value]) => {
      values.push(value);
      return `${key} = ?`;
    });

    const query = `
      DELETE FROM ${table}
      WHERE ${whereClause.join(' AND ')}
    `;

    const result = await this.execute(query, values);
    return result.changes;
  }

  async execute(query, params = []) {
    if (!this.db) {
      throw new Error('Database not initialized. Call `initialize()` first.');
    }

    return this.db.all(query, params);
  }

  async createTable(tableName, columns) {
    const columnDefinitions = columns.map(col => 
      `${col.name} ${col.type}${col.nullable ? '' : ' NOT NULL'}${col.default ? ` DEFAULT ${col.default}` : ''}`
    );

    const query = `
      CREATE TABLE IF NOT EXISTS ${tableName} (
        ${columnDefinitions.join(', ')}
      )
    `;

    await this.execute(query);
  }

  async deleteTable(tableName) {
    return this.execute(`DROP TABLE IF EXISTS ${tableName}`);
  }

  async addColumn(tableName, columnName, columnType) {
    return this.execute(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnType}`);
  }

  async dropColumn(tableName, columnName) {
    // SQLite does not support dropping columns directly.
    throw new Error('SQLite does not support dropping columns.');
  }

  async shutdown() {
    if (this.db) {
      await this.db.close();
    }
  }
}

module.exports = SqliteAdapter;

