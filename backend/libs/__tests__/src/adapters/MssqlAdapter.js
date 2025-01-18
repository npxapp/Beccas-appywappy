// ./backend/libs/tests/src/adapters/MssqlAdapter.js
const sql = require('mssql');
const DatabaseInterface = require('../interfaces/DatabaseInterface');

class MssqlAdapter extends DatabaseInterface {
  constructor(config) {
    super();
    this.pool = null;
    this.config = config;
  }

  async initialize() {
    this.pool = await sql.connect(this.config);
  }

  async find(table, conditions = {}, options = {}) {
    const { limit, orderBy } = options;
    const values = [];
    let query = `SELECT * FROM ${table}`;

    // Build WHERE clause
    const whereConditions = Object.entries(conditions).map(([key, value], index) => {
      values.push(value);
      return `${key} = @param${index}`;
    });

    if (whereConditions.length > 0) {
      query += ` WHERE ${whereConditions.join(' AND ')}`;
    }

    if (orderBy) {
      query += ` ORDER BY ${orderBy}`;
    }

    if (limit) {
      query += ` TOP (${limit})`;
    }

    const result = await this.execute(query, values);
    return result.recordset;
  }

  async create(table, data) {
    const columns = Object.keys(data);
    const values = Object.values(data);
    const parameters = columns.map((_, index) => `@param${index}`);

    const query = `
      INSERT INTO ${table} (${columns.join(', ')})
      OUTPUT INSERTED.*
      VALUES (${parameters.join(', ')})
    `;

    const result = await this.execute(query, values);
    return result.recordset[0];
  }

  async update(table, data, conditions) {
    const values = [];
    const setClause = Object.entries(data).map(([key, value], index) => {
      values.push(value);
      return `${key} = @param${index}`;
    });

    const whereClause = Object.entries(conditions).map(([key, value], index) => {
      values.push(value);
      return `${key} = @param${setClause.length + index}`;
    });

    const query = `
      UPDATE ${table}
      SET ${setClause.join(', ')}
      WHERE ${whereClause.join(' AND ')}
      OUTPUT INSERTED.*
    `;

    const result = await this.execute(query, values);
    return result.recordset;
  }

  async delete(table, conditions) {
    const values = [];
    const whereClause = Object.entries(conditions).map(([key, value], index) => {
      values.push(value);
      return `${key} = @param${index}`;
    });

    const query = `
      DELETE FROM ${table}
      WHERE ${whereClause.join(' AND ')}
      OUTPUT DELETED.*
    `;

    const result = await this.execute(query, values);
    return result.recordset;
  }

  async execute(query, params = []) {
    if (!this.pool) {
      throw new Error('Database not initialized. Call `initialize()` first.');
    }

    const request = this.pool.request();
    params.forEach((value, index) => {
      request.input(`param${index}`, value);
    });

    const result = await request.query(query);
    return result;
  }

  async createTable(tableName, columns) {
    const columnDefinitions = columns.map(col => 
      `${col.name} ${col.type}${col.nullable ? '' : ' NOT NULL'}${col.default ? ` DEFAULT ${col.default}` : ''}`
    );

    const query = `
      CREATE TABLE ${tableName} (
        ${columnDefinitions.join(', ')}
      )
    `;

    await this.execute(query);
  }

  async deleteTable(tableName) {
    return this.execute(`DROP TABLE IF EXISTS ${tableName}`);
  }

  async addColumn(tableName, columnName, columnType) {
    return this.execute(`ALTER TABLE ${tableName} ADD ${columnName} ${columnType}`);
  }

  async dropColumn(tableName, columnName) {
    return this.execute(`ALTER TABLE ${tableName} DROP COLUMN ${columnName}`);
  }

  async shutdown() {
    if (this.pool) {
      await this.pool.close();
    }
  }
}

module.exports = MssqlAdapter;

