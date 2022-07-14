const pool = require('../utils/pool');

module.exports = class Character {
  id;
  name;
  image;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.image = row.image;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT id, name FROM characters');
    return rows.map((row) => new Character(row));
  }
};
