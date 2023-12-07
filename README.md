## Usage

### Running the Node.js Application

1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.

To run the Node.js application, follow these steps:

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the index file:
   ```bash
   node index.js
   ```
3. trying POST, DELETE, PUT Requests:
   ```bash
   node try.js
   ```
