# Database Setup Guide

## Option 1: Using Docker (Recommended)

1. Make sure Docker is installed on your system
2. Run the PostgreSQL container:
```bash
docker-compose up -d postgres
```

3. The database will be available at `localhost:5432` with the following credentials:
   - Database: `blog_db`
   - Username: `postgres`
   - Password: `password`

## Option 2: Manual PostgreSQL Setup

1. Install PostgreSQL on your system
2. Create a database:
```sql
CREATE DATABASE blog_db;
```

3. Update the `.env` file with your database credentials

## Verifying Database Connection

Once the database is running, you can start the application:
```bash
npm run start:dev
```

The application will automatically create the required tables on first run (thanks to TypeORM synchronization).

## Important Notes

- The application uses TypeORM with `synchronize: true` for development
- In production, you should use migrations instead of synchronization
- Make sure to change the default passwords in production