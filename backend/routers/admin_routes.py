from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from database import db_manager
from models import (
    User, UserUpdate, Product, ProductCreate, ProductUpdate,
    Category, CategoryCreate, CategoryUpdate, Order, OrderUpdate
)
from auth import get_current_admin_user
from datetime import datetime
from bson import ObjectId

router = APIRouter(prefix="/admin", tags=["Admin"])

# User Management
@router.get("/users", response_model=List[User])
async def get_all_users(current_user: User = Depends(get_current_admin_user)):
    """Get all users (admin only)."""
    db = db_manager.get_database()
    users = []
    for user_data in db.users.find():
        user_data["id"] = str(user_data["_id"])
        del user_data["_id"]
        del user_data["password"]
        users.append(User(**user_data))
    return users

@router.get("/users/{user_id}", response_model=User)
async def get_user(user_id: str, current_user: User = Depends(get_current_admin_user)):
    """Get a specific user by ID (admin only)."""
    db = db_manager.get_database()
    user_data = db.users.find_one({"_id": ObjectId(user_id)})
    if not user_data:
        raise HTTPException(status_code=404, detail="User not found")
    
    user_data["id"] = str(user_data["_id"])
    del user_data["_id"]
    del user_data["password"]
    return User(**user_data)

@router.put("/users/{user_id}", response_model=User)
async def update_user(
    user_id: str, 
    user_update: UserUpdate, 
    current_user: User = Depends(get_current_admin_user)
):
    """Update a user (admin only)."""
    db = db_manager.get_database()
    
    update_data = user_update.dict(exclude_unset=True)
    if update_data:
        update_data["updated_at"] = datetime.utcnow()
        if "password" in update_data:
            from auth import get_password_hash
            update_data["password"] = get_password_hash(update_data["password"])
    
    result = db.users.update_one(
        {"_id": ObjectId(user_id)}, {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Return updated user
    user_data = db.users.find_one({"_id": ObjectId(user_id)})
    user_data["id"] = str(user_data["_id"])
    del user_data["_id"]
    del user_data["password"]
    return User(**user_data)

@router.delete("/users/{user_id}")
async def delete_user(user_id: str, current_user: User = Depends(get_current_admin_user)):
    """Delete a user (admin only)."""
    db = db_manager.get_database()
    result = db.users.delete_one({"_id": ObjectId(user_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {"message": "User deleted successfully"}

# Category Management
@router.post("/categories", response_model=Category, status_code=status.HTTP_201_CREATED)
async def create_category(
    category: CategoryCreate, 
    current_user: User = Depends(get_current_admin_user)
):
    """Create a new category (admin only)."""
    db = db_manager.get_database()
    
    category_data = category.dict()
    category_data["created_at"] = datetime.utcnow()
    category_data["updated_at"] = datetime.utcnow()
    
    result = db.categories.insert_one(category_data)
    category_data["id"] = str(result.inserted_id)
    
    return Category(**category_data)

@router.get("/categories", response_model=List[Category])
async def get_all_categories(current_user: User = Depends(get_current_admin_user)):
    """Get all categories (admin only)."""
    db = db_manager.get_database()
    categories = []
    for category_data in db.categories.find():
        category_data["id"] = str(category_data["_id"])
        del category_data["_id"]
        categories.append(Category(**category_data))
    return categories

@router.put("/categories/{category_id}", response_model=Category)
async def update_category(
    category_id: str,
    category_update: CategoryUpdate,
    current_user: User = Depends(get_current_admin_user)
):
    """Update a category (admin only)."""
    db = db_manager.get_database()
    
    update_data = category_update.dict(exclude_unset=True)
    if update_data:
        update_data["updated_at"] = datetime.utcnow()
    
    result = db.categories.update_one(
        {"_id": ObjectId(category_id)}, {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Category not found")
    
    category_data = db.categories.find_one({"_id": ObjectId(category_id)})
    category_data["id"] = str(category_data["_id"])
    del category_data["_id"]
    return Category(**category_data)

@router.delete("/categories/{category_id}")
async def delete_category(category_id: str, current_user: User = Depends(get_current_admin_user)):
    """Delete a category (admin only)."""
    db = db_manager.get_database()
    
    # Check if category is used by any products
    if db.products.find_one({"category_id": category_id}):
        raise HTTPException(
            status_code=400, 
            detail="Cannot delete category that has products"
        )
    
    result = db.categories.delete_one({"_id": ObjectId(category_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Category not found")
    
    return {"message": "Category deleted successfully"}

# Product Management
@router.post("/products", response_model=Product, status_code=status.HTTP_201_CREATED)
async def create_product(
    product: ProductCreate,
    current_user: User = Depends(get_current_admin_user)
):
    """Create a new product (admin only)."""
    db = db_manager.get_database()
    
    # Verify category exists
    if not db.categories.find_one({"_id": ObjectId(product.category_id)}):
        raise HTTPException(status_code=400, detail="Category not found")
    
    product_data = product.dict()
    product_data["created_at"] = datetime.utcnow()
    product_data["updated_at"] = datetime.utcnow()
    
    result = db.products.insert_one(product_data)
    product_data["id"] = str(result.inserted_id)
    
    return Product(**product_data)

@router.get("/products", response_model=List[Product])
async def get_all_products(current_user: User = Depends(get_current_admin_user)):
    """Get all products (admin only)."""
    db = db_manager.get_database()
    products = []
    for product_data in db.products.find():
        product_data["id"] = str(product_data["_id"])
        del product_data["_id"]
        products.append(Product(**product_data))
    return products

@router.put("/products/{product_id}", response_model=Product)
async def update_product(
    product_id: str,
    product_update: ProductUpdate,
    current_user: User = Depends(get_current_admin_user)
):
    """Update a product (admin only)."""
    db = db_manager.get_database()
    
    update_data = product_update.dict(exclude_unset=True)
    if update_data:
        update_data["updated_at"] = datetime.utcnow()
        
        # Verify category exists if updating category_id
        if "category_id" in update_data:
            if not db.categories.find_one({"_id": ObjectId(update_data["category_id"])}):
                raise HTTPException(status_code=400, detail="Category not found")
    
    result = db.products.update_one(
        {"_id": ObjectId(product_id)}, {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    
    product_data = db.products.find_one({"_id": ObjectId(product_id)})
    product_data["id"] = str(product_data["_id"])
    del product_data["_id"]
    return Product(**product_data)

@router.delete("/products/{product_id}")
async def delete_product(product_id: str, current_user: User = Depends(get_current_admin_user)):
    """Delete a product (admin only)."""
    db = db_manager.get_database()
    result = db.products.delete_one({"_id": ObjectId(product_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return {"message": "Product deleted successfully"}

# Order Management
@router.get("/orders", response_model=List[Order])
async def get_all_orders(current_user: User = Depends(get_current_admin_user)):
    """Get all orders (admin only)."""
    db = db_manager.get_database()
    orders = []
    for order_data in db.orders.find():
        order_data["id"] = str(order_data["_id"])
        del order_data["_id"]
        orders.append(Order(**order_data))
    return orders

@router.put("/orders/{order_id}", response_model=Order)
async def update_order_status(
    order_id: str,
    order_update: OrderUpdate,
    current_user: User = Depends(get_current_admin_user)
):
    """Update order status (admin only)."""
    db = db_manager.get_database()
    
    update_data = order_update.dict(exclude_unset=True)
    if update_data:
        update_data["updated_at"] = datetime.utcnow()
    
    result = db.orders.update_one(
        {"_id": ObjectId(order_id)}, {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Order not found")
    
    order_data = db.orders.find_one({"_id": ObjectId(order_id)})
    order_data["id"] = str(order_data["_id"])
    del order_data["_id"]
    return Order(**order_data)
