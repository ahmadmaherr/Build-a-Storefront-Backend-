## This project is built with

- Typescript
- Node.js
- PostgreSQL
- Express
- Jasmine


## Get Started

This project require some prequesites and dependenscies to be installed, you can find the instructions below

> To get a local copy, follow these next steps:

## Install

1. Clone the repo
   git clone https://github.com/ahmadmaherr/Build-a-Storefront-Backend-.git
   

2. Install dependenscies

   npm install

3. Create databases

   - connect to the default postgres database as the server's root user:

    psql -U postgres
    

   - In psql run the following to create a user:

    CREATE USER postgres WITH PASSWORD '1111';
`

   - In psql run the following to create the dev and test database:

    CREATE DATABASE storefront_end;
    CREATE DATABASE store_test;


   - Connect to the databases and grant all privileges:

    
    \c store_dev;
    GRANT ALL PRIVILEGES ON DATABASE store_dev TO postgres;

    \c store_test;
    GRANT ALL PRIVILEGES ON DATABASE store_test TO postgres;
    

   - In psql run the following to create the dev and test database:


    CREATE DATABASE store_dev;
    CREATE DATABASE store_test;


5. Enviromental Variables Set up

   - Here are the environmental variables that needs to be set in a .env file. This is the default setting that I used for development, but you can change it to what works for you.


    PORT=3000
    NODE_ENV=dev
    POSTGRES_HOST=127.0.0.1
    POSTGRES_PORT= 5432
    POSTGRES_DB=store_dev
    POSTGRES_DB_TEST=store_test
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=1111
    BCRYPT_PASSWORD=top-secret
    SALT_ROUNDS=10
    TOKEN_SECRET=your-secret-token


6. Run Migrations

   npm install -g db-migrate
   db-migrate up
   ```

7. Run development server

  npm run build 

7. Testing


npm run test


#### Ports

- Server runs on port `3000`
- Database on port `5432`
