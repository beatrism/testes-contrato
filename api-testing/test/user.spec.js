const { getAcessToken } = require("../uteis/request");
const API_URL = process.env.API_URL
describe('user resource', () => {

    beforeAll(async () => {
        token = await getAcessToken('admin', 'admin')
    })

    it('should list users', async () => {
        let token = await getAcessToken()
        await req(API_URL)
            .get('/users')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .then(response => {
                expect(response.statusCode).toEqual(200)
                expect(reponse.body).toBeInstanceOf(Array)
            })
    });

});