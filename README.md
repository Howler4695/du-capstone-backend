# Howle DU Capstone Project

#### Author: A1C Howle

#### Completion: 9/9 (100%)

## API Documentation

| Resolver               | Arguments                                                                                                                             | Description                                    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `getBooks`             |                                                                                                                                       | Retrieves all books in memory                  |
| `getAuthors`           |                                                                                                                                       | Retrieves all authors in memory                |
| `getCategories`        |                                                                                                                                       | Retrieves all categories in memory             |
| `getBooksByIds`        | `id` - ID (**REQUIRED**) _The ID of the Book being returned_                                                                          | Returns all books with matching `id`(s)        |
| `getAuthorBookById`    | `id` - ID (**REQUIRED**) _The ID of the Author_                                                                                       | Returns all books that belong to Author `id`   |
| `getCategoryBooksById` | `id` - ID (**REQUIRED**) _The ID of the Category_                                                                                     | Returns all books that belong to Category `id` |
| `addBook`              | `newBook` - BookInput (**REQUIRED**) _The Book Object being added_                                                                    | Adds `Book` to memory and then returns it      |
| `addCategory`          | `newCategory` - CategoryInput (**REQUIRED**) _The Category Object being added_                                                        | Adds `Category` to memory and then returns it  |
| `updateBook`           | `bookId` - ID (**REQUIRED**) _The ID of the Book to be updated_ `updatedBook` - BookInput (**REQUIRED**) _The Book Object to replace | updates `Book` by `id`                         |
