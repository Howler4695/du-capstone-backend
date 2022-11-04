# Digital University Capstone Project

# All Wrong IGNORE

To get started, clone the project down and run the following command:

```
npm i && npm run start
```

To run the project in development mode, use:

```
npm run dev
```

This will allow the server to refresh on file change.

# API Documentation

| Resolver         | Arguments                                                                                                                                                                                                                                                     | Description                                                               |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `getBook`        | `id` - STRING (**REQUIRED**) _The ID of the book being retrieved_                                                                                                                                                                                             | Retrieves a single book object by `id` from memory and returns it         |
| `getBooks`       | -                                                                                                                                                                                                                                                             | Retrieves all book objects from memory and returns them                   |
| `addBook`        | `title` - STRING (**REQUIRED**) _The title of the book_<br>`authorId` - STRING (**REQUIRED**) _The ID of the author_<br>`categoryIds` - [STRING] (**REQUIRED**) _An array of category IDs_                                                                    | Adds a single book object to memory and returns it                        |
| `updateBook`     | `id` - STRING (**REQUIRED**) _The ID of the book being updated_<br>`title` - STRING (**REQUIRED**) _The title of the book_<br>`authorId` - STRING (**REQUIRED**) _The ID of the author_<br>`categoryIds` - [STRING] (**REQUIRED**) _An array of category IDs_ | Updates a single book object in memory and returns the updated object     |
| `removeBook`     | `id` - STRING (**REQUIRED**) _The ID of the book being removed_                                                                                                                                                                                               | Removes a single book object from memory and returns the removed `id`     |
| `getAuthor`      | `id` - STRING (**REQUIRED**) _The ID of the author being retrieved_                                                                                                                                                                                           | Retrieves a single author object by `id` from memory and returns it       |
| `getAuthors`     | -                                                                                                                                                                                                                                                             | Retrieves all author objects from memory and returns them                 |
| `addAuthor`      | `firstName` - STRING (**REQUIRED**) _The first name of the author_<br>`lastName` - STRING (**REQUIRED**) _The last name of the author_                                                                                                                        | Adds a single author object to memory and returns it                      |
| `updateAuthor`   | `id` - STRING (**REQUIRED**) _The ID of the author being updated_<br>`firstName` - STRING (**REQUIRED**) _The first name of the author_<br>`lastName` - STRING (**REQUIRED**) _The last name of the author_                                                   | Updates a single author object in memory and returns the updated object   |
| `removeAuthor`   | `id` - STRING (**REQUIRED**) _The ID of the author being removed_                                                                                                                                                                                             | Removes a single author object from memory and returns the removed `id`   |
| `getCategory`    | `id` - STRING (**REQUIRED**) _The ID of the category being retrieved_                                                                                                                                                                                         | Retrieves a single category object by `id` from memory and returns it     |
| `getCategories`  | -                                                                                                                                                                                                                                                             | Retrieves all category objects from memory and returns them               |
| `addCategory`    | `name` - STRING (**REQUIRED**) _The name of the category_                                                                                                                                                                                                     | Adds a single category object to memory and returns it                    |
| `updateCategory` | `id` - STRING (**REQUIRED**) _The ID of the category being updated_                                                                                                                                                                                           | Updates a single category object in memory and returns the updated object |
| `removeCategory` | `id` - STRING (**REQUIRED**) _The ID of the category being removed_                                                                                                                                                                                           | Removes a single category object from memory and returns the removed `id` |
