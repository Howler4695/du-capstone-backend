import { books, authors, categories } from '../data/schema.js';

export const typeDefs = `#graphql
  type Book {
    id: ID!
    title: String!
    author: Author!
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

  type Mutation {
    addBook(title: String!, author: Author!, coverImage: String, categories: [Category], description String): Book
  }
`;

export const resolvers = {
  Book: {
    author: ({ author: authorId }) =>
      authors.find(author => authorId === author.id),
    categories: ({ categories: categoryIds }) =>
      categories.filter(category => categoryIds.includes(category.id))
  },
  Author: {
    books: ({ books: bookIds }) =>
      books.filter(book => bookIds.includes(book.id))
  },
  Category: {
    books: ({ books: bookIds }) =>
      books.filter(book => bookIds.includes(book.id))
  },
  Query: {
    getBooks: () => books,
    getAuthors: () => authors,
    getCategories: () => categories,
    getBooksByIds: (_, { bookIds }) =>
      books.filter(book => bookIds.includes(book.id))
  },
  Mutation: {
    addBook: (_, { title, author, coverImage, categories, description }) => {
      return null;
    }
  }
};
