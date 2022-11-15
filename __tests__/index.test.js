import getTestServer from "./utils/test-server.js";
// Will Implement context on apolloserver, change ../data/schema.js => ./data/schema.js
import { books, authors, categories } from "../data/schema.js";
import randomIdsGenerator from "./utils/random-ids-generator.js";

describe("index", () => {
  const testServer = getTestServer();
  describe("getBooks", () => {
    const query = `
      query {
        getBooks {
          id
          title
          author {
            id
          }
          coverImage
          categories {
            id
          }
          description
        }
      }
    `;

    it("should return all books", async () => {
      const { body: response } = await testServer.executeOperation({ query });
      const { data, errors } = response.singleResult;

      expect(errors).toBeUndefined();
      expect(data.getBooks).toBeDefined();

      const { getBooks } = data;
      const testBook = getBooks[0];
      const againstBook = books[0];

      expect(getBooks.length).toBe(books.length);
      expect(testBook.id).toBe(againstBook.id);
      expect(testBook.title).toBe(againstBook.title);
      expect(testBook.author.id).toBe(againstBook.author);
      expect(testBook.coverImage).toBe(againstBook.coverImage);
      expect(testBook.categories.map((category) => category.id)).toEqual(
        againstBook.categories
      );
      expect(testBook.description).toBe(againstBook.description);
    });
  });

  describe("getAuthors", () => {
    const query = `
      query {
        getAuthors {
          id
          firstName
          lastName
          books {
            id
          }
        }
      }
    `;

    it("should return all authors", async () => {
      const { body: response } = await testServer.executeOperation({ query });
      const { data, errors } = response.singleResult;

      expect(errors).toBeUndefined();
      expect(data.getAuthors).toBeDefined();

      const { getAuthors } = data;
      const testAuthor = getAuthors[0];
      const againstAuthor = authors[0];

      expect(getAuthors.length).toBe(authors.length);
      expect(testAuthor.id).toBe(againstAuthor.id);
      expect(testAuthor.firstName).toBe(againstAuthor.firstName);
      expect(testAuthor.lastName).toBe(againstAuthor.lastName);
      expect(testAuthor.books.map((book) => book.id)).toEqual(
        againstAuthor.books
      );
    });
  });

  describe("getCategories", () => {
    const query = `
      query {
        getCategories {
          id
          name
          books {
            id
          }
        }
      }
    `;

    it("should return all categories", async () => {
      const { body: response } = await testServer.executeOperation({ query });
      const { data, errors } = response.singleResult;

      expect(errors).toBeUndefined();
      expect(data.getCategories).toBeDefined();

      const { getCategories } = data;
      const testCategory = getCategories[0];
      const againstCategory = categories[0];

      expect(getCategories.length).toBe(categories.length);
      expect(testCategory.id).toBe(againstCategory.id);
      expect(testCategory.name).toBe(againstCategory.name);
      expect(testCategory.books.map((book) => book.id)).toEqual(
        againstCategory.books
      );
    });
  });

  describe("getBooksByIds", () => {
    const query = `
      query GetBooksByIds($bookIds: [ID!]) {
        getBooksByIds(bookIds: $bookIds) {
          title
        }
      }
    `;

    it("should return books with corresponding ids", async () => {
      const queryIds = randomIdsGenerator(
        2,
        4,
        books.map((obj) => obj.id)
      );

      const { body: response } = await testServer.executeOperation({
        query,
        variables: { bookIds: queryIds },
      });
      const { data, errors } = response.singleResult;

      expect(data.getBooksByIds).toBeDefined();
      expect(errors).toBeUndefined();

      const { getBooksByIds: testBookTitles } = data;
      const againstTitles = books
        .filter((book) => queryIds.includes(book.id))
        .map((book) => book.title);

      expect(testBookTitles.map((book) => book.title)).toEqual(againstTitles);
    });
  });

  describe("getAuthorById", () => {
    const query = `
      query GetAuthorById($authorId: ID!) {
        getAuthorById(authorId: $authorId) {
          id
          firstName
          lastName
          books {
            id
          }
        }
      }
    `;

    it("should return author with corresponding id", async () => {
      const randomAuthorsIndex = Math.floor(Math.random() * authors.length);
      const queryId = authors[randomAuthorsIndex].id;

      const { body: response } = await testServer.executeOperation({
        query,
        variables: { authorId: queryId },
      });
      const { data, errors } = response.singleResult;

      expect(data.getAuthorById).toBeDefined();
      expect(errors).toBeUndefined();

      const { getAuthorById: testAuthor } = data;
      const againstAuthor = authors[randomAuthorsIndex];

      expect(testAuthor.id).toBe(againstAuthor.id);
      expect(testAuthor.firstName).toBe(againstAuthor.firstName);
      expect(testAuthor.lastName).toBe(againstAuthor.lastName);
      expect(testAuthor.books.map((book) => book.id)).toEqual(
        againstAuthor.books
      );
    });
  });

  describe("getCategoryById", () => {
    const query = `
      query GetCategoryById($categoryId: ID!) {
        getCategoryById(categoryId: $categoryId) {
          id
          name
          books {
            id
          }
        }
      }
    `;

    it("should return books with corresponding ids", async () => {
      const randomCategoryIndex = Math.floor(Math.random() * categories.length);
      const queryId = categories[randomCategoryIndex].id;

      const { body: response } = await testServer.executeOperation({
        query,
        variables: { categoryId: queryId },
      });
      const { data, errors } = response.singleResult;

      expect(data.getCategoryById).toBeDefined();
      expect(errors).toBeUndefined();

      const { getCategoryById: testCategory } = data;
      const againstCategory = categories[randomCategoryIndex];

      expect(testCategory.id).toBe(testCategory.id);
      expect(testCategory.name).toBe(againstCategory.name);
      expect(testCategory.books.map((book) => book.id)).toEqual(
        againstCategory.books
      );
    });
  });
});
