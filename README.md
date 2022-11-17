# Howle DU Capstone Project

### Pain Incarnate

## API Documentation

| Resolver          | Arguments                                                        | Description                              |
| ----------------- | ---------------------------------------------------------------- | ---------------------------------------- |
| `getBooks`        |                                                                  | Retrieves all books in memory            |
| `getAuthors`      |                                                                  | Retrieves all authors in memory          |
| `getCategories`   |                                                                  | Retrieves all categories in memory       |
| `getBooksByIds`   | `id` - ID (**REQUIRED**) _The ID of the Book being returned_     | Returns all books with matching `id`(s)  |
| `getAuthorById`   | `id` - ID (**REQUIRED**) _The ID of the Author being returned_   | Returns the Author with matching `id`    |
| `getCategoryById` | `id` - ID (**REQUIRED**) _The ID of the Category being returned_ | Returns the Category with matching `id`  |
| `addBook`         | `newBook` - BookInput (**REQUIRED**) _The Book Object being added_ | Adds `Book` to memory and then returns it |
