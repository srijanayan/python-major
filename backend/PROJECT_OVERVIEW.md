# 🛍️ E-Store: Complete E-commerce Platform

A full-stack e-commerce platform built with **FastAPI (Python)** backend and **React.js** frontend, featuring a complete admin portal and user management system.

## 🌟 Project Highlights

- **Full-Stack Solution**: Complete backend API + modern React frontend
- **MongoDB Integration**: Robust database with proper indexing
- **JWT Authentication**: Secure user authentication and authorization
- **Admin Portal**: Complete store management system
- **User Portal**: Shopping cart, wishlist, and order management
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Updates**: Live cart and wishlist synchronization
- **Production Ready**: Proper error handling, validation, and security

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React.js      │    │   FastAPI       │    │   MongoDB       │
│   Frontend      │◄──►│   Backend       │◄──►│   Database      │
│   (Port 3000)   │    │   (Port 8000)   │    │   (Atlas)       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Quick Start Guide

### 1. Start the Backend API

```bash
# Terminal 1: Start the FastAPI backend
python3 main.py
```

**Backend will be available at:** http://localhost:8000
**API Documentation:** http://localhost:8000/docs

### 2. Start the React Frontend

```bash
# Terminal 2: Start the React frontend
./start_frontend.sh
```

**Frontend will be available at:** http://localhost:3000

### 3. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🔐 Demo Credentials

### Admin User (Full Access)

- **Email**: `admin@ecommerce.com`
- **Password**: `admin123`
- **Access**: All features + Admin portal

### Regular User (Limited Access)

- **Email**: `user@example.com`
- **Password**: `password123`
- **Access**: Shopping features only

## 📱 Features Demo

### 🏠 Homepage

- Hero section with call-to-action
- Featured products showcase
- Category browsing
- Responsive design

### 🛍️ Shopping Experience

- Browse products with filters
- Add items to cart
- Save products to wishlist
- Place orders

### 👨‍💼 Admin Portal

- User management
- Product management
- Category management
- Order tracking
- Store analytics

### 🔐 Authentication

- User registration
- Secure login
- JWT token management
- Role-based access control

## 🛠️ Technology Stack

### Backend (FastAPI)

- **Framework**: FastAPI with Python 3.8+
- **Database**: MongoDB with PyMongo
- **Authentication**: JWT with Passlib
- **Validation**: Pydantic models
- **Documentation**: Auto-generated OpenAPI/Swagger

### Frontend (React.js)

- **Framework**: React 18 with Hooks
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM v6
- **State Management**: React Context API
- **HTTP Client**: Axios
- **UI Components**: Custom components + React Icons

### Database (MongoDB)

- **Cloud**: MongoDB Atlas
- **Collections**: users, products, categories, orders, cart_items, wishlist_items
- **Indexes**: Optimized for performance
- **Relationships**: Proper document references

## 📊 API Endpoints

### Public Endpoints

- `GET /` - API information
- `GET /health` - Health check
- `GET /api/v1/products/` - Browse products
- `GET /api/v1/products/categories` - List categories

### Authentication

- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/me` - Get current user

### User Features (Protected)

- `GET /api/v1/cart/` - View cart
- `POST /api/v1/cart/` - Add to cart
- `GET /api/v1/wishlist/` - View wishlist
- `POST /api/v1/orders/` - Place order

### Admin Features (Admin Only)

- `GET /api/v1/admin/users` - Manage users
- `POST /api/v1/admin/products` - Create products
- `PUT /api/v1/admin/orders/{id}` - Update orders

## 🎯 Key Features

### 🔐 Security

- JWT token authentication
- Password hashing with bcrypt
- Role-based access control
- Input validation and sanitization
- CORS configuration

### 📱 User Experience

- Responsive design for all devices
- Real-time cart updates
- Smooth animations and transitions
- Intuitive navigation
- Loading states and error handling

### 🚀 Performance

- Database indexing for fast queries
- Efficient state management
- Optimized API responses
- Lazy loading of components
- Minimal re-renders

### 🛠️ Developer Experience

- Comprehensive API documentation
- Clear project structure
- Easy setup and deployment
- Extensive error handling
- Testing support

## 📁 Project Structure

```
python-webdev-major/
├── 📁 Backend (FastAPI)
│   ├── main.py              # Main application
│   ├── config.py            # Configuration settings
│   ├── database.py          # Database connection
│   ├── models.py            # Pydantic models
│   ├── auth.py              # Authentication logic
│   ├── routers/             # API route handlers
│   ├── setup.py             # Database initialization
│   └── requirements.txt     # Python dependencies
│
├── 📁 Frontend (React.js)
│   ├── public/              # Static files
│   ├── src/                 # Source code
│   │   ├── components/      # Reusable components
│   │   ├── contexts/        # State management
│   │   ├── pages/           # Page components
│   │   ├── App.js           # Main app
│   │   └── index.js         # Entry point
│   ├── package.json         # Node.js dependencies
│   └── tailwind.config.js   # CSS configuration
│
├── README.md                 # Main documentation
├── PROJECT_OVERVIEW.md       # This file
└── start_frontend.sh         # Frontend startup script
```

## 🚀 Deployment Options

### Backend Deployment

- **Heroku**: Easy deployment with Procfile
- **AWS**: EC2, Lambda, or ECS
- **Google Cloud**: App Engine or Cloud Run
- **Docker**: Containerized deployment

### Frontend Deployment

- **Netlify**: Automatic deployment from Git
- **Vercel**: Optimized for React apps
- **AWS S3**: Static website hosting
- **GitHub Pages**: Free hosting for open source

### Database

- **MongoDB Atlas**: Cloud-hosted MongoDB
- **Self-hosted**: MongoDB on your server
- **Other clouds**: AWS DocumentDB, Azure Cosmos DB

## 🧪 Testing

### Backend Testing

```bash
# Run tests
pytest

# Test specific endpoints
python3 test_api.py
```

### Frontend Testing

```bash
cd frontend
npm test
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file for custom configuration:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
DATABASE_NAME=ecommerce_db
```

### Frontend Configuration

The frontend automatically proxies to the backend:

```json
{
  "proxy": "http://localhost:8000"
}
```

## 📈 Monitoring & Analytics

### Backend Monitoring

- Health check endpoints
- Error logging and tracking
- Performance metrics
- Database connection monitoring

### Frontend Analytics

- User interaction tracking
- Performance monitoring
- Error boundary implementation
- Loading time optimization

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Test thoroughly**
5. **Submit a pull request**

## 📚 Learning Resources

### FastAPI

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [FastAPI Tutorial](https://fastapi.tiangolo.com/tutorial/)

### React.js

- [React Documentation](https://reactjs.org/)
- [React Hooks Guide](https://reactjs.org/docs/hooks-intro.html)

### MongoDB

- [MongoDB Documentation](https://docs.mongodb.com/)
- [PyMongo Tutorial](https://pymongo.readthedocs.io/)

### Tailwind CSS

- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Tailwind UI Components](https://tailwindui.com/)

## 🆘 Support & Troubleshooting

### Common Issues

1. **Backend won't start**

   - Check MongoDB connection
   - Verify Python dependencies
   - Check port availability

2. **Frontend won't start**

   - Ensure Node.js is installed
   - Check npm dependencies
   - Verify port 3000 is free

3. **API connection failed**
   - Ensure backend is running
   - Check CORS configuration
   - Verify proxy settings

### Getting Help

- Check the troubleshooting sections in READMEs
- Review API documentation at `/docs`
- Check browser console for errors
- Monitor backend logs for issues

## 🎉 What You've Built

Congratulations! You now have a **complete, production-ready e-commerce platform** that includes:

✅ **Backend API** with full CRUD operations  
✅ **User authentication** and authorization  
✅ **Admin portal** for store management  
✅ **Shopping cart** and wishlist functionality  
✅ **Order management** system  
✅ **Modern React frontend** with responsive design  
✅ **MongoDB database** with proper indexing  
✅ **Comprehensive documentation** and testing  
✅ **Deployment-ready** configuration

This is a **full-stack application** that demonstrates modern web development practices and can serve as a foundation for real e-commerce projects!

---

**Happy Coding! 🚀**

Built with ❤️ using FastAPI, React, and MongoDB
