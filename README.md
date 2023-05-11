## Description

- The project demonstrates the use of [TypeORM](https://typeorm.io/) along with migration support.
- User encrypted password is stored in the database using [bcrypt](https://www.npmjs.com/package/bcrypt).
- [JWT](https://jwt.io/) is implemented for user authentication.
- Additional scripts are included for running or generating the migration.
- An `.env` file is provided for educational purposes only.

## Node Version

- `v18.16.0`

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Additional Scripts

```bash
# To load the TypeORM data source.
"typeorm": "npm run build && npx typeorm -d dist/config/typeORMdataSource.js"

# To automatically generated the migration based on the entity changes.
"migration:generate": "npm run typeorm -- migration:generate"
Usage Example: npm run migration:generate -- db/migrations/add-user-table

# To run the migration.
"migration:run": "npm run typeorm -- migration:run"

# TO undo or revert the most recent migration.
"migration:revert": "npm run typeorm -- migration:revert"
```

## Useful Links

- JWT: https://docs.nestjs.com/security/authentication
- TypeORM: https://typeorm.io/
- Bcrypt: https://www.npmjs.com/package/bcryp
