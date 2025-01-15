// ./backend/libs/tests/src/adapters/PostgresqlAdapter.js
const { Pool } = require('pg');

class PostgresqlAdapter extends DatabaseInterface {
  constructor(config) {
    super();
    this.pool = new Pool(config);
  }

  async find(table, conditions = {}, options = {}) {
    const { limit, orderBy } = options;
    const values = [];
    let query = `SELECT * FROM ${table}`;

    // Build WHERE clause
    const whereConditions = Object.entries(conditions).map(([key, value], index) => {
      values.push(value);
      return `${key} = $${index + 1}`;
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
    const placeholders = values.map((_, index) => `$${index + 1}`);

    const query = `
      INSERT INTO ${table} (${columns.join(', ')})
      VALUES (${placeholders.join(', ')})
      RETURNING *
    `;

    const result = await this.execute(query, values);
    return result[0];
  }

  async update(table, data, conditions) {
    const values = [];
    const setClause = Object.entries(data).map(([key, value], index) => {
      values.push(value);
      return `${key} = $${index + 1}`;
    });

    const whereClause = Object.entries(conditions).map(([key, value], index) => {
      values.push(value);
      return `${key} = $${index + setClause.length + 1}`;
    });

    const query = `
      UPDATE ${table}
      SET ${setClause.join(', ')}
      WHERE ${whereClause.join(' AND ')}
      RETURNING *
    `;

    return this.execute(query, values);
  }

  async delete(table, conditions) {
    const values = [];
    const whereClause = Object.entries(conditions).map(([key, value], index) => {
      values.push(value);
      return `${key} = $${index + 1}`;
    });

    const query = `
      DELETE FROM ${table}
      WHERE ${whereClause.join(' AND ')}
      RETURNING *
    `;

    return this.execute(query, values);
  }

  async execute(query, params = []) {
    const client = await this.pool.connect();
    try {
      const result = await client.query(query, params);
      return result.rows;
    } finally {
      client.release();
    }
  }

  async createTable(tableName, columns) {
    const columnDefinitions = columns.map(col => 
      `${col.name} ${col.type}${col.nullable ? '' : ' NOT NULL'}${col.default ? ` DEFAULT ${col.default}` : ''}`
    );

    const query = `
      CREATE TABLE IF NOT EXISTS ${tableName} (
        ${columnDefinitions.join(',\n        ')}
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

