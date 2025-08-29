#!/usr/bin/env python3
"""
Setup script for E-commerce Backend
This script initializes the database with sample data
"""

import asyncio
from database import db_manager
from models import UserCreate, CategoryCreate, ProductCreate
from auth import get_password_hash
from datetime import datetime
from bson import ObjectId

async def setup_database():
    """Initialize database with sample data"""
    print("🚀 Setting up E-commerce Database...")
    
    try:
        # Connect to database
        db_manager.connect_to_database()
        db = db_manager.get_database()
        
        # Create collections if they don't exist
        collections = ["users", "categories", "products", "cart_items", "orders", "wishlist_items"]
        for collection in collections:
            if collection not in db.list_collection_names():
                db.create_collection(collection)
                print(f"✅ Created collection: {collection}")
        
        # Create admin user
        print("\n👤 Creating admin user...")
        admin_data = {
            "email": "admin@ecommerce.com",
            "username": "admin",
            "full_name": "System Administrator",
            "password": get_password_hash("admin123"),
            "role": "admin",
            "is_active": True,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        
        # Check if admin already exists
        existing_admin = db.users.find_one({"email": admin_data["email"]})
        if not existing_admin:
            result = db.users.insert_one(admin_data)
            print(f"✅ Admin user created with ID: {result.inserted_id}")
        else:
            print("✅ Admin user already exists")
        
        # Create sample categories
        print("\n📂 Creating sample categories...")
        categories = [
            {"name": "Electronics", "description": "Electronic devices and gadgets"},
            {"name": "Clothing", "description": "Fashion and apparel"},
            {"name": "Books", "description": "Books and publications"},
            {"name": "Home & Garden", "description": "Home improvement and garden supplies"},
            {"name": "Sports", "description": "Sports equipment and accessories"}
        ]
        
        category_ids = []
        for cat_data in categories:
            # Check if category already exists
            existing_cat = db.categories.find_one({"name": cat_data["name"]})
            if not existing_cat:
                cat_data["created_at"] = datetime.utcnow()
                cat_data["updated_at"] = datetime.utcnow()
                result = db.categories.insert_one(cat_data)
                category_ids.append(str(result.inserted_id))
                print(f"✅ Category created: {cat_data['name']}")
            else:
                category_ids.append(str(existing_cat["_id"]))
                print(f"✅ Category already exists: {cat_data['name']}")
        
        # Create sample products
        print("\n📦 Creating sample products...")
        products = [
            {
                "name": "Smartphone X",
                "description": "Latest smartphone with advanced features",
                "price": 699.99,
                "category_id": category_ids[0],  # Electronics
                "stock_quantity": 50,
                "image_url": "https://example.com/smartphone.jpg",
                "is_active": True
            },
            {
                "name": "Wireless Headphones",
                "description": "High-quality wireless headphones with noise cancellation",
                "price": 199.99,
                "category_id": category_ids[0],  # Electronics
                "stock_quantity": 100,
                "image_url": "https://example.com/headphones.jpg",
                "is_active": True
            },
            {
                "name": "Cotton T-Shirt",
                "description": "Comfortable cotton t-shirt in various colors",
                "price": 24.99,
                "category_id": category_ids[1],  # Clothing
                "stock_quantity": 200,
                "image_url": "https://example.com/tshirt.jpg",
                "is_active": True
            },
            {
                "name": "Programming Python Book",
                "description": "Comprehensive guide to Python programming",
                "price": 49.99,
                "category_id": category_ids[2],  # Books
                "stock_quantity": 75,
                "image_url": "https://example.com/python-book.jpg",
                "is_active": True
            },
            {
                "name": "Garden Tool Set",
                "description": "Complete set of essential garden tools",
                "price": 89.99,
                "category_id": category_ids[3],  # Home & Garden
                "stock_quantity": 30,
                "image_url": "https://example.com/garden-tools.jpg",
                "is_active": True
            },
            {
                "name": "Yoga Mat",
                "description": "Premium yoga mat for home workouts",
                "price": 39.99,
                "category_id": category_ids[4],  # Sports
                "stock_quantity": 60,
                "image_url": "https://example.com/yoga-mat.jpg",
                "is_active": True
            }
        ]
        
        for prod_data in products:
            # Check if product already exists
            existing_prod = db.products.find_one({"name": prod_data["name"]})
            if not existing_prod:
                prod_data["created_at"] = datetime.utcnow()
                prod_data["updated_at"] = datetime.utcnow()
                result = db.products.insert_one(prod_data)
                print(f"✅ Product created: {prod_data['name']} - ${prod_data['price']}")
            else:
                print(f"✅ Product already exists: {prod_data['name']}")
        
        # Create indexes for better performance
        print("\n🔍 Creating database indexes...")
        
        # User indexes
        db.users.create_index("email", unique=True)
        db.users.create_index("username", unique=True)
        print("✅ User indexes created")
        
        # Product indexes
        db.products.create_index("category_id")
        db.products.create_index("is_active")
        db.products.create_index([("name", "text"), ("description", "text")])
        print("✅ Product indexes created")
        
        # Order indexes
        db.orders.create_index("user_id")
        db.orders.create_index("status")
        print("✅ Order indexes created")
        
        # Cart and wishlist indexes
        db.cart_items.create_index([("user_id", 1), ("product_id", 1)])
        db.wishlist_items.create_index([("user_id", 1), ("product_id", 1)])
        print("✅ Cart and wishlist indexes created")
        
        print("\n🎉 Database setup completed successfully!")
        print("\n📋 Sample Data Summary:")
        print(f"   - Admin user: admin@ecommerce.com / admin123")
        print(f"   - Categories: {len(categories)}")
        print(f"   - Products: {len(products)}")
        print("\n🔐 Login Credentials:")
        print("   Email: admin@ecommerce.com")
        print("   Password: admin123")
        print("\n🚀 You can now start the API with: python main.py")
        
    except Exception as e:
        print(f"❌ Database setup failed: {e}")
        raise e
    finally:
        # Close database connection
        db_manager.close_database_connection()

if __name__ == "__main__":
    asyncio.run(setup_database())
