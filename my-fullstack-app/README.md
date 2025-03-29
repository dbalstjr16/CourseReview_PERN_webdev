### Jest + Supertest for Server Side Files
```sh
$ npm test -- --coverage

> test
> jest --coverage

 PASS  tests/unit/database.test.js                                                                                                                                                                                                      
 PASS  tests/integration/search.test.js
 PASS  tests/integration/comments.test.js
 PASS  tests/integration/users.test.js
-----------------|---------|----------|---------|---------|-------------------
File             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------|---------|----------|---------|---------|-------------------
All files        |    93.8 |    85.71 |     100 |   94.54 |                  
 src             |     100 |      100 |     100 |     100 |                  
  app.js         |     100 |      100 |     100 |     100 |                  
 src/db          |     100 |      100 |     100 |     100 |                  
  database.js    |     100 |      100 |     100 |     100 |                  
 src/middlewares |     100 |      100 |     100 |     100 |                  
  authorize.js   |     100 |      100 |     100 |     100 |                  
 src/routes      |   91.46 |       80 |     100 |    92.5 |                  
  comments.js    |    90.9 |      100 |     100 |    90.9 | 31,45            
  search.js      |    92.3 |      100 |     100 |    92.3 | 25               
  users.js       |   91.48 |       80 |     100 |   93.33 | 41,64,93         
-----------------|---------|----------|---------|---------|-------------------

Test Suites: 4 passed, 4 total
Tests:       16 passed, 16 total
Snapshots:   0 total
Time:        1.613 s, estimated 2 s
Ran all test suites.