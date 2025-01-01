import { Database } from "./database.js"
import { randomUUID } from "node:crypto"
import { buildRoadPath } from "./utils/buildRoutePath.js"

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: buildRoadPath('/users'),
        handler: (req, res) => {
            const { search } = req.query

            const users = database.select('users', search ? {
                name: search, 
                email: search,
            } : null)

            return res
                .writeHead(200)
                .end(JSON.stringify(users))
        }
    },
    {
        method: 'POST',
        path: buildRoadPath('/users'),
        handler: (req, res) => {
            const { name, email } = req.body

            const user = ({
                id: randomUUID(),
                name: name,
                email: email
            })

            database.insert("users", user)

            return res.writeHead(201).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRoadPath('/users/:id'),
        handler: (req, res) => {
            const { id } = req.params

            database.delete('users', id)

            return res.writeHead(204).end()
        }
    },
    {
        method: 'PUT',
        path: buildRoadPath('/users/:id'),
        handler: (req, res) => {
            const { id } = req.params
            const {name, email} = req.body

            database.update('users', id, { name, email, })

            return res.writeHead(204).end()
        }
    }
]