const graphql = require('graphql')
const _ = require('lodash')
const Book = require('../models/book')
const Author = require('../models/author')
const { makeExecutableSchema } = require('graphql-tools')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = graphql

const typeDefs = `
    type  Author{
        id: ID
        name: String!
        age: String!
        books: [Book]
    }
    type Book{
        id: ID
        name: String!
        genre: String!
        author: Author!
    }

    type Query {
        books: [Book]
        book(id: ID): Book
        authors: [Author]
        author(id: ID): Author
    }
`

const resolvers    ={
    Query: {
        books: (parent, args) => {
            return Book.find({});
        },
        authors: (parent, args) => {
            return Author.find({});
        },
        book: (parent, {id}) => {
            return Book.findById(id);
        },
        author: (parent, {id}) => {
            return Author.findById(id);
        },
    },

    Book: {
        author: ({authorId}, args) => {
            return Author.findById(authorId);
        },
        genre: (parent, args) => {
            return parent.genre + "_modified"
        }
    }
}



// const Mutations = new GraphQLObjectType({
//     name: 'Mutation',
//     fields: {
//         addBook: {
//             type: BookType,
//             args: {
//                 name: { type: GraphQLString },
//                 genre: { type: GraphQLString },
//                 authorId: { type: GraphQLString },
//             },
//             resolve(parent, args) {
                
//                 let book = new Book({
//                     name: args.name,
//                     genre: args.genre,
//                     authorId: args.authorId
//                 });
//                 return book.save()
                
//             }
//         },

//         addAuthor: {
//             type: AuthorType,
//             args: {
//                 name: { type: new GraphQLNonNull(GraphQLString) },
//                 age: { type: new GraphQLNonNull(GraphQLString) },
                
//             },
//             resolve(parent, args) {
                
//                 let author = new Author(args);
//                 return author.save()
                
//             }
//         },
        
//     }
    
// })

module.exports = new makeExecutableSchema({
    typeDefs,
    resolvers
})