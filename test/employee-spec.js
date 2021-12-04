const request = require('supertest')
const app = require('./../server');

describe('CRUD /api/employee', () => {

    let token = process.env.TEST_VAR;
    const deleteEmployee = {"fname":"j", "surname":"w"}
    const updateEmployee= {"fname":"j", "surname":"w", "company":"ibm", "email":"admin@ibm.com", "phone":"091456456"}
    const newEmployee = {"fname":"j", "surname":"w", "company":"ibm", "email":"support@ibm.com", "phone":"091456456"}
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
       expect(res.statusCode).toEqual(200)   
    })
});