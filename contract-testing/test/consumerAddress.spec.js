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
                        "operationName": "address",
                        "variables": {},
                        "query": "query address($where: UserWhereInput, $orderBy: UserOrderByInput, $skip: Float, $take: Float) {\n  items: users(where: $where, orderBy: $orderBy, skip: $skip, take: $take) {\n    createdAt\n    address_1\n    id\n    address_2\n    city\n    state\n    zip\n   }\n  total: _addressMeta(where: $where, orderBy: $orderBy, skip: $skip, take: $take) {\n    count\n    __typename\n  }\n}\n"
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
                                    "address_1": somethingLike("Rua Primavera"),
                                    "id": somethingLike("ckw9nw4h90000ouup31sakrtw"),
                                    "address_2": somethingLike("4 De Maio"),
                                    "city": somethingLike("São Paulo"),
                                    "state": somethingLike("SP"),
                                    "zip": somethingLike("200404-0404"),
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


    it('(Contrato) should return address list', () => {
        userList().then(response => {
            const { address_1, address_2, city, state, zip } = response.data.data.items[1]

            expect(response.status).toEqual(200)
            expect(address_1).toBe('Rua Primavera')
            expect(address_2).toBe('4 de Maio')
            expect(city).toBe('São Paulo')
            expect(state).toBe('SP')
            expect(zip).toBe('200404-0404')
        })
    });


});