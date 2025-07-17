# Blog API - NestJS

A RESTful blog API built with NestJS, TypeORM, and PostgreSQL featuring user authentication and authorization.

## Features

- **User Management**: User registration, login, and profile management
- **Blog CRUD Operations**: Create, read, update, and delete blog posts
- **Authentication**: JWT-based authentication system
- **Authorization**: Users can only edit/delete their own blogs
- **Database**: PostgreSQL with TypeORM
- **Validation**: Input validation using class-validator
- **Security**: Password hashing with bcrypt

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=password
DATABASE_NAME=blog_db
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRATION=7d
PORT=3000
```

4. Make sure PostgreSQL is running and create the database:
```sql
CREATE DATABASE blog_db;
```

5. Start the application:
```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## API Endpoints

### Authentication

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "johndoe",
  "password": "password123"
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Get Profile (Protected)
```http
GET /auth/profile
Authorization: Bearer <your-jwt-token>
```

### Users

#### Get All Users
```http
GET /users
```

#### Get User by ID
```http
GET /users/:id
```

#### Update User (Protected - Own Profile Only)
```http
PATCH /users/:id
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "email": "newemail@example.com",
  "username": "newusername"
}
```

#### Delete User (Protected - Own Profile Only)
```http
DELETE /users/:id
Authorization: Bearer <your-jwt-token>
```

### Blogs

#### Get All Published Blogs
```http
GET /blogs
```

#### Get Blog by ID
```http
GET /blogs/:id
```

#### Create Blog (Protected)
```http
POST /blogs
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "title": "My First Blog Post",
  "content": "This is the content of my blog post...",
  "description": "A brief description of the blog post",
  "isPublished": true
}
```

#### Get Blogs by Author (Protected)
```http
GET /blogs/author/:authorId
Authorization: Bearer <your-jwt-token>
```

#### Update Blog (Protected - Author Only)
```http
PATCH /blogs/:id
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "title": "Updated Blog Title",
  "content": "Updated content...",
  "isPublished": false
}
```

#### Delete Blog (Protected - Author Only)
```http
DELETE /blogs/:id
Authorization: Bearer <your-jwt-token>
```

## Database Schema

### Users Table
- `id` (UUID, Primary Key)
- `email` (String, Unique)
- `username` (String)
- `password` (String, Hashed)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

### Blogs Table
- `id` (UUID, Primary Key)
- `title` (String)
- `content` (Text)
- `description` (String, Optional)
- `isPublished` (Boolean, Default: true)
- `authorId` (UUID, Foreign Key to Users)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

## Authentication & Authorization

- **JWT Tokens**: Used for authentication
- **Protected Routes**: Require valid JWT token in Authorization header
- **Blog Authorization**: Users can only edit/delete their own blogs
- **User Authorization**: Users can only update/delete their own profiles

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (duplicate email/username)
- `500` - Internal Server Error

## Security Features

- Password hashing with bcrypt
- JWT token expiration
- Input validation and sanitization
- SQL injection prevention through TypeORM
- CORS enabled for cross-origin requests

## Development

```bash
# Start in development mode
npm run start:dev

# Build the application
npm run build

# Run tests
npm run test

# Run linting
npm run lint
```

## Production Considerations

1. Change `JWT_SECRET` to a strong, unique secret
2. Set `synchronize: false` in TypeORM configuration
3. Use database migrations instead of synchronize
4. Set up proper logging
5. Use environment-specific configuration
6. Set up proper CORS configuration
7. Use HTTPS in production
8. Set up rate limiting
9. Use a process manager like PM2
