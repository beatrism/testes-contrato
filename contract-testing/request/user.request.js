import 'dotenv/config'
import axios from 'axios'
import data from '../data/payload.json'

const baseUrl = `http://localhost:${process.env.MOCK_PORT}`

export const userList = async () => {
    return await axios.post(`${baseUrl}/graphql`, data, {
        headers: {
            Authorization: 'Bearer Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjk4ODQ4MjQ5LCJleHAiOjE2OTkwMjEwNDl9.FrUoHFUPrEQlooq3nAssbCoUfn6qQhQpa-53PHD5DZU',
            "Content-Type": 'application/json'
        }
    })
}