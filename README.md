# Restaurant Locator API

## Overview

The Restaurant Locator API is a RESTful service for managing restaurant information and performing geospatial queries. This API allows users to create, update, delete, and retrieve restaurant data, including location and ratings. It supports querying restaurants within a specified radius or distance range.

## Features

- **Create**: Add new restaurants with name, description, location, and ratings.
- **Read**: Retrieve restaurants based on location and radius or distance range.
- **Update**: Modify existing restaurant details.
- **Delete**: Remove restaurants from the database.
- **Geospatial Queries**: Find restaurants within a specified radius or distance range from a given location.

## Endpoints

### Create a New Restaurant

- **URL**: `/restaurants`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "Restaurant Name",
    "description": "Restaurant Description",
    "latitude": 17.37025,
    "longitude": 78.357758,
    "ratings": [4, 5, 3]
  }

    Success Response:
        Code: 201
        Content: Created restaurant object

Get Restaurants by Location within a Specified Radius

    URL: /restaurants/radius
    Method: POST
    Body:

    json

    {
      "latitude": 17.343242,
      "longitude": 78.342343,
      "radius": 500
    }

    Success Response:
        Code: 200
        Content: List of restaurants within the specified radius

Get Restaurants by Location within a Specified Distance Range

    URL: /restaurants/distance-range
    Method: POST
    Body:

    json

    {
      "latitude": 17.343242,
      "longitude": 78.342343,
      "minimumDistance": 500,
      "maximumDistance": 2000
    }

    Success Response:
        Code: 200
        Content: List of restaurants within the specified distance range

Update a Restaurant

    URL: /restaurants/:id
    Method: PUT
    Body:

    json

    {
      "name": "Updated Restaurant Name",
      "description": "Updated Description",
      "latitude": 17.37025,
      "longitude": 78.357758,
      "ratings": [4, 5]
    }

    Success Response:
        Code: 200
        Content: Updated restaurant object

Delete a Restaurant

    URL: /restaurants/:id
    Method: DELETE
    Success Response:
        Code: 200
        Content: Success message

Setup and Installation

    Clone the Repository:

git clone https://github.com/Janish-1/restaurant-locater.git
cd restaurant-locater

Install Dependencies:

npm install

Run the Application:

npm start

Docker Setup:

    Build Docker Image:

docker build -t restaurant-locater .

Run Docker Container:

        docker run -p 3000:3000 restaurant-locater

Acknowledgments

    MongoDB Atlas for database services.
    Docker for containerization.
