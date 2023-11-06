const { getAcessToken } = require("../uteis/request");
const API_URL = process.env.API_URL
describe('adresses resource', () => {

    beforeAll(async () => {
        token = await getAcessToken('admin', 'admin')
    })

    it('(Addresses) should list adresses', async () => {
        let token = await getAcessToken()
        await req(API_URL)
            .get('/adresses')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .then(response => {
                expect(response.statusCode).toEqual(200)
                expect(reponse.body).toBeInstanceOf(Array)
            })
    });

});
