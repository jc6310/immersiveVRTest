const request = require('supertest')
const app = require('./../server');

describe('CRUD /api/company', () => {

    const deleteCompany = {"name":"tstNameCompany"}
    const updateCompany = {"name":"tstNameCompany","email":"admin@tstCompany.com","phone":"091456456","website":"tstCompany.com"}
    const newCompany = {"name":"tstNameCompany","email":"support@tstCompany.com","phone":"091456456","website":"tstCompany.com"}
    let token = process.env.TEST_VAR;

    it("GET /api/company should return list of company with status 200", async () => {
       const res = await request(app).get('/api/company').auth(token, { type: 'bearer' })
       expect(res.statusCode).toEqual(200)
     
    })
    it("POST /api/company Create a company", async () => {

       const res = await request(app).post('/api/company').auth(token, { type: 'bearer' }).send(newCompany)
       expect(res.statusCode).toEqual(201)
     
    })
    it("POST /api/company update a company", async () => {

       const res = await request(app).put('/api/company').auth(token, { type: 'bearer' }).send(updateCompany)
       expect(res.statusCode).toEqual(200)
     
    })
    it("DELETE /api/company DELETE company", async () => {

       const res = await request(app).delete('/api/company').auth(token, { type: 'bearer' }).send(deleteCompany)
       expect(res.statusCode).toEqual(200)    
    })
});