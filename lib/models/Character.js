const pool = require('../utils/pool');

module.exports = class Character {
  id;
  name;
  url;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.url = row.url;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM characters');
    return rows.map((row) => new Character(row));
  }
};
