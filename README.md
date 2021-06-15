# backend-WeLoveMovies

Installation
Fork / clone this repository.

Run npm install.

Use npm start to run the application.

Or use npm run start:dev to run the application in development mode: server restarts automatically when files change.

Set the PORT environment variable to the port this server should use.

If PORT is not set, a default value of 5000 is used.

Or Visit the live server :

https://stormy-depths-11883.herokuapp.com/movies

#Routes


## Get all movies

This route will return a list of all movies. Different query parameters will allow for limiting the data that is returned.

### GET /movies?is_showing=true

In the event where `is_showing=true` is provided, the route return _only those movies where the movie is currently showing in theaters.


## Read one movie

This route will return a single movie by ID.

There are four different cases to consider:

- `GET /movies/:movieId`
- `GET /movies/:movieId` (incorrect ID)
- `GET /movies/:movieId/theaters`
- `GET /movies/:movieId/reviews`

### GET /movies/:movieId

Create a route that responds to the following request:

```
GET /movies/:movieId
```

The response from the server should look like the following.

```json
{
  "data": {
    "id": 1,
    "title": "Spirited Away",
    "runtime_in_minutes": 125,
    "rating": "PG",
    "description": "Chihiro...",
    "image_url": "https://imdb-api.com/..."
  }
}
```

### GET /movies/:movieId (incorrect ID)

If the given ID does not match an existing movie, a response like the following should be returned:

```json
{
  "error": "Movie cannot be found."
}
```

The response _must_ have `404` as the status code.

### GET /movies/:movieId/theaters

Update your route so that it responds to the following request:

```
GET /movies/:movieId/theaters
```

This route should return all the `theaters` where the movie is playing. This means you will need to check
the `movies_theaters` table.

The response from the server for a request to `/movies/1/theaters` should look like the following.

```json
{
  "data": [
    {
      "theater_id": 2,
      "name": "Hollywood Theatre",
      "address_line_1": "4122 NE Sandy Blvd.",
      "address_line_2": "",
      "city": "Portland",
      "state": "OR",
      "zip": "97212",
      "created_at": "2021-02-23T20:48:13.342Z",
      "updated_at": "2021-02-23T20:48:13.342Z",
      "is_showing": true,
      "movie_id": 1
    }
    // ...
  ]
}
```

### GET /movies/:movieId/reviews

Update your route so that it responds to the following request:

```
GET /movies/:movieId/reviews
```

This route should return all the `reviews` for the movie, including all the `critic` details added to a `critic` key of the review.

The response from the server for a request to `/movies/1/reviews` should look like the following.

```json
{
  "data": [
    {
      "review_id": 1,
      "content": "Lorem markdownum ...",
      "score": 3,
      "created_at": "2021-02-23T20:48:13.315Z",
      "updated_at": "2021-02-23T20:48:13.315Z",
      "critic_id": 1,
      "movie_id": 1,
      "critic": {
        "critic_id": 1,
        "preferred_name": "Chana",
        "surname": "Gibson",
        "organization_name": "Film Frenzy",
        "created_at": "2021-02-23T20:48:13.308Z",
        "updated_at": "2021-02-23T20:48:13.308Z"
      }
    }
    // ...
  ]
}
```
## Destroy review

This route will delete a review by ID. If the ID is incorrect, a `404` will be returned.

### DELETE /reviews/:reviewId

Create a route that responds to the following request:

```
DELETE /reviews/:reviewId
```

The server should respond with `204 No Content`.

### DELETE /reviews/:reviewId (incorrect ID)

If the given ID does not match an existing review, a response like the following should be returned:

```json
{
  "error": "Review cannot be found."
}
```

The response _must_ have `404` as the status code response.

## Update review

This route will allow you to partially or fully update a review. If the ID is incorrect, a `404` will be returned.

### UPDATE /reviews/:reviewId

Create a route that responds to the following request:

```
PUT /reviews/:reviewId
```

A body like the following should be passed along with the request:

```json
{
  "score": 3,
  "content": "New content..."
}
```

The response should include the entire review record with the newly patched content, and the critic information set to the `critic` property.

```json
{
  "data": {
    "review_id": 1,
    "content": "New content...",
    "score": 3,
    "created_at": "2021-02-23T20:48:13.315Z",
    "updated_at": "2021-02-23T20:48:13.315Z",
    "critic_id": 1,
    "movie_id": 1,
    "critic": {
      "critic_id": 1,
      "preferred_name": "Chana",
      "surname": "Gibson",
      "organization_name": "Film Frenzy",
      "created_at": "2021-02-23T20:48:13.308Z",
      "updated_at": "2021-02-23T20:48:13.308Z"
    }
  }
}
```

### UPDATE /reviews/:reviewId (incorrect ID)

If the given ID does not match an existing review, a response like the following should be returned:

```json
{
  "error": "Review cannot be found."
}
```

The response _must_ have `404` as the status code response.

## Get all theaters

This route will return a list of all theaters. Different query parameters will allow for additional information to be included in the data that is returned.

There is one case to consider:

- `GET /theaters`

### GET /theaters

Create a route that responds to the following request:

```
GET /theaters
```

This route should return all the `theaters` and, the movies playing at each theatre added to the `movies` key. This means you will need to check the `movies_theaters` table.

The response from the server should look like the following.

