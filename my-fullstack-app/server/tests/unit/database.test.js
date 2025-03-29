describe('Database connection', () => {
    it('should load .env when NODE_ENV is not test', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
  
      jest.resetModules();
      const pool = require('../../src/db/database');
  
      expect(pool.options.database).toBe('postgres');
  
      process.env.NODE_ENV = originalEnv;
    });
  });
  