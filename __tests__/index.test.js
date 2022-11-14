import getTestServer from "./utils/test-server.js";
// Will Implement context on apolloserver, change ../data/schema.js => ./data/schema.js
import { books, authors, categories } from "../data/schema.js";

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
      const { length } = getBooks;
      const testBook = getBooks[0];
      const againstBook = books[0];

      expect(length).toBe(books.length);
      expect(testBook.id).toBe(againstBook.id);
      expect(testBook.title).toBe(againstBook.title);
      expect(testBook.author.id).toBe(againstBook.author);
      expect(testBook.coverImage).toBe(againstBook.coverImage);
      expect(testBook.categories).toBeDefined(); // TODO: FIGURE THIS OUT
      expect(testBook.description).toBe(againstBook.description);
    });
  });

  describe("getAuthors", () => {
    query = `
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
      const { data, errors } = response;

      expect(errors).toBeUndefined();
      expect(data).toBeDefined();

      const { getAuthors } = data;
      const { length } = getAuthors;
      const testAuthor = getAuthors[0];
      const againstAuthor = authors[0];

      expect(length).ToBe(authors.length);
      expect(testAuthor.id).ToBe(authors.id);
    });
  });
});
