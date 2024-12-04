# VIDLY NODE API

This is a Node.js backend API for an imaginary  **Movie Rental App**, designed to manage movies, customers, rentals, and user authentication. The API is built using Express.js and MongoDB for seamless handling of resources and authentication.

---

## Features

- **User Authentication**: 
  - Register and login using secure JWT authentication.
  - Passwords are encrypted using bcrypt.

- **Movie Management**: 
  - Add, update, and delete movie records.
  - Get a list of all available movies.

- **Customer Management**: 
  - Manage customer details for rentals.

- **Rental System**: 
  - Handle movie rentals.
  - Return rented movies.

- **Genre Categorization**:
  - Classify movies by genre.

---

## Getting Started

Follow these steps to set up the project locally:

### Prerequisites

- **Node.js**: v16 or higher
- **MongoDB**: Installed locally or hosted (e.g., MongoDB Atlas)
- **Git**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Tesfatsion-Gudeta/VIDLY.git
   cd VIDLY

2.Install dependencies:
 
   ```bash
    Copy code
    npm install
    Set up environment variables:
   ```
3.Create a .env file in the root directory.

Add the following variables:
   ```
    PORT=5000
    MONGO_URI=<Your MongoDB connection string>
    JWT_SECRET=<Your JWT secret>
   ```
4.Start the server:

```bash
Copy code
npm start

```
The server will run on http://localhost:5000 by default.
