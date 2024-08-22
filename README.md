# Hotels Data Merge Service

## Description

The Hotels Data Merge Service is a ExpressJS application that aggregates hotel data from various suppliers and make them available via a RESTful API.

## Installation

```sh
npm install
```

## Running locally

A sample `.env` file has been included in this repo as `.env-local`.
Rename it to `.env` for the environment variables to be loaded correctly.

There are two ways to run it locally.

### Running only MongoDB with Docker

Use this way of running when doing development because we will not need to build the docker image everytime there is a change.

Make sure you have docker installed in your local environment. [Docker Desktop](https://www.docker.com/products/docker-desktop/) would be a great way to do it.

Pull the MongoDB image from the docker repo
```sh
docker pull mongo
```

Start up a MongoDB container
```sh
npm run mongo:up
```

To shut down the MongoDB container
```sh
npm run mongo:down
```

Run the web application locally
```sh
npm run dev
```

### Running locally purely with Docker

Use this way when development is done and we want to test the web application docker image. 

Build the web application image. 
```sh
npm run docker:build
```

Start up MongoDB and ExpressJS app containers
```sh
npm run docker:up
```

To shutdown MongoDB and ExpressJS app containers
```sh
npm run docker:down
```

## Running tests
Execute tests via jest
```sh
npm run test
```

## API Endpoints

### GET /hotels

Fetches a list of hotels based on query parameters.

#### Request

- **URL**: `/hotels`
- **Method**: `GET`
- **Query Parameters**:
  - `destination` (optional): The destination ID to filter hotels by.
  - `hotels` (optional): A comma-separated list of hotel IDs to filter by.

Sample Curl Command
```sh
curl -X GET "http://localhost:3000/hotels?destination={DESTINATION_ID}&hotels={HOTEL1_ID},{HOTEL2_ID}"
``` 

#### Response

❕ The `amenities` field was modified to not split into `general` and `room` categories. 

The consideration to do so is because 2 out of 3 current suppliers provide a generalised list of amenities, which combines both general and room amenities. Since there is no easy way to categorise them, the current decision would be to combine them in one list.

**Success**:
```json
[
  {
    "id": "iJhz",
    "amenities": [
      "pool",
      "business center",
      "wifi",
      "dry cleaning",
      "breakfast",
      "outdoor pool",
      "indoor pool",
      "childcare",
      "tv",
      "coffee machine",
      "kettle",
      "hair dryer",
      "iron",
      "aircon",
      "tub"
    ],
    "booking_conditions": [
      "All children are welcome. One child under 12 years stays free of charge when using existing beds. One child under 2 years stays free of charge in a child's cot/crib. One child under 4 years stays free of charge when using existing beds. One older child or adult is charged SGD 82.39 per person per night in an extra bed. The maximum number of children's cots/cribs in a room is 1. There is no capacity for extra beds in the room.",
      "Pets are not allowed.",
      "WiFi is available in all areas and is free of charge.",
      "Free private parking is possible on site (reservation is not needed).",
      "Guests are required to show a photo identification and credit card upon check-in. Please note that all Special Requests are subject to availability and additional charges may apply. Payment before arrival via bank transfer is required. The property will contact you after you book to provide instructions. Please note that the full amount of the reservation is due before arrival. Resorts World Sentosa will send a confirmation with detailed payment information. After full payment is taken, the property's details, including the address and where to collect keys, will be emailed to you. Bag checks will be conducted prior to entry to Adventure Cove Waterpark. === Upon check-in, guests will be provided with complimentary Sentosa Pass (monorail) to enjoy unlimited transportation between Sentosa Island and Harbour Front (VivoCity). === Prepayment for non refundable bookings will be charged by RWS Call Centre. === All guests can enjoy complimentary parking during their stay, limited to one exit from the hotel per day. === Room reservation charges will be charged upon check-in. Credit card provided upon reservation is for guarantee purpose. === For reservations made with inclusive breakfast, please note that breakfast is applicable only for number of adults paid in the room rate. Any children or additional adults are charged separately for breakfast and are to paid directly to the hotel."
    ],
    "description": "This 5 star hotel is located on the coastline of Singapore.",
    "destination_id": 5432,
    "images": {
      "rooms": [
        {
          "link": "https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/2.jpg",
          "description": "Double room"
        },
        {
          "link": "https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/3.jpg",
          "description": "Double room"
        },
        {
          "link": "https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/4.jpg",
          "description": "Bathroom"
        }
      ],
      "site": [
        {
          "link": "https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/1.jpg",
          "description": "Front"
        }
      ],
      "amenities": [
        {
          "link": "https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/0.jpg",
          "description": "RWS"
        },
        {
          "link": "https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/6.jpg",
          "description": "Sentosa Gateway"
        }
      ]
    },
    "location": {
      "lat": 1.264751,
      "lng": 103.824006,
      "address": "8 Sentosa Gateway, Beach Villas",
      "city": "Singapore",
      "country": "Singapore"
    },
    "name": "Beach Villas Singapore"
  }
]
```

**Failure**:
  ```json
  {
    "error": "Failed to fetch hotels"
  }
  ```


## Updating of Hotel Data

A cron job will run at 00:00 GMT+8 to procure and update the database with latest hotel data.

Alternatively, the update can be manually triggered via an API endpoint.

### GET POST /update-hotels

#### Request
- **Method**: `POST`
- **URL**: `/update-hotels`

Sample Curl Command
```sh
curl -X POST "http://localhost:3000/update-hotels"
``` 

#### Response
**Success**:
```json
{
  "message": "Hotel data updated successfully"
}
```

**Failure**:
```json
{
  "error": "Failed to update hotel data"
}
```