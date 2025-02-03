// ./backend/libs/tests/src/interfaces/DatabaseInterface.js
class DatabaseInterface {
  async find(table, conditions, options) { throw new Error('Not implemented'); }
  async create(table, data) { throw new Error('Not implemented'); }
  async update(table, data, conditions) { throw new Error('Not implemented'); }
  async delete(table, conditions) { throw new Error('Not implemented'); }
  async execute(query, params) { throw new Error('Not implemented'); }
  async createTable(tableName, columns) { throw new Error('Not implemented'); }
  async deleteTable(tableName) { throw new Error('Not implemented'); }
  async addColumn(tableName, columnName, columnType) { throw new Error('Not implemented'); }
  async dropColumn(tableName, columnName) { throw new Error('Not implemented'); }
  async shutdown() { throw new Error('Not implemented'); }
}

