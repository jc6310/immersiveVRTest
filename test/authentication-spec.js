const request = require('supertest')
const app = require('./../server');

describe('POST authentication', () => {
   const adminRole = {"role":"admin "}

   it("POST /authentication should return auth token", async () => {
      const res = await request(app).post('/api/employee').send(adminRole)
      expect(res.body.accessToken).not.toBeNull()    
   })
});