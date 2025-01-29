// ./backend/libs/tests/src/adapters/OracleAdapter.js
const oracledb = require('oracledb');
const DatabaseInterface = require('../interfaces/DatabaseInterface');

class OracleAdapter extends DatabaseInterface {
  constructor(config) {
    super();
    this.pool = null;
    this.config = config;
  }

  async initialize() {
    this.pool = await oracledb.createPool(this.config);
  }

  async find(table, conditions = {}, options = {}) {
    const { limit, orderBy } = options;
    const values = [];
    let query = `SELECT * FROM ${table}`;

    // Build WHERE clause
    const whereConditions = Object.entries(conditions).map(([key, value], index) => {
      values.push(value);
      return `${key} = :param${index}`;
    });

    if (whereConditions.length > 0) {
      query += ` WHERE ${whereConditions.join(' AND ')}`;
    }

    if (orderBy) {
      query += ` ORDER BY ${orderBy}`;
    }

    if (limit) {
      query = `
        SELECT * FROM (${query})
        WHERE ROWNUM <= ${limit}
      `;
    }

    const result = await this.execute(query, values);
    return result.rows;
  }

  async create(table, data) {
    const columns = Object.keys(data);
    const values = Object.values(data);
    const placeholders = columns.map((_, index) => `:param${index}`);

    const query = `
      INSERT INTO ${table} (${columns.join(', ')})
      VALUES (${placeholders.join(', ')})
      RETURNING * INTO :output
    `;

    const result = await this.execute(query, values, { autoCommit: true });
    return result.outBinds.output;
  }

  async update(table, data, conditions) {
    const values = [];
    const setClause = Object.entries(data).map(([key, value], index) => {
      values.push(value);
      return `${key} = :param${index}`;
    });

    const whereClause = Object.entries(conditions).map(([key, value], index) => {
      values.push(value);
      return `${key} = :param${setClause.length + index}`;
    });

    const query = `
      UPDATE ${table}
      SET ${setClause.join(', ')}
      WHERE ${whereClause.join(' AND ')}
    `;

    await this.execute(query, values, { autoCommit: true });
  }

  async delete(table, conditions) {
    const values = [];
    const whereClause = Object.entries(conditions).map(([key, value], index) => {
      values.push(value);
      return `${key} = :param${index}`;
    });

    const query = `
      DELETE FROM ${table}
      WHERE ${whereClause.join(' AND ')}
    `;

    await this.execute(query, values, { autoCommit: true });
  }

  async execute(query, params = [], options = {}) {
    const connection = await this.pool.getConnection();
    try {
      const result = await connection.execute(query, params, options);
      return result;
    } finally {
      await connection.close();
    }
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
    await this.execute(`DROP TABLE ${tableName} PURGE`);
  }

  async addColumn(tableName, columnName, columnType) {
    await this.execute(`ALTER TABLE ${tableName} ADD (${columnName} ${columnType})`);
  }

  async dropColumn(tableName, columnName) {
    await this.execute(`ALTER TABLE ${tableName} DROP COLUMN ${columnName}`);
  }

  async shutdown() {
    if (this.pool) {
      await this.pool.close();
    }
  }
}

module.exports = OracleAdapter;

