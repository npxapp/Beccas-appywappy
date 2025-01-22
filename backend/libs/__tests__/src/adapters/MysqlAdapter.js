// ./backend/libs/tests/src/adapters/MysqlAdapter.js
const mysql = require('mysql2/promise');
const DatabaseInterface = require('../interfaces/DatabaseInterface');

class MysqlAdapter extends DatabaseInterface {
  constructor(config) {
    super();
    this.pool = mysql.createPool(config);
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

    const [result] = await this.execute(query, values);
    return { id: result.insertId, ...data };
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

    await this.execute(query, values);
    return { affectedRows: values.length };
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

    const [result] = await this.execute(query, values);
    return { affectedRows: result.affectedRows };
  }

  async execute(query, params = []) {
    const connection = await this.pool.getConnection();
    try {
      const [rows] = await connection.query(query, params);
      return rows;
    } finally {
      connection.release();
    }
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

    return this.execute(query);
  }

  async deleteTable(tableName) {
    return this.execute(`DROP TABLE IF EXISTS ${tableName}`);
  }

  async addColumn(tableName, columnName, columnType) {
    return this.execute(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnType}`);
  }

  async dropColumn(tableName, columnName) {
    return this.execute(`ALTER TABLE ${tableName} DROP COLUMN ${columnName}`);
  }

  async shutdown() {
    await this.pool.end();
  }
}

module.exports = MysqlAdapter;
