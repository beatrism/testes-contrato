const req = require('supertest');
const API_URL = process.env.API_URL

describe('user login', () => {
    it('(HealthCheck) should get acess token', () => {
        req(API_URL)
        .post('/login')
        .send({
            "username": "admin",
            "password": "admin"
         })
         .set('Accept', 'application/json')
         .then(response => {
            expect(response.statusCode).toEqual(201)
            expect(response.body.acessToken).not.toBe(undefined)
            
         })
    });
    
});