// ./backend/libs/test/src/DatabaseFactory.js
class DatabaseFactory {
  static createDatabase(type, config) {
    switch (type.toLowerCase()) {
      case 'postgresql':
        return new PostgresqlAdapter(config);
      case 'mysql':
        return new MysqlAdapter(config);
      case 'sqlite':
        return new SqliteAdapter(config);
      case 'mssql':
        return new MssqlAdapter(config);
      case 'oracle':
        return new OracleAdapter(config);
      default:
        throw new Error(`Unsupported database type: ${type}`);
    }
  }
}

module.exports = DatabaseFactory;