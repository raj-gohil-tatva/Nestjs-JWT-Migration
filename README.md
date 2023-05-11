## Description

- The project demonstrates the use of [TypeORM](https://typeorm.io/) along with migration support.
- User encrypted password is stored in the database using [bcrypt](https://www.npmjs.com/package/bcrypt).
- [JWT](https://jwt.io/) is implemented for user authentication.
- Additional scripts are included for running or generating the migration.
- An `.env` file is provided for educational purposes only.

## Node Version

- `v18.16.0`

## Getting Started

1. Clone the repo: `git clone https://github.com/raj-gohil-tatva/nestjs-jwt-migration`
2. Install dependencies: `npm install`

## Running the App

- Development mode: `npm run start`
- Watch mode: `npm run start:dev`
- Production mode: `npm run start:prod`

## Testing

- Unit tests: `npm run test`
- End-to-end tests: `npm run test:e2e`
- Test coverage: `npm run test:cov`

## Additional Scripts for migration

- To load the TypeORM data source: `npm run typeorm`

- To automatically generate a migration based on the entity changes: `npm run migration:generate -- db/migrations/file_name_to_be_generated`

- To run the migration: `npm run migration:run`

- To revert the most recent migration: `npm run migration:revert`

## Useful Links

- JWT: https://docs.nestjs.com/security/authentication
- TypeORM: https://typeorm.io/
- Bcrypt: https://www.npmjs.com/package/bcrypt
