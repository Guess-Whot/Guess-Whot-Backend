const { Router } = require('express');
const Character = require('../models/Character');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const characters = await Character.getAll();
    res.json(characters);
  } catch (e) {
    next(e);
  }
});
