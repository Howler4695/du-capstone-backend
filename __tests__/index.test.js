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
      const testBook = getBooks[0];
      const againstBook = books[0];

      expect(getBooks.length).toBe(books.length);
      expect(testBook.id).toBe(againstBook.id);
      expect(testBook.title).toBe(againstBook.title);
      expect(testBook.author.id).toBe(againstBook.author);
      expect(testBook.coverImage).toBe(againstBook.coverImage);
      expect(testBook.categories).toBeDefined(); // TODO: FIGURE THIS OUT
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
      expect(testAuthor.books).toBeDefined();
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
      expect(testCategory.books).toBeDefined();
    });
  });

  describe("getBooksByIds", () => {
    const query = `
      query($bookIds: [ID!]) {
        getBooksByIds(bookIds: $bookIds) {
          title
        }
      }
    `;

    it("should return books with coresponding ids", async () => {
      const { body: response } = await testServer.executeOperation({ query });
      const { data, errors } = response;
      console.log([...books]);

      const maxIds = 5;
      const minIds = 2;
      const randomQueryLength = Math.floor(
        Math.random() * (maxIds - minIds) + minIds
      );
      let queryIds = [];
      for (let i = 0; i < randomQueryLength; i++) {
        console.log("yes");
        const numToPush = Math.floor(
          Math.random() * (Math.max(books.id) - Math.min(books.id)) +
            Math.min(books.id)
        );
        if (!books.id.includes(numToPush)) {
          i--;
          continue;
        }
        queryIds.push(numToPush);
      }
      console.log(queryIds);
      console.log(Math.floor(Math.random() * (maxIds - minIds) + minIds));
    });
  });
});
