# 🛍️ E-Store Frontend

A modern, responsive React.js frontend for the E-commerce Backend API. Built with React 18, Tailwind CSS, and modern web technologies.

## ✨ Features

- **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **User Authentication**: Login/Register with JWT tokens
- **Product Browsing**: Browse products with filtering and search
- **Shopping Cart**: Add, update, and remove items
- **Wishlist**: Save products for later
- **Order Management**: View and track orders
- **Admin Dashboard**: Complete admin portal for managing the store
- **Responsive Design**: Works perfectly on all devices
- **Real-time Updates**: Live cart and wishlist updates

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with Hooks
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Notifications**: React Toastify
- **Build Tool**: Create React App

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm
- Backend API running (see main README)
- Modern web browser

### Installation

1. **Navigate to the frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## 🏗️ Project Structure

```
frontend/
├── public/                 # Static files
├── scripts/                # Utility scripts
│   └── set-env.sh         # Environment switching script
├── src/
│   ├── components/         # Reusable components
│   │   ├── Navbar.js      # Navigation bar
│   │   ├── Footer.js      # Footer component
│   │   └── ProtectedRoute.js # Auth protection
│   ├── contexts/          # React Context providers
│   │   ├── AuthContext.js # Authentication state
│   │   ├── CartContext.js # Shopping cart state
│   │   └── WishlistContext.js # Wishlist state
│   ├── pages/             # Page components
│   │   ├── Home.js        # Homepage
│   │   ├── Login.js       # Login page
│   │   ├── Register.js    # Registration page
│   │   ├── Products.js    # Product listing
│   │   ├── Cart.js        # Shopping cart
│   │   ├── Wishlist.js    # User wishlist
│   │   ├── Orders.js      # Order management
│   │   └── AdminDashboard.js # Admin portal
│   ├── config/            # Configuration files
│   │   └── api.js         # API configuration
│   ├── App.js             # Main app component
│   ├── index.js           # Entry point
│   └── index.css          # Global styles
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
└── README.md              # This file
```

## 🔐 Authentication

The frontend uses JWT tokens for authentication:

- **Login**: POST to `/api/v1/auth/login`
- **Register**: POST to `/api/v1/auth/register`
- **Protected Routes**: Automatically redirect to login if not authenticated
- **Admin Routes**: Additional role-based protection for admin users

### Demo Credentials

- **Admin User:**

  - Email: `admin@ecommerce.com`
  - Password: `admin123`

- **Regular User:**
  - Email: `user@example.com`
  - Password: `password123`

## 🛒 Shopping Features

### Product Browsing

- View all products with pagination
- Filter by category
- Search by name/description
- Price range filtering

### Shopping Cart

- Add products to cart
- Update quantities
- Remove items
- View cart total

### Wishlist

- Save products for later
- Quick add/remove
- Sync across sessions

### Orders

- Place orders from cart
- View order history
- Track order status
- Cancel pending orders

## 👨‍💼 Admin Features

Admin users have access to:

- **User Management**: View, edit, delete users
- **Product Management**: CRUD operations for products
- **Category Management**: Manage product categories
- **Order Management**: Update order statuses
- **Analytics**: View store statistics

## 🎨 UI Components

### Design System

- **Colors**: Primary (blue), Secondary (gray), Success (green), Error (red)
- **Typography**: Inter font family with consistent sizing
- **Spacing**: Tailwind's spacing scale
- **Shadows**: Subtle shadows for depth
- **Transitions**: Smooth hover and focus effects

### Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interactions
- Optimized for all screen sizes

## 🔧 Configuration

### API Configuration

The frontend automatically detects the environment and uses the appropriate API URL:

- **Development**: `http://localhost:8000` (for local development)
- **Production**: `https://python-major-production.up.railway.app` (for production deployment)

The configuration is handled in `src/config/api.js` and can be overridden with environment variables.

### Environment Variables

The frontend is configured to automatically use the correct API URL based on the environment:

- **Development**: Uses `http://localhost:8000` (via proxy)
- **Production**: Uses `https://python-major-production.up.railway.app`

#### Quick Environment Switching

Use the provided script to quickly switch between environments:

```bash
# Switch to development mode
./scripts/set-env.sh dev

# Switch to production mode
./scripts/set-env.sh prod

# Check current configuration
./scripts/set-env.sh
```

#### Manual Configuration

You can also manually override this by setting environment variables:

```bash
# For development
REACT_APP_ENV=development

# For production
REACT_APP_ENV=production
REACT_APP_API_BASE_URL=https://python-major-production.up.railway.app
```

The proxy configuration in `package.json` is set to the production URL for production builds.

### Tailwind CSS

Custom configuration with:

- Primary color palette
- Custom font family (Inter)
- Responsive breakpoints
- Component-specific utilities

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🧪 Testing

Run the test suite:

```bash
npm test
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Static Hosting

The `build` folder contains optimized production files that can be deployed to:

- Netlify
- Vercel
- AWS S3
- GitHub Pages
- Any static hosting service

**Note**: For production deployment, the frontend will automatically use the production API URL (`https://python-major-production.up.railway.app`). Make sure your backend is accessible at this URL.

## 🔌 API Integration

The frontend integrates with the FastAPI backend through:

- **Base URL**: `/api/v1`
- **Authentication**: JWT Bearer tokens
- **Error Handling**: Consistent error responses
- **Loading States**: User feedback during API calls

## 🎯 Key Features Implementation

### State Management

- **Context API**: Global state for auth, cart, and wishlist
- **Local Storage**: Persist user preferences and tokens
- **Real-time Updates**: Immediate UI updates on state changes

### Performance

- **Code Splitting**: Route-based code splitting
- **Lazy Loading**: Components loaded on demand
- **Optimized Images**: Responsive image handling
- **Minimal Re-renders**: Efficient state updates

### Accessibility

- **Semantic HTML**: Proper heading structure
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard support
- **Color Contrast**: WCAG compliant colors

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Failed**

   - Ensure backend is running on the correct URL
   - Check CORS configuration
   - Verify proxy settings in package.json
   - Check environment variables for API configuration

2. **Authentication Issues**

   - Clear browser storage
   - Check JWT token expiration
   - Verify backend auth endpoints

3. **Build Errors**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify all dependencies are installed

### Development Tips

- Use React Developer Tools for debugging
- Check browser console for errors
- Monitor network requests in DevTools
- Use Tailwind CSS IntelliSense extension

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Check the troubleshooting section
- Review the API documentation
- Create an issue in the repository

---

**Happy Coding! 🚀**

Built with ❤️ using React and Tailwind CSS
