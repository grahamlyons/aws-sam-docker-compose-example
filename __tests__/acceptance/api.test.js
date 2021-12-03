const axios = require('axios');

const { API_BASE_URL, } = process.env;

const client = axios.create({
  baseURL: API_BASE_URL,
});

describe('api', () => {
  describe('root route', function() {
    it('returns a successful response', async () => {
      const response = await client.get('/');
      expect(response.status).toEqual(200);
    });
  });

  describe('add message route', function() {
    it('returns a successful response', async () => {
      const id = "a1b2c3";
      const message = "Hello, World!";
      const response = await client.post('/', { id, message });
      expect(response.status).toEqual(201);
      expect(response.data).toEqual({ id, message });
    });
  });
});

