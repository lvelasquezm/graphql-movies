# Code Challenge for Scoutbase

If you’re reading this, then you’ve applied for a position at Scoutbase.

This directory includes two subdirectories:

- `front-end` with focus on React, SSR, Apollo & `styled-components`
- `back-end` with focus on SQL, Node.js, GraphQL

You can do one or you can do two.

## Instructions

You have received this directory within the .zip archive.

1. Create a repo out of the directory with this `README.md` in the root of it.
2. Work on either task following the guidelines in `README.md` within chosen directory.
3. Follow best practices of saving changes to the repo.
4. Upload the repo to your personal Github account and share it with two collaborators:
    - `Yaass` username – Yassin Askar, co-founder of Scoutbase
    - `kuka` username – Kuanysh, consultant
5. Expect a response within 10 working days after sharing the task, you’ll be contacted with the info you’ve provided during initial registration.

----------------------------------------------
----------------------------------------------

## Description
The GraphQL server exposes 1 [query](https://graphql.org/learn/queries/) and
2 [mutations](https://graphql.org/learn/queries/#mutations)
- `movies` query: Exposes all movies registered on the DB.
This query can be accessed like this:
```graphql
query {
  movies {
    title
    year
    rating
    actors {
      name
      birthday
      country
    }
    directors {
      name
      birthday
      country
    }
  }
}
```
Additionaly, logged in users can query an auth-based field called `scoutbase_rating`
(users not logged in can still query that field but they will get `null`)
- `createUser` mutation: Exposes a method for registering a new user into the app.
The mutation returns a `token` property which is a JSON Web Token ([docs](https://jwt.io/))
so authenticated users can access private features on the app. This query can be accessed like this:
```graphql
mutation {
  createUser(username: "username" password: "password") {
    token
    user {
      id
      username
    }
  }
}
```
- `login` mutation: Similar than `createUser`, it exposes a method for loggin in a existing user into the app.
The mutation also returns a `token` property which is a JSON Web Token ([docs](https://jwt.io/))
so authenticated users can access private features on the app. This query can be accessed like this:
```graphql
mutation {
  login(username: "username" password: "password") {
    token
    user {
      id
      username
    }
  }
}
```

## Tech Stack

- The GraphQL server of this application is implemented using [graphql-yoga](https://github.com/prisma/graphql-yoga)
- The app uses a [PostgreSQL](https://www.postgresql.org/) database to store the information.
The database is hosted on [heroku](https://www.heroku.com/) using the
[Heroku Postgres](https://www.heroku.com/postgres) add-on
- This app uses [Prisma](https://www.prisma.io/) which make easy and smooth to work with databases
and is the perfect tool for GraphQL implementations
([more information](https://www.prisma.io/docs/understand-prisma/prisma-introduction-what-why-how-j9ff/))
- The NodeJS server is hosted on [heroku](https://www.heroku.com/) while the Prisma service
is hosted on [Prisma Cloud](https://www.prisma.io/cloud)

## Demo
- [GraphQL Playground](https://lit-headland-50897.herokuapp.com/):
  Exposes the 1 query and 2 mutations described above.
- [Prisma GraphQL Playground](https://movies-app-a419d0b1e5.herokuapp.com/graphql-movies-app-service/prod):
  Contains the Prisma implementation which exposes more queries and mutations for the GraphQL schema of this project. 

## Development Setup
*The requirements and instructions described below have the purspose to guide you in case
you want to run this project locally on your machine. Please view the [Demo](#demo) section
if you only need to explore the implemented app instead of running it locally.*

### Requirements
- `Prisma CLI`: As mentioned before, the app uses Prisma to work with the database, bootstrap the DB schema,
bootstrap services (local and prod), securing requests generating authentication tokens and deploying new changes
to the DB (schema, tables, fields). Prisma CLI is used to perform all these operations.
This project was created using `prisma-cli@1.34.6`. Instructions on how to install
Prisma CLI can be found [here](https://www.prisma.io/docs/prisma-cli-and-configuration/using-the-prisma-cli-alx4/)
- `Docker`: Used by Prisma to make sure our local environment is ready to be deployed to any stage (staging/production).
See instalation instructions [here](https://docs.docker.com/install/)

### Running it locally
1. Clone this repo
2. Run `yarn` or `yarn install` to install libraries/dependencies 
3. Move to the `prisma` folder and start Docker running `docker-compose up -d`
    - There's no need to run this command this each time that you want
    to run the app. The only scenarios would be when connecting to a
    different DB or making changes to the `prisma/docker-compose.yml` file
([more details](https://www.prisma.io/docs/prisma-server/deployment-environments/docker-rty1/))
4. Run `yarn start:local` to start local/development GraphQL server
5. The local GrapQL Playground should be running at `http://localhost:4000/`

## Unit tests
Unit tests were created using these packages:
- [jest](https://jestjs.io/)
- [apollo-boost](https://www.npmjs.com/package/apollo-boost)
- [cross-fetch](https://github.com/lquixada/cross-fetch)
- [graphql](https://www.npmjs.com/package/graphql)

### Running unit tests
Unit tests of this project runs using an isolated instance of the Postgres server,
this means that there is a specific DB allocated for unit tests.
- Run `prisma deploy --env-file ../config/test.env` to configure the test instance of the DB
- Run `yarn test` to run all unit tests

## Making changes to the GraphQL schema
1. Make your changes on the `src/typeDefs/schema.graphql` file which is used by the GraphQL server
to return the data requested by the user. Changes goes from adding a new field to existing types
or adding new/custom types/input/scalar
2. Reflect the same changes on the `prisma/datamodel.prisma` file which is used by `prisma-cli` to
update the DB schema (tables/fields). Lets say that you added a new field `age` on the `User` type on
`src/typeDefs/schema.graphql`, you'll need to add that same field on `prisma/datamodel.prisma`
3. On your terminal, move to the `prisma` folder and run `prisma deploy --env-file ../config/local.env`
which will update the dev DB and will add a new field `age` on the `User` table
4. Always on the `prisma` folder, run `prisma generate` which will update the `src/generated/prisma.graphql`
file. This file is used by the `prisma` context variable that is shared across all the resolvers and which contains
all helpers to interact with the DB (you can see the `src/prisma.js` and `src/index.js` file for more details)
