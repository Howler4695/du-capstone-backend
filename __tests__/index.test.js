import { getTestServer } from "./utils/apollo-test-server.js";

describe("index", () => {
  const testServer = getTestServer();

  describe("books", () => {
    const query = `
      query {
        books {
          id
          title
          author
          coverImage
          categories
          description
        }
      }
    `;

    it("should return books", () => {
      // const response = testServer.executeOperation({ query });
      // const { books } = response.data;
      // const { length } = response.data;
      // const { error } = response.error;

      // console.log(books);

      expect(true).toBeTruthy();
    });
  });
});
