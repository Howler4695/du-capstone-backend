import { books, authors, categories } from '../data/schema.js';
import { idIncrement } from '../utils/tools.js';

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

  input BookInput {
    title: String!
    author: ID!
    coverImage: String
    categories: [ID]
    description: String
  }

  input AuthorInput {
    firstName: String
    lastName: String!
  }

  input CategoryInput {
    name: String!
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
    addBook(newBook: BookInput): Book
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
    addBook(_, { newBook }) {
      newBook.id = idIncrement(books.map(book => book.id));
      books.push(newBook);
      return newBook;
    }
  }
};
