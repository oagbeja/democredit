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
  - [License](#license)

## ER Diagram

Include an image or a link to your ER diagram here.

![ER Diagram](path/to/your/ER-diagram.png)

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

## License

This project is licensed under the MIT [LICENSE](./LICENSE) - see the LICENSE file for details.
