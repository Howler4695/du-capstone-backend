import { books, authors, categories } from '../data/schema.js';
import newTestServer from './utils/test-server.js';
import randomIdsGenerator from './utils/random-ids-generator.js';

describe('index', () => {
  let testServer = newTestServer();
  describe('getBooks', () => {
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

    it('should return all books', async () => {
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
      expect(testBook.categories.map(category => category.id)).toEqual(
        againstBook.categories
      );
      expect(testBook.description).toBe(againstBook.description);
    });
  });

  describe('getAuthors', () => {
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

    it('should return all authors', async () => {
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
      expect(testAuthor.books.map(book => book.id)).toEqual(
        againstAuthor.books
      );
    });
  });

  describe('getCategories', () => {
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

    it('should return all categories', async () => {
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
      expect(testCategory.books.map(book => book.id)).toEqual(
        againstCategory.books
      );
    });
  });

  describe('getBooksByIds', () => {
    const query = `
      query GetBooksByIds($bookIds: [ID!]) {
        getBooksByIds(bookIds: $bookIds) {
          title
        }
      }
    `;

    it('should return books with corresponding ids', async () => {
      const queryIds = randomIdsGenerator(
        2,
        4,
        books.map(book => book.id)
      );

      const { body: response } = await testServer.executeOperation({
        query,
        variables: { bookIds: queryIds }
      });
      const { data, errors } = response.singleResult;

      expect(data.getBooksByIds).toBeDefined();
      expect(errors).toBeUndefined();

      const { getBooksByIds: testBookTitles } = data;
      const againstTitles = books
        .filter(book => queryIds.includes(book.id))
        .map(book => book.title);

      expect(testBookTitles.map(book => book.title)).toEqual(againstTitles);
    });
  });

  describe('addBook', () => {
    const mutation = `
      mutation AddBook($newBook: BookInput!) {
        addBook(newBook: $newBook) {
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

    afterEach(async () => {
      books.pop();
    });
    afterAll(async () => {
      await testServer.stop();
      testServer = newTestServer();
    });

    it('should add book to memory and return book', async () => {
      const preAddLength = books.length;
      const newBook = {
        title: 'Starship Troopers',
        author: '2',
        coverImage: 'https://incredible-cover-image.jpeg',
        categories: ['1', '2'],
        description: "It's starship troopers"
      };

      const { body: response } = await testServer.executeOperation({
        query: mutation,
        variables: { newBook }
      });
      const { data, errors } = response.singleResult;

      expect(data.addBook).toBeDefined();
      expect(errors).toBeUndefined();
      expect(books.length).toBe(preAddLength + 1);

      const testBook = data.addBook;
      const againstBook = newBook;

      expect(testBook.id).toBe(books[books.length - 1].id);
      expect(testBook.title).toBe(againstBook.title);
      expect(testBook.author.id).toBe(againstBook.author);
      expect(testBook.coverImage).toBe(againstBook.coverImage);
      expect(testBook.categories.map(category => category.id)).toEqual(
        againstBook.categories
      );
      expect(testBook.description).toBe(testBook.description);
    });
  });
});
