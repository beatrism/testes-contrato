import 'dotenv/config'

import { Pact } from "@pact-foundation/pact"
import { resolve } from 'path'
import { eachLike, somethingLike } from '@pact-foundation/pact/src/dsl/matchers';


const mockProvider = new Pact({
    consumer: 'ebac-demo-store-admin',
    provider: 'ebac-demo-store-server',
    port: parseInt(process.env.MOCK_PORT),
    log: resolve(process.cwd(), 'logs', 'pact.log'),
    dir: resolve(process.cwd(), 'pacts')
})

describe('Consumer Test', () => {

    beforeAll(async () => {
        await mockProvider.setup().then(() => {
            mockProvider.addInteraction({
                uponReceiving: 'a request',
                withRequest: {
                    method: 'POST',
                    path: '/graphql',
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjk4ODQ4MjQ5LCJleHAiOjE2OTkwMjEwNDl9.FrUoHFUPrEQlooq3nAssbCoUfn6qQhQpa-53PHD5DZU',
                        "Content-Type": 'application/json'
                    },
                    body: {
                        "operationName": "costumers",
                        "variables": {},
                        "query": "query costumers($where: CostumerWhereInput, $orderBy: CostumerOrderByInput, $skip: Float, $take: Float) {\n  items: costumers(where: $where, orderBy: $orderBy, skip: $skip, take: $take) {\n    createdAt\n    Address\n    id\n    firstName\n   lastName\n    email\n    phone\n  }\n  total: _costumersMeta(where: $where, orderBy: $orderBy, skip: $skip, take: $take) {\n    count\n    __typename\n  }\n}\n"
                    }
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        "Content-Type": 'application/json; charset=utf-8'
                    },
                    body: {
                        "data": {
                            "items": eachLike(
                                {
                                    "createdAt": somethingLike("2021-11-21T19:57:22.221Z"),
                                    "address": somethingLike("ckw9nw4h90000ouup31sakrtw"),
                                    "id": somethingLike("ckw9nw4h90000ouup31sak6l3"),
                                    "email": somethingLike("0b1mltnd@gmail.com"),
                                    "FirstName": somethingLike("Beatriz"),
                                    "lastName": somethingLike("Sobrinho"),
                                    "phone": somethingLike("2004-0404"),
                                    "roles": ["adress"],
                                    "updatedAt": somethingLike("2021-11-23T01:09:22.828Z"),
                                    "username": somethingLike("admin"),
                                    "__typename": somethingLike("Adress")
                                },
                                { min: 2 }
                            ),
                            "total": {
                                "count": "2",
                                "__typename": "MetaQueryPayload"
                            }
                        }
                    }

                }
            })
        })
    })

    afterAll(() => mockProvider.finalize())
    afterEach(() => mockProvider.verify())


    it('(Contrato) should return costumer list', () => {
        userList().then(response => {
            const { address, email, firstName, lastName, phone } = response.data.data.items[1]

            expect(response.status).toEqual(200)
            expect(address).toBe('ckw9nw4h90000ouup31sakrtw')
            expect(email).toBe('0b1mltnd@gmail.com')
            expect(firstName).toBe('Beatriz')
            expect(lastName).toBe('Sobrinho')
            expect(phone).toBe('2004-0404')
        })
    });


});