import { GraphQLServer } from 'graphql-yoga'
import * as db from './db'

class GraphYoga {
    public server: GraphQLServer

    private readonly typeDefs = [
        `
        type Query {
            hello(name: String): String!
            product(id: Int): City
            products: [City]
        }
        type City {
            id: Int!
            name: String!,
        }
        `
    ]

    private readonly resolvers = {
        Query: {
            hello: (_, { name }) => `Hello ${name || 'World 1'}`,
            product: (_, { id }) => {
                return db.default.cities.find((e) => {return e.id == id})
            },
            products: () => {
                return db.default.cities
            }
        }
    }

    constructor () {
        this.server = new GraphQLServer({
            typeDefs: this.typeDefs,
            resolvers: this.resolvers
        })
    }
}

export default new GraphYoga().server
