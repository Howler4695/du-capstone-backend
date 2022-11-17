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

      const { getBooks } = data;
      const testBook = getBooks[0];

      expect(getBooks.length).toBe(4);
      expect(testBook.id).toBe('1');
      expect(testBook.title).toBe('Harry Potter and the Chamber of Secrets');
      expect(testBook.author.id).toBe('1');
      expect(testBook.coverImage).toBe(
        'https://m.media-amazon.com/images/I/51mFoFmu0EL._AC_SY780_.jpg'
      );
      expect(testBook.categories.map(category => category.id)).toEqual([
        '1',
        '2'
      ]);
      expect(testBook.description).toBe(
        'Harry Potter and the Chamber of Secrets is a 1998 young adult fantasy novel by J.K. Rowling, the second in the Harry Potter series. The story follows Harry’s tumultuous second year at Hogwarts School of Witchcraft and Wizardry, including an encounter with Voldemort, the wizard who killed Harry’s parents. Against this fantastic backdrop, Rowling examines such themes as death, fame, friendship, choice, and prejudice. Upon release, the novel became a worldwide bestseller and won several awards, including Children’s Book of the Year at the British Book Awards and the Nestlé Smarties Book Award; it was subsequently adapted into a 2002 film directed by Chris Columbus.'
      );
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

      expect(getAuthors.length).toBe(8);
      expect(testAuthor.id).toBe('1');
      expect(testAuthor.firstName).toBe('J.K.');
      expect(testAuthor.lastName).toBe('Rowling');
      expect(testAuthor.books.map(book => book.id)).toEqual(['1', '2', '3']);
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

      expect(getCategories.length).toBe(3);
      expect(testCategory.id).toBe('1');
      expect(testCategory.name).toBe('Fantasy');
      expect(testCategory.books.map(book => book.id)).toEqual(['1', '2', '3']);
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
