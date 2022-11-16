// Figure this out with context implementation
export const books = [
  {
    id: '1',
    title: 'Harry Potter and the Chamber of Secrets',
    author: '1',
    coverImage:
      'https://m.media-amazon.com/images/I/51mFoFmu0EL._AC_SY780_.jpg',
    categories: ['1', '2'],
    description:
      'Harry Potter and the Chamber of Secrets is a 1998 young adult fantasy novel by J.K. Rowling, the second in the Harry Potter series. The story follows Harry’s tumultuous second year at Hogwarts School of Witchcraft and Wizardry, including an encounter with Voldemort, the wizard who killed Harry’s parents. Against this fantastic backdrop, Rowling examines such themes as death, fame, friendship, choice, and prejudice. Upon release, the novel became a worldwide bestseller and won several awards, including Children’s Book of the Year at the British Book Awards and the Nestlé Smarties Book Award; it was subsequently adapted into a 2002 film directed by Chris Columbus.'
  },
  {
    id: '2',
    title: 'Harry Potter and the Prisoner of Azkaban',
    author: '3',
    coverImage:
      'https://m.media-amazon.com/images/I/51DQeuJ5QDL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg',
    categories: ['2', '3']
  }
];
export const authors = [
  {
    id: '1',
    firstName: 'J.K.',
    lastName: 'Rowling',
    books: ['1', '2', '3']
  },
  {
    id: '3',
    firstName: 'Ayn',
    lastName: 'Rand',
    books: ['2']
  }
];
export const categories = [
  {
    id: '1',
    name: 'Fantasy',
    books: ['1']
  },
  {
    id: '2',
    name: 'Fiction',
    books: ['1', '2']
  },
  {
    id: '3',
    name: 'Programming',
    books: ['2']
  }
];
