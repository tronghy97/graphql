"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_yoga_1 = require("graphql-yoga");
const db = require("./db");
class GraphYoga {
    constructor() {
        this.typeDefs = [
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
        ];
        this.resolvers = {
            Query: {
                hello: (_, { name }) => `Hello ${name || 'World 1'}`,
                product: (_, { id }) => {
                    return db.default.cities.find((e) => { return e.id == id; });
                },
                products: () => {
                    return db.default.cities;
                },
                persons: () => {
                    return db.default.persons;
                },
                person_name: (_, { name }) => {
                    return db.default.persons.find(e => { return e.name == name; });
                },
                persons_gender: (_, { gender }) => {
                    return db.default.persons.filter(e => { return e.gender == gender; });
                }
            }
        };
        this.server = new graphql_yoga_1.GraphQLServer({
            typeDefs: this.typeDefs,
            resolvers: this.resolvers
        });
    }
}
exports.default = new GraphYoga().server;
//# sourceMappingURL=graph-yoga.js.map