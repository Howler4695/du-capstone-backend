import { books, authors, categories } from "../data/schema.js";

export const typeDefs = `#graphql
  type Book {
    id: ID!
    title: String
    author: Author
    coverImage: String
    categories: [Category]
    description: String
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
    getBooks: [Book]
    getAuthors: [Author]
    getCategories: [Category]
    getBooksByIds(bookIds: [ID!]): [Book]
    getAuthorById(authorId: ID!): Author
    getCategoryById(categoryId: ID!): Category
  }
`;

export const resolvers = {
  Book: {
    author: ({ author: authorId }) => {
      return authors.find((author) => author.id === authorId);
    },
    categories: ({ categories: categoryIds }) => {
      console.log(categoryIds);
      return categories.filter((category) => categoryIds.includes(category.id));
    },
  },
  Author: {
    books: ({ books: bookIds }) => {
      return books.filter((book) => bookIds.includes(book.id));
    },
  },
  Category: {
    books: ({ books: bookIds }) => {
      return books.filter((book) => bookIds.includes(book.id));
    },
  },
  Query: {
    getBooks: () => books,
    getAuthors: () => authors,
    getCategories: () => categories,
    getBooksByIds: (parent, { bookIds }) => {
      return books.filter((book) => bookIds.includes(book.id));
    },
    getAuthorById: (parent, { authorId }) => {
      return authors.find((author) => author.id === authorId);
    },
    getCategoryById: (parent, { categoryId }) => {
      return categories.find((category) => categoryId === category.id);
    },
  },
};
