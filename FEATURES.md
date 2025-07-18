# Blog API Features

## ✅ Implemented Features

### 🔐 Authentication & Authorization
- **JWT-based Authentication**: Secure token-based authentication system
- **User Registration**: Create new user accounts with email and username
- **User Login**: Authenticate users and receive JWT tokens
- **Protected Routes**: Secure endpoints requiring valid JWT tokens
- **Role-based Access**: Users can only modify their own content

### 👥 User Management
- **User Registration**: Create new accounts with validation
- **User Profile**: View user profiles and information
- **Profile Updates**: Users can update their own profiles
- **User Deletion**: Users can delete their own accounts
- **Password Security**: Bcrypt hashing for password protection

### 📝 Blog Management
- **Create Blogs**: Authenticated users can create blog posts
- **Read Blogs**: Anyone can read published blog posts
- **Update Blogs**: Authors can edit their own blog posts
- **Delete Blogs**: Authors can delete their own blog posts
- **Draft/Published**: Control blog visibility with publication status
- **Author Information**: Blogs include author details

### 👍 Likes System
- **Like Posts**: Users can like any published blog post
- **Unlike Posts**: Users can remove their likes
- **Like Status**: Check if a user has liked a specific blog
- **Likes Count**: Get total number of likes for a blog
- **User Likes**: View all blogs a user has liked
- **Duplicate Prevention**: Users cannot like the same blog twice
- **Self-Liking**: Users can like their own blog posts

### 💬 Comments System
- **Create Comments**: Users can comment on any published blog
- **Read Comments**: Anyone can view comments on blogs
- **Update Comments**: Users can edit their own comments
- **Delete Comments**: Users can delete their own comments
- **Comments Count**: Get total number of comments for a blog
- **User Comments**: View all comments by a specific user
- **Blog Comments**: View all comments for a specific blog
- **Self-Commenting**: Users can comment on their own blogs

### 🛡️ Security Features
- **Input Validation**: Comprehensive validation using class-validator
- **SQL Injection Protection**: TypeORM prevents SQL injection attacks
- **Password Hashing**: Secure password storage with bcrypt
- **JWT Expiration**: Tokens have configurable expiration times
- **CORS Support**: Cross-origin resource sharing enabled
- **Authorization Guards**: Protect sensitive operations

### 🗄️ Database Features
- **PostgreSQL**: Robust relational database
- **TypeORM**: Modern ORM with TypeScript support
- **Entity Relationships**: Proper foreign key relationships
- **Unique Constraints**: Prevent duplicate likes and users
- **Cascade Deletes**: Automatically clean up related data
- **Timestamps**: Automatic created/updated timestamps

## 🔗 Entity Relationships

### User Entity
- Has many blogs (one-to-many)
- Has many likes (one-to-many)
- Has many comments (one-to-many)

### Blog Entity
- Belongs to one user/author (many-to-one)
- Has many likes (one-to-many)
- Has many comments (one-to-many)

### Like Entity
- Belongs to one user (many-to-one)
- Belongs to one blog (many-to-one)
- Unique constraint on (userId, blogId)

### Comment Entity
- Belongs to one user (many-to-one)
- Belongs to one blog (many-to-one)
- Can be updated by the comment author

## 🚀 API Endpoints Summary

### Authentication (3 endpoints)
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/profile` - Get current user profile

### Users (5 endpoints)
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create user
- `PATCH /users/:id` - Update user (own profile only)
- `DELETE /users/:id` - Delete user (own profile only)

### Blogs (6 endpoints)
- `GET /blogs` - Get all published blogs
- `GET /blogs/:id` - Get blog by ID
- `POST /blogs` - Create blog (protected)
- `GET /blogs/author/:authorId` - Get blogs by author
- `PATCH /blogs/:id` - Update blog (author only)
- `DELETE /blogs/:id` - Delete blog (author only)

### Likes (6 endpoints)
- `POST /likes` - Like a blog post (protected)
- `DELETE /likes/blog/:blogId` - Unlike a blog post (protected)
- `GET /likes/blog/:blogId` - Get likes for a blog
- `GET /likes/blog/:blogId/count` - Get likes count
- `GET /likes/blog/:blogId/status` - Check if user liked blog (protected)
- `GET /likes/user/my-likes` - Get user's liked blogs (protected)

### Comments (8 endpoints)
- `POST /comments` - Create comment (protected)
- `GET /comments` - Get all comments
- `GET /comments/:id` - Get comment by ID
- `GET /comments/blog/:blogId` - Get comments for a blog
- `GET /comments/blog/:blogId/count` - Get comments count
- `GET /comments/user/my-comments` - Get user's comments (protected)
- `PATCH /comments/:id` - Update comment (author only)
- `DELETE /comments/:id` - Delete comment (author only)

## 📊 Total: 28 API Endpoints

## 🎯 Key Features Highlights

1. **Complete CRUD Operations**: Full Create, Read, Update, Delete for all entities
2. **Social Features**: Likes and comments make it a social blogging platform
3. **Security First**: Comprehensive authentication and authorization
4. **Scalable Architecture**: Modular NestJS structure with proper separation of concerns
5. **Type Safety**: Full TypeScript implementation with proper typing
6. **Database Integrity**: Proper relationships and constraints
7. **Input Validation**: Comprehensive validation on all inputs
8. **Error Handling**: Proper HTTP status codes and error messages
9. **Documentation**: Comprehensive API documentation and examples
10. **Development Ready**: Easy setup with Docker support for database

## 🔧 Technical Stack

- **Framework**: NestJS (Node.js)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: class-validator
- **Password Hashing**: bcryptjs
- **Architecture**: Modular, RESTful API

The blog API is now a complete, production-ready social blogging platform with all essential features implemented!