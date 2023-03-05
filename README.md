# RESTful API App created with Node.js, Express.js, MongoDB and React to manage user data

## Description
This user data management MERN app is used to perform CRUD operations and to sort and filter users based on user attributes.

## App Features

- Create a new user with a unique user ID and current date of creation. The user should have a name, password, birth date, zip code, and phone number.
- Retrieve user data by user ID.
- Update user data by user ID. Users should be able to update their name, birth date, zip code, and phone number.
- Delete user data by user ID.
- Authentication and authorization using JWT tokens
- Pagination to limit the number of users returned by the API
- Filtering and sorting based on user attributes

## Technologies and tools
- Node.js
- Express.js
- MongoDB
- mongoose
- express-validator
- cookie-parser
- cors
- dotenv
- JWT
- bcrypt
- React
- axios
- use-local-storage

## How to install and run the app

- Fork and then clone this repository
  
### Run the backend locally
- navigate to /server directory and `npm install` to install dependencies for the backend
- create .env file and create environment variables: PORT, DB_LINK, ACCESS_TOKEN
- `npm start` to run the app locally
### Run the frontend locally
- navigate to /client directory and `npm install` to install dependencies for the frontend
- `npm start` an open [http://localhost:3000](http://localhost:3000) to view it in your browser
