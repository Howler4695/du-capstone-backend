import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { books, authors, categories } from "../schema.js";

const typeDefs = `#graphql
  type Book {
    id: ID!
    title: String
    author: Author
    coverImage: String
    categories: [Category]
  }

  type Author {
    id: ID!
    firstName: String
    lastName: String!
    books: [Book]
  }

  type Category {
    id: ID!
    name: String!
    books: [Book]
  }

  type Query {
    books: [Book]
    authors: [Author]
    categories: [Category]
    getBooksByIds(bookId: [ID!]): [Book]
    getAuthorById(authorId: ID!): Author
    getBooksByAuthorId(authorId: ID!): [Book]
    getCategoryById(categoryId: ID!): Category
  }
`;

const resolvers = {
  Book: {
    author: ({ author: authorId }) =>
      authors.find((author) => author.id === authorId),
    categories: ({ categories: categoryIds }) =>
      categories.filter((category) => categoryIds.includes(category.id)),
  },
  Author: {
    books: ({ id: bookId }) => books.filter((book) => book.id === bookId),
  },
  Category: {
    books: ({ id: bookId }) => books.filter((book) => book.id === bookId),
  },
  Query: {
    books: () => books,
    authors: () => authors,
    categories: () => categories,
    getBooksByIds: (parent, { bookIds }) => {
      return books.filter((book) => bookIds.includes(book.id));
    },
    getAuthorById: (parent, { authorId }) => {
      return authors.find((author) => author.id === authorId);
    },
    getBooksByAuthorId: (parent, { authorId }) => {
      const targetAuthor = authors.find((author) => authorId === author.id);
      return books.filter((book, index) =>
        targetAuthor.books[index].includes(book.id)
      );
    },
    getCategoryById: (parent, { categoryId }) => {
      return categories.find((category) => categoryId === category.id);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
