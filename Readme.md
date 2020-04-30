# wednesday_demo_api
> Demo RESTful Api to serve app like ola for wednesday_sol

*   Create a Booking
*   Get Booking History
*   Get Near by Cars

## Setup
> Setup to start working on this project

### Install NodeJs
[version as of writing: node v10.16.3](https://nodejs.org/en/download/)


### Install the Dependencies
> npm i

### Install the Dependencies
> npm i

### Can Install more Dependency for ease
>npm i sequelize-cli

### Testing the application
>Change the NODE_ENV to test (example: in root/.env NODE_ENV=test)
>npm test

### Starting the application
>npm start

## Some Available EndPoints
>the endpoints offered by the restful-api are:

### Create a Booking
>http://localhost:5000/api/book/
>With query parameter maxDistance(Max Distance from user in meters)
>example: http://localhost:5000/api/book?maxDistance=100000000

### Get Booking History
>http://localhost:5000/api/bookings/
>With query parameter page(page no. of bookings(current page size 5))
>example: http://localhost:5000/api/bookings?page=1

### Get Near by Cars
>http://localhost:5000/api/nearbycars/
>With query parameters lng(longitude), lat(latitude), maxDistance(Max Distance from user in meters)
>example: http://localhost:5000/api/nearbycars/?lng=53.088415&lat=15.904740&maxDistance=100000000

### Swagger Documentation
>http://localhost:5000/api-docs/(using HTTP Bearer Authentication)
