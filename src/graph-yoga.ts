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
            persons: [Person]
            person_name(name: String): Person
            persons_gender(gender: String): [Person]
        }
        type City {
            id: Int!
            name: String!,
        }

        type Person{
            name: String!
            age: Int!
            gender: String!
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
            },
            persons: () =>{
                return db.default.persons
            },
            person_name: (_, { name }) => {
                return db.default.persons.find(e => {return e.name == name})
            },
            persons_gender:(_, { gender }) => {
                return db.default.persons.filter(e => {return e.gender == gender})
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
