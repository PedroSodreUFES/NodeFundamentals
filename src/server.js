import http from "node:http"

/* 
    GET = OBTER INFO 
    POST => CRIAR ALGO
    PUT => ATUALIZAR UM RECURSO
    PATCH => ATUALIZAR ALGO ESPECÍFICO
    DELETE => DELETAR ALGO NO BACKEND
*/

// Cabeçalhos (Requisição/respostaa -> Metadados) método padrão é 0 200(Ok)

const users = []

const server = http.createServer((req, res) => {

    const { method, url } = req

    if (method === 'GET' && url ==='/users'){
        return res
        .setHeader("Content-type", 'application/json')
        .writeHead(200)
        .end(JSON.stringify(users))
    }

    if(method === 'POST' && url === '/users'){
        users.push({
            id: "1",
            name: "John Doe",
            email: "johndoe@xample.com"
        })

        return res.writeHead(201).end()
    }
    return res.writeHead(404).end("Rota não encontrada")
})

server.listen(3333)

