# Demo Credit

## Description

This application demonstrates how to create,fund a wallet. It also allows transfer/ withdrawal of funds. This system also prevents LendQr blacklisted users from onboarding.

## Table of Contents

- [Demo Credit](#demo-credit)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [ER Diagram](#er-diagram)
  - [Prerequisites](#prerequisites)
    - [Node.js](#nodejs)
    - [MySQL](#mysql)
    - [TypeScript](#typescript)
    - [Knex.js](#knexjs)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Usage](#usage)
  - [Endpoints](#endpoints)
  - [License](#license)

## ER Diagram

Click on the link below to learn more about the ER Diagram

[ER Diagram](https://dbdesigner.page.link/DChBiuTkayk3PpdL7)

## Prerequisites

Ensure you have the following installed on your local machine:

- Node.js (v14.x or higher)
- npm (v6.x or higher) or yarn (v1.x or higher)
- MySQL (depending on your database choice)

### Node.js

1. Download and install Node.js from the [official website](https://nodejs.org/).
2. Verify the installation by running:
   ```sh
   node -v
   npm -v
   ```

### MySQL

1. Install MySQL from the [official website](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/).
2. Or you can leverage from XAMPP [official website](https://www.apachefriends.org/download.html)

### TypeScript

    You don't need to install this package manually.It will be treated in the Installation section

### Knex.js

    You don't need to install this ORM package manually. It will be treated in the Installation section

## Installation

1. Create an empty directory e.g: DemoCredit
2. Initialize git

   ```sh
   git init
   ```

3. Clone the repository
   ```sh
   git clone git@github.com:oagbeja/democredit.git
   ```
4. Install the application

   ```sh
   npm install
   ```

## Configuration

1.  Create an .env file and save it in the root directory, then fill in your resprctive variables as seen below

            PORT=
            DB_HOSTNAME=
            DB_PORT=
            DB_USERNAME=
            DB_PASSWORD=
            DB_NAME=
            TOKEN_SECRET=
            LENDQR_API_KEY=

    You would be required to sign up to the Lendsqr Adjutor API service in order to get the API key labeled as LENDQR_API_KEY

    TOKEN_SECRET is the secret key used for jwt Token Authentication

    PORT is the listening port on the server

    DB_HOSTNAME,DB_PORT,DB_USERNAME,DB_PASSWORD,DB_NAME can be derived from your MySql setup

2.  Start DB Migrations

    Run

    ```sh
    npx knex migrate:latest

    ```

## Usage

1.  To run the project in development mode:

    ```sh
    npm run dev

    ```

2.  To compile the TypeScript code:

    ```sh
    npm run build

    ```

## Endpoints

### 1. /api/auth/signup

- **Method:** POST
- **Description:** User register into the platform.
- **Request Body:**
  - `firstName`: String, required
  - `lastName`: String, required
  - `nin`: Integer, required
  - `email`: String, required
  - `password`: String, required

### 2. /api/auth/login

- **Method:** POST
- **Description:** User logs in.
- **Request Body:**
  - `email`: String, required
  - `password`: String, required

### 3. /api/fund/my-account

- **Method:** POST
- **Description:** User funds his account
- **Request Body:**
  - `amount`: Double, required, greater than zero

### 4. /api/fund/another-account

- **Method:** POST
- **Description:** User transfer to another's account
- **Request Body:**
  - `email`: String, required
  - `amount`: Double, required, greater than zero

### 5. /api/fund/withdraw

- **Method:** POST
- **Description:** User withdraws from the wallet.
- **Request Body:**
  - `amount`: Double, required, greater than zero

## **Note:**

Endpoint 3 - 5 needs a bearer token (derived from user authentication ) added to the Authorization header .

        "Authorization": "Bearer echaiPPPSKKKLKLkklkslkds...."

## License

This project is licensed under the MIT [LICENSE](./LICENSE) - see the LICENSE file for details.
