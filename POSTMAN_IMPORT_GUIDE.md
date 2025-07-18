# 📬 Postman Collection Import Guide

## 🎯 Quick Start

### Step 1: Import the Collection

1. **Open Postman** (Desktop app or web version)
2. **Click "Import"** button in the top-left corner
3. **Choose "Upload Files"** tab
4. **Select** the `Blog-API-Postman-Collection.json` file from your project folder
5. **Click "Import"** to import the collection

### Alternative Import Methods:

#### Method 1: Drag & Drop
- Simply drag the `Blog-API-Postman-Collection.json` file into Postman window

#### Method 2: Copy & Paste
- Open the JSON file in a text editor
- Copy all the content
- In Postman, click "Import" → "Raw text" → Paste the content → "Continue"

## 🔧 Collection Features

### ✅ What's Included:
- **28 API Endpoints** organized in 5 folders
- **Automatic Authentication** handling with JWT tokens
- **Environment Variables** for easy configuration
- **Test Scripts** that automatically save tokens and IDs
- **Pre-filled Request Bodies** with sample data
- **Proper Authorization Headers** for protected endpoints

### 📁 Collection Structure:
```
Blog API - NestJS/
├── Authentication/
│   ├── Register User
│   ├── Login User
│   └── Get Profile
├── Users/
│   ├── Get All Users
│   ├── Get User by ID
│   ├── Update User
│   └── Delete User
├── Blogs/
│   ├── Get All Blogs
│   ├── Create Blog
│   ├── Get Blog by ID
│   ├── Get Blogs by Author
│   ├── Update Blog
│   └── Delete Blog
├── Likes/
│   ├── Like Blog Post
│   ├── Unlike Blog Post
│   ├── Get Blog Likes
│   ├── Get Likes Count
│   ├── Check if User Liked Blog
│   └── Get User's Liked Blogs
└── Comments/
    ├── Create Comment
    ├── Get All Comments
    ├── Get Comment by ID
    ├── Get Comments for Blog
    ├── Get Comments Count
    ├── Get User's Comments
    ├── Update Comment
    └── Delete Comment
```

## 🚀 How to Use the Collection

### Step 1: Set Up Your Environment
1. Make sure your NestJS server is running on `http://localhost:3000`
2. Ensure PostgreSQL database is running
3. The collection is pre-configured for `localhost:3000`

### Step 2: Test the API Flow

#### 🔐 Authentication Flow:
1. **Register User**: Run "Register User" request
   - ✅ Automatically saves JWT token and user ID
   - ✅ Pre-filled with sample user data
   
2. **Login User**: Run "Login User" request (alternative to registration)
   - ✅ Automatically saves JWT token and user ID
   - ✅ Use same credentials as registration

3. **Get Profile**: Test authentication with "Get Profile" request
   - ✅ Uses automatically saved token

#### 📝 Blog Operations:
1. **Create Blog**: Run "Create Blog" request
   - ✅ Automatically saves blog ID for other requests
   - ✅ Requires authentication (token auto-included)

2. **Get All Blogs**: View all published blogs
   - ✅ No authentication required

3. **Get Blog by ID**: View specific blog
   - ✅ Uses automatically saved blog ID

#### 👍 Likes & Comments:
1. **Like Blog**: Run "Like Blog Post" request
   - ✅ Uses saved blog ID and auth token

2. **Create Comment**: Run "Create Comment" request
   - ✅ Automatically saves comment ID
   - ✅ Uses saved blog ID and auth token

3. **Test Other Operations**: All other endpoints work similarly

## 🔧 Collection Variables

The collection uses these variables that are automatically managed:

| Variable | Description | Auto-Set By |
|----------|-------------|-------------|
| `baseUrl` | API base URL | Pre-configured |
| `authToken` | JWT token | Register/Login requests |
| `userId` | Current user ID | Register/Login requests |
| `blogId` | Created blog ID | Create Blog request |
| `commentId` | Created comment ID | Create Comment request |

## 📝 Customization

### Change Base URL:
1. Click on the collection name
2. Go to "Variables" tab
3. Update `baseUrl` value (e.g., `https://your-api.com`)

### Manual Token Setup:
If you have an existing token:
1. Click on collection → "Variables" tab
2. Set `authToken` to your JWT token
3. Set `userId` to your user ID

## 🧪 Testing Features

### Automatic Tests:
- **Registration/Login**: Validates response and saves tokens
- **Blog Creation**: Validates response and saves blog ID
- **Comment Creation**: Validates response and saves comment ID

### Manual Testing:
- All requests have proper headers and body data
- Error responses are properly handled
- Success responses show all relevant data

## 🔄 Recommended Testing Flow

### Complete API Test Sequence:
1. **Register User** → Auto-saves token & user ID
2. **Create Blog** → Auto-saves blog ID
3. **Get All Blogs** → See your blog in the list
4. **Like Blog Post** → Like your own blog
5. **Create Comment** → Comment on your blog
6. **Get Comments for Blog** → See your comment
7. **Update Comment** → Edit your comment
8. **Get User's Liked Blogs** → See your liked blogs
9. **Unlike Blog Post** → Remove your like
10. **Delete Comment** → Remove your comment

## 🔍 Troubleshooting

### Common Issues:

#### 1. "Unauthorized" Errors:
- **Solution**: Run "Register User" or "Login User" first
- **Check**: Collection variables have `authToken` set

#### 2. "Blog not found" Errors:
- **Solution**: Run "Create Blog" first
- **Check**: Collection variables have `blogId` set

#### 3. "Comment not found" Errors:
- **Solution**: Run "Create Comment" first
- **Check**: Collection variables have `commentId` set

#### 4. Server Connection Issues:
- **Check**: NestJS server is running on port 3000
- **Check**: Database is running and connected
- **Update**: `baseUrl` in collection variables if needed

## 💡 Pro Tips

1. **Use Test Scripts**: The collection automatically manages tokens and IDs
2. **Check Console**: View test results in Postman console
3. **Save Responses**: Use Postman's save response feature for reference
4. **Environment Setup**: Create different environments for dev/staging/prod
5. **Run Collection**: Use Postman's collection runner for automated testing

## 📊 Expected Response Examples

### Successful Registration:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-here",
    "email": "john@example.com",
    "username": "johndoe"
  }
}
```

### Blog with Likes & Comments:
```json
{
  "id": "blog-uuid",
  "title": "My First Blog Post",
  "content": "Blog content...",
  "likes": [...],
  "comments": [...],
  "author": {
    "id": "user-uuid",
    "username": "johndoe"
  }
}
```

## 🎉 You're Ready to Test!

The Postman collection is now ready to use. Start with the "Register User" request and follow the recommended testing flow. All authentication and ID management is handled automatically!

**Happy Testing! 🚀**