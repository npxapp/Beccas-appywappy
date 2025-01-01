// ./backend/libs/test/src/DatabaseFactory.js
class DatabaseFactory {
  static createDatabase(type, config) {
    switch (type.toLowerCase()) {
      case 'postgresql':
        return new PostgresqlAdapter(config);
      // Add other database adapters here
      default:
        throw new Error(`Unsupported database type: ${type}`);
    }
  }
}

module.exports = { DatabaseFactory };





