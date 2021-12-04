const request = require('supertest')
const app = require('./../server');

describe('CRUD /api/employee', () => {

   let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Mzg2MzkzNDJ9.5Cd8tchqucze6Cq0uCRga3oILE9mxtpje_zadNt9Sww";
    const deleteEmployee = {"fname":"john ", "surname":"walash"}
    const updateEmployee= {"fname":"john ", "surname":"walash", "company":"ibm", "email":"admin@ibm.com", "phone":"091456456"}
    const newEmployee = {"fname":"john ", "surname":"walash", "company":"ibm", "email":"support@ibm.com", "phone":"091456456"}
    const newCompany = {"name":"ibm","email":"support@tstCompany.com","phone":"091456456","website":"tstCompany.com"}

    it("GET /api/employee should return list of employee with status 200", async () => {
       const res = await request(app).get('/api/employee').auth(token, { type: 'bearer' })
       expect(res.statusCode).toEqual(200)
     
    })
    it("POST /api/employee Create a employee", async () => {
       const ress = await request(app).post('/api/company').auth(token, { type: 'bearer' }).send(newCompany)
       
       const res = await request(app).post('/api/employee').auth(token, { type: 'bearer' }).send(newEmployee)
       expect(res.statusCode).toEqual(201)
     
    })
    it("POST /api/employee update a employee", async () => {

       const res = await request(app).put('/api/employee').auth(token, { type: 'bearer' }).send(updateEmployee)
       expect(res.statusCode).toEqual(200)
     
    })
    it("DELETE /api/employee DELETE employee", async () => {

       const res = await request(app).delete('/api/employee').auth(token, { type: 'bearer' }).send(deleteEmployee)
       expect(res.statusCode).toEqual(400)
     
    })
});