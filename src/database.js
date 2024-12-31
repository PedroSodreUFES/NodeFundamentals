import fs from "node:fs/promises"

const databasePath = new URL('../db.json', import.meta.url)

export class Database{
    #database = {} //# tprna o database privado para acesso direto

    constructor(){
        fs.readFile(databasePath, 'utf-8').then(data => {
            this.#database = JSON.parse(data)
        })
        .catch(() => {
            this.#persist()
        })
    }

    #persist(){ // # torna a função impossivel de ser invocada fora deste arquivo
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    select(table){
        const data = this.#database[table] ?? [] // se não existir retorna array vazio

        return data
    }

    insert(table,data){
        if(Array.isArray(this.#database[table])){
            this.#database[table].push(data)
        } else{
            this.#database[table] = [data]
        }

        this.#persist();

        return data;
    }
}