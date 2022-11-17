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
    getAuthorBooksById(authorId: ID!): [Book]
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
      books.filter(book => bookIds.includes(book.id)),
    getAuthorBooksById: (_, { authorId }) =>
      books.filter(book => authorId === book.author)
  },
  Mutation: {
    addBook(_, { newBook }) {
      newBook.id = String(books.length + 1);
      books.push(newBook);
      return newBook;
    }
  }
};
