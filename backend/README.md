# E-commerce Backend API

A comprehensive REST API for an e-commerce platform built with FastAPI and MongoDB, featuring admin and user portals with full CRUD operations.

## 🚀 Features

- **User Authentication & Authorization**: JWT-based authentication with role-based access control
- **Admin Portal**: Complete management of users, products, categories, and orders
- **User Portal**: Shopping cart, wishlist, order management, and product browsing
- **Product Management**: CRUD operations for products with category support
- **Order System**: Complete order lifecycle management with status tracking
- **Shopping Cart**: Add, update, and remove items with quantity management
- **Wishlist**: Save products for later purchase
- **MongoDB Integration**: Robust database with proper indexing and relationships
- **API Documentation**: Auto-generated Swagger/OpenAPI documentation

## 🛠️ Tech Stack

- **Framework**: FastAPI (Python 3.8+)
- **Database**: MongoDB with PyMongo
- **Authentication**: JWT with Passlib
- **Validation**: Pydantic models
- **Documentation**: Auto-generated OpenAPI/Swagger docs
- **Testing**: Pytest with async support

## 📋 Prerequisites

- Python 3.8 or higher
- MongoDB Atlas account (or local MongoDB instance)
- pip package manager

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd python-webdev-major
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Environment Configuration
The application is configured to use the provided MongoDB connection string by default. You can override it by creating a `.env` file:

```env
MONGODB_URI=mongodb+srv://ankit:ankit@cluster0.kvppdtr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
DATABASE_NAME=ecommerce_db
JWT_SECRET_KEY=your-super-secret-jwt-key-change-this-in-production
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### 4. Run the Application
```bash
python main.py
```

The API will be available at:
- **API**: http://localhost:8000
- **Documentation**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 📚 API Endpoints

### Authentication (`/api/v1/auth`)
- `POST /register` - User registration
- `POST /login` - User login
- `GET /me` - Get current user info

### Admin Portal (`/api/v1/admin`)
- **User Management**:
  - `GET /users` - List all users
  - `GET /users/{user_id}` - Get specific user
  - `PUT /users/{user_id}` - Update user
  - `DELETE /users/{user_id}` - Delete user

- **Category Management**:
  - `POST /categories` - Create category
  - `GET /categories` - List all categories
  - `PUT /categories/{category_id}` - Update category
  - `DELETE /categories/{category_id}` - Delete category

- **Product Management**:
  - `POST /products` - Create product
  - `GET /products` - List all products
  - `PUT /products/{product_id}` - Update product
  - `DELETE /products/{product_id}` - Delete product

- **Order Management**:
  - `GET /orders` - List all orders
  - `PUT /orders/{order_id}` - Update order status

### Public Products (`/api/v1/products`)
- `GET /` - List products with filtering and pagination
- `GET /{product_id}` - Get specific product
- `GET /categories` - List all categories
- `GET /categories/{category_id}` - Get specific category

### Shopping Cart (`/api/v1/cart`)
- `GET /` - Get cart items
- `POST /` - Add item to cart
- `PUT /{item_id}` - Update cart item quantity
- `DELETE /{item_id}` - Remove item from cart
- `DELETE /` - Clear cart

### Orders (`/api/v1/orders`)
- `POST /` - Create new order
- `GET /` - Get user orders
- `GET /{order_id}` - Get specific order
- `PUT /{order_id}/cancel` - Cancel order

### Wishlist (`/api/v1/wishlist`)
- `GET /` - Get wishlist items
- `POST /` - Add item to wishlist
- `DELETE /{item_id}` - Remove item from wishlist
- `DELETE /` - Clear wishlist

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected endpoints:

1. **Register/Login** to get an access token
2. **Include the token** in the Authorization header:
   ```
   Authorization: Bearer <your-access-token>
   ```

### Role-Based Access Control
- **User Role**: Can access cart, orders, wishlist, and public products
- **Admin Role**: Can access all endpoints including admin management functions

## 🗄️ Database Schema

### Collections
- **users**: User accounts with role-based access
- **categories**: Product categories
- **products**: Product catalog with stock management
- **cart_items**: Shopping cart items
- **orders**: Order records with status tracking
- **wishlist_items**: User wishlists

### Key Relationships
- Products belong to Categories
- Cart items reference Products and Users
- Orders contain Cart items and reference Users
- Wishlist items reference Products and Users

## 🧪 Testing

Run the test suite:
```bash
pytest
```

## 📖 Usage Examples

### 1. User Registration
```bash
curl -X POST "http://localhost:8000/api/v1/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "username": "testuser",
    "full_name": "Test User",
    "password": "password123"
  }'
```

### 2. User Login
```bash
curl -X POST "http://localhost:8000/api/v1/auth/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=user@example.com&password=password123"
```

### 3. Create Product (Admin)
```bash
curl -X POST "http://localhost:8000/api/v1/admin/products" \
  -H "Authorization: Bearer <admin-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sample Product",
    "description": "A sample product description",
    "price": 29.99,
    "category_id": "<category-id>",
    "stock_quantity": 100
  }'
```

### 4. Add to Cart
```bash
curl -X POST "http://localhost:8000/api/v1/cart/" \
  -H "Authorization: Bearer <user-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "product_id": "<product-id>",
    "quantity": 2
  }'
```

## 🔧 Configuration

### MongoDB Connection
The application automatically connects to MongoDB Atlas using the provided connection string. Ensure your MongoDB cluster is accessible and the database user has appropriate permissions.

### JWT Configuration
- **Secret Key**: Change the default JWT secret key in production
- **Token Expiry**: Configure token expiration time (default: 30 minutes)
- **Algorithm**: Uses HS256 by default

### CORS Settings
CORS is configured to allow all origins by default. For production, restrict this to your frontend domain.

## 🚨 Security Considerations

- **JWT Secret**: Change the default JWT secret key
- **Password Hashing**: Uses bcrypt for secure password storage
- **Input Validation**: All inputs are validated using Pydantic models
- **Role-Based Access**: Admin endpoints are protected with role verification
- **Database Security**: Use MongoDB Atlas security features

## 📝 API Documentation

The API provides comprehensive documentation:
- **Swagger UI**: Interactive API documentation at `/docs`
- **ReDoc**: Alternative documentation format at `/redoc`
- **OpenAPI Schema**: Available at `/openapi.json`

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Verify MongoDB connection string
   - Check network connectivity
   - Ensure MongoDB Atlas IP whitelist includes your IP

2. **Authentication Errors**
   - Verify JWT token is valid and not expired
   - Check token format in Authorization header
   - Ensure user account is active

3. **Validation Errors**
   - Check request body format
   - Verify required fields are provided
   - Ensure data types match expected format

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the API documentation at `/docs`
- Review the troubleshooting section

---

**Happy Coding! 🚀**
