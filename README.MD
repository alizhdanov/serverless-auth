# Monorepo for alizhdanov.dev

conssits of:

- frontend
- backend
- serverless

## CI

Powered by [circleci](https://circleci.com/). The ci will check which projects were changed and will run jobs only for specifc project. Therefore, CI time will increase if you have changed only some project also it wouldn't do useless builds.

## Serverless

Serverless part based on [serverless framework](https://serverless.com/) and [AWS](https://aws.amazon.com) as a serverless provider. It's implementing basic REST API like authentication service, which then used by GraphQL server for generation of [JSON Web Tokens](https://jwt.io/). [DynamoDB](https://aws.amazon.com/dynamodb/) is used as database and each endpoint is [Lambda Function](https://aws.amazon.com/lambda/). Labda functions are tested with [JEST](https://jestjs.io/) testing framework.

The service is pretty basic for now and implementing only two endpoints:

- `singup` - user creation
- `login` - user authintecation and generation of JWT token

## GraphQL - [https://alizhdanov-gql.now.sh/](https://alizhdanov-gql.now.sh/)

GraphQL part written in [Typescript](https://www.typescriptlang.org/), based on [GraphQL yoga](https://github.com/prisma/graphql-yoga) server and daployed to [NOW](https://zeit.co/now).

The main idea behind it is to show capabilities of GraphQL. By combining different services in one place, and providing nice unify GraphQL API for frontnend. It was implemented by transforming and proxying REST services into GraphQL queries and mutations and by [schema stiching](https://www.apollographql.com/docs/graphql-tools/schema-stitching) third party GraphQL services.

### Services:

- Github - [Github V4 API](https://developer.github.com/v4/) is providing GraphQL API, so it is just merged with current GraphQL server by schema stitching. While stitched all needless queries and mutation were filtered out, and server providing to the client (frontend in our case) only that queries and mutations which needed by frontend. Which is showing all beauty of schema stitching approach and providing extra safety by not exposing needless data.

- Instagram - [Instagram API](https://www.instagram.com/developer/) providing us REST API which is good example, to show how it's possible to use some legacy services with GraphQL by proxying it. We can design schema as needed by our clients and under the hood still use REST API.

- Serverless - in serverless section was already mentioned that authentication service was implemented. It uses similar approach as Instagram

### Authentication and Permissions

JWT is used for authentication provided by authentication service. Public key is used to verify token . While [graphql-shield](https://github.com/maticzav/graphql-shield) is handling queries/mutation permissions. Giving ability to acess protected fields by only logged in users.

## Frontend [https://alizhdanov.dev/](https://alizhdanov.dev/)

Frontend part divided by two main sections Hero and SPA.

### Hero

Contains all contacts info and avatar. Basic html and css just so potential visitors will be able get instant result and to see all important information.

### SPA

This part is specifically done as a separate section. Because it'll be used to show all how GraphQL part can be implemented on backend and might be not interesting for people who wanna know more info about author.

**It's still under development and will be updated in future.**
