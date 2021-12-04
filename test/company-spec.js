const request = require('supertest')
const app = require('./../server');

describe('CRUD /api/company', () => {

    const deleteCompany = {"name":"tstCompany"}
    const updateCompany = {"name":"tstCompany","email":"admin@tstCompany.com","phone":"091456456","website":"tstCompany.com"}
    const newCompany = {"name":"ibm","email":"support@tstCompany.com","phone":"091456456","website":"tstCompany.com"}
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Mzg2NTA5OTh9.Zm33GGyFlaLhJ-a4ywH-lfeqzdJp3oi22y2fsV-xHAA";

    it("GET /api/company should return list of company with status 200", async () => {
       const res = await request(app).get('/api/company').auth(token, { type: 'bearer' })
       expect(res.statusCode).toEqual(200)
     
    })
    it("POST /api/company Create a company", async () => {

       const res = await request(app).post('/api/company').auth(token, { type: 'bearer' }).send(newCompany)
       expect(res.statusCode).toEqual(200)
     
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