const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend character routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('Get /characters displays all characters', async () => {
    const resp = await request(app).get('/api/v1/characters');
    expect(resp.body.length).toEqual(25);
    expect(resp.body[0].name).toEqual('Fry');
  });

  afterAll(() => {
    pool.end();
  });
});
