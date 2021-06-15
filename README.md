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

Link: https://stormy-depths-11883.herokuapp.com/movies

### GET /movies?is_showing=true

In the event where `is_showing=true` is provided, the route return _only those movies where the movie is currently showing in theaters.

Link: https://stormy-depths-11883.herokuapp.com/movies?is_showing=true

## Read one movie

### GET /movies/:movieId

This route will return a single movie by ID.

Example: https://stormy-depths-11883.herokuapp.com/movies/259 

### GET /movies/:movieId (incorrect ID)

If the given ID does not match an existing movie, a response like the following will be returned:

```json
{
  "error": "Movie cannot be found."
}
```

The response  have `404` as the status code.


### GET /movies/:movieId/theaters

This route return all the `theaters` where the movie is playing. 

The response from the server for a request to `/movies/1/theaters` should look like the following.

Example : https://stormy-depths-11883.herokuapp.com/movies/259/theaters

### GET /movies/:movieId/reviews

This route should return all the `reviews` for the movie, including all the `critic` details added to a `critic` key of the review.

Example: https://stormy-depths-11883.herokuapp.com/movies/262/reviews

## Destroy review

### DELETE /reviews/:reviewId

This route will delete a review by ID. If the ID is incorrect, a `404` will be returned.

### DELETE /reviews/:reviewId (incorrect ID)

If the given ID does not match an existing review, the response returned:

```json
{
  "error": "Review cannot be found."
}
```

The response have `404` as the status code response.

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

If the given ID does not match an existing review, a response like the following will be returned:

```json
{
  "error": "Review cannot be found."
}
```

The response  have `404` as the status code response.

## Get all theaters

This route will return a list of all theaters. Different query parameters will allow for additional information to be included in the data that is returned.

There is one case to consider:

- `GET /theaters`

### GET /theaters

This route should return all the `theaters` and, the movies playing at each theatre added to the `movies` key. 

Link https://stormy-depths-11883.herokuapp.com/theaters



