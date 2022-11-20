import { books, categories } from '../data/schema.js';
import newTestServer from './utils/test-server.js';

describe('index', () => {
  const testServer = newTestServer();
  const originalBooks = [...books];

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

        const testBook = data.addBook;

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

  describe('addCategory', () => {
    const mutation = `
    mutation AddCategory($newCategory: CategoryInput!) {
      addCategory(newCategory: $newCategory) {
        id
        name
        books {
          id
        }
      }
    }
  `;

    afterEach(() => {
      categories.pop();
    });

    it('should add category to memory and return category', async () => {
      const newCategory = {
        name: 'Religous',
        books: ['2', '3']
      };

      const { body: response } = await testServer.executeOperation({
        query: mutation,
        variables: { newCategory }
      });
      const { data, errors } = response.singleResult;

      expect(data.addCategory).toBeDefined();
      expect(errors).toBeUndefined();

      const testCategory = data.addCategory;

      expect(testCategory.id).toBe('4');
      expect(testCategory.name).toBe('Religous');
      expect(testCategory.books.map(book => book.id)).toEqual(['2', '3']);
    });
  });

  describe('updateBook', () => {
    const mutation = `
    mutation UpdateBook($bookId: ID!, $updatedBook: BookInput!) {
      updateBook(bookId: $bookId, updatedBook: $updatedBook) {
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
      books[1] = originalBooks[1];
    });

    it('should update book', async () => {
      const bookId = '2';
      const updatedBook = {
        title: 'Starship Troopers',
        author: '2',
        coverImage: 'https://incredible-cover-image.jpeg',
        categories: ['1', '2'],
        description: "It's starship troopers"
      };

      const { body: response } = await testServer.executeOperation({
        query: mutation,
        variables: { bookId, updatedBook }
      });
      const { data, errors } = response.singleResult;

      expect(data).toBeDefined();
      expect(errors).toBeUndefined();

      const testBook = data.updateBook;

      expect(testBook.id).toBe('2');
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