```json
{
  "data": [
    {
      "theater_id": 1,
      "name": "Regal City Center",
      "address_line_1": "801 C St.",
      "address_line_2": "",
      "city": "Vancouver",
      "state": "WA",
      "zip": "98660",
      "created_at": "2021-02-23T20:48:13.335Z",
      "updated_at": "2021-02-23T20:48:13.335Z",
      "movies": [
        {
          "movie_id": 1,
          "title": "Spirited Away",
          "runtime_in_minutes": 125,
          "rating": "PG",
          "description": "Chihiro...",
          "image_url": "https://imdb-api.com...",
          "created_at": "2021-02-23T20:48:13.342Z",
          "updated_at": "2021-02-23T20:48:13.342Z",
          "is_showing": false,
          "theater_id": 1
        }
        // ...
      ]
    }
    // ...
  ]
}
```

> **Hint** The `mapProperties` function that you created earlier is similar to the `.map()` method of an array. It must return the same number of elements (aka properties) as it is given.

Using `mapProperties` with the following configuration will result in the movie related fields being mapped to a `movies` array:

```js
const mapProperties = require("../utils/map-properties");

const data = [
  {
    theater_id: 1,
    name: "Regal City Center",
    movie_id: 1,
    title: "Spirited Away",
    rating: "PG",
  },
  {
    theater_id: 1,
    name: "Regal City Center",
    movie_id: 2,
    title: "Interstellar",
    rating: "PG-13",
  },
];

const addMovies = mapProperties({
  movie_id: "movies[0].movie_id",
  title: "movies[0].title",
  rating: "movies[0].rating",
});
```

However, since the index of movies is hard codes to `movies[0]`, each record just overwrites the movie at index 0.

What you want is to _collapse_ or _reduce_ the theatre data and _map_ the movies to an array property on the theatre.

With an array, if you want to get back fewer elements than the source array, you must use the `.reduce()` method; `.map()` will always return exactly the same number of elements as the source array.

All of this is to help you understand that you will not be able to use the `mapProperties` function to "map" the movie properties to match the required format for the `/theatres` route.

Implementing this type of reducer is beyond the scope of this module, so this project contains a reducer that is already implemented for you, it is named `reduceProperties`, and all you need to do is configure and use it.

The following section demonstrates how to use the `reduceProperties` function.

## `reduceProperties` function

The `reduceProperties` function is located in `src/utils/reduce-properties.js`.

The `reduceProperties` function accepts two parameters, a `uniqueField`, and `configuration`.

- The uniqueField parameter is the name of the field that contains the unique identifier for each row in the result set. In this case you will use `"theater_id"` for this parameter.
- The configuration parameter is an object where the key specifies the original property name, and the value is an _array_ that specifies the path to the new property name.

Assume you have the following array data:

```js
const data = [
  {
    theater_id: 1,
    name: "Regal City Center",
    movie_id: 1,
    title: "Spirited Away",
    rating: "PG",
  },
  {
    theater_id: 1,
    name: "Regal City Center",
    movie_id: 2,
    title: "Interstellar",
    rating: "PG-13",
  },
];
```

Then you would use the following configuration to _reduce_ the array to one theatre element with a "movies" property:

```json
{
  "movie_id": ["movies", null, "movie_id"],
  "title": ["movies", null, "title"],
  "rating": ["movies", null, "rating"]
}
```

In the above configuration, the values specify the "path" of the property. However, it must be an _array_ where each element in the array represents a part of the path to the new property.
Unlike `mapProperties`, `reduceProperties` will dynamically calculate the array index of an array property by replacing any `null` value with the next index.
So, the above configuration will replace null with `movies.length` during the mapping process, thus inserting a new movie rather than overwriting the existing one.

Review the following example:

```js
const reduceProperties = require("../utils/reduce-properties");

const data = [
  {
    theater_id: 1,
    name: "Regal City Center",
    movie_id: 1,
    title: "Spirited Away",
    rating: "PG",
  },
  {
    theater_id: 1,
    name: "Regal City Center",
    movie_id: 2,
    title: "Interstellar",
    rating: "PG-13",
  },
];

const reduceMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  rating: ["movies", null, "rating"],
});

console.log(JSON.stringify(reduceMovies(data), null, 4));
```

Will print out the following:

```json
[
  {
    "theater_id": 1,
    "name": "Regal City Center",
    "movies": [
      {
        "movie_id": 1,
        "title": "Spirited Away",
        "rating": "PG"
      },
      {
        "movie_id": 2,
        "title": "Interstellar",
        "rating": "PG-13"
      }
    ]
  }
]
```

You are not required to have a `null` value in the configuration value array. You can use `reduceProperties` to map any property values you like:

For example, the following code:

```js
const reduceTheaterAndMovies = reduceProperties("theater_id", {
  theater_id: ["theater", "theater_id"],
  name: ["theater", "name"],
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  rating: ["movies", null, "rating"],
});

console.log(JSON.stringify(reduceTheaterAndMovies(data), null, 4));
```

Will print out the following:

```json
[
  {
    "theater": {
      "theater_id": 1,
      "name": "Regal City Center"
    },
    "movies": [
      {
        "movie_id": 1,
        "title": "Spirited Away",
        "rating": "PG"
      },
      {
        "movie_id": 2,
        "title": "Interstellar",
        "rating": "PG-13"
      }
    ]
  }
]
```



