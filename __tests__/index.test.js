import { books, authors, categories } from '../data/schema.js';
import newTestServer from './utils/test-server.js';

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
      expect(response).toMatchSnapshot();
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
      expect(response).toMatchSnapshot();
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
      expect(response).toMatchSnapshot();
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
        const queryIds = ['1', '2', '4'];

        const { body: response } = await testServer.executeOperation({
          query,
          variables: { bookIds: queryIds }
        });
        const { data, errors } = response.singleResult;

        expect(data.getBooksByIds).toBeDefined();
        expect(errors).toBeUndefined();

        const { getBooksByIds: testBookTitles } = data;

        expect(testBookTitles.map(book => book.title)).toEqual([
          'Harry Potter and the Chamber of Secrets',
          'Harry Potter and the Prisoner of Azkaban',
          'C All in One Desk Reference For Dummies'
        ]);
      });

      it('should return books with corresponding ids, and no duplicates', async () => {
        const queryIds = ['1', '2', '2'];

        const { body: response } = await testServer.executeOperation({
          query,
          variables: { bookIds: queryIds }
        });
        const { data, errors } = response.singleResult;

        expect(data.getBooksByIds).toBeDefined();
        expect(errors).toBeUndefined();

        const { getBooksByIds: testBookTitles } = data;

        expect(testBookTitles.map(book => book.title)).toEqual([
          'Harry Potter and the Chamber of Secrets',
          'Harry Potter and the Prisoner of Azkaban'
        ]);
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

      afterEach(() => {
        books.pop();
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

        expect(testBook.id).toBe('5');
        expect(testBook.title).toBe('Starship Troopers');
        expect(testBook.author.id).toBe('2');
        expect(testBook.coverImage).toBe('https://incredible-cover-image.jpeg');
        expect(testBook.categories.map(category => category.id)).toEqual([
          '1',
          '2'
        ]);
        expect(testBook.description).toBe("It's starship troopers");
      });
    });
  });
});
