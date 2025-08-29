from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from database import db_manager
from models import CartItem, CartItemCreate, CartItemUpdate, User
from auth import get_current_active_user
from datetime import datetime
from bson import ObjectId

router = APIRouter(prefix="/cart", tags=["Shopping Cart"])

@router.get("/", response_model=List[CartItem])
async def get_cart_items(current_user: User = Depends(get_current_active_user)):
    """Get all items in user's cart."""
    db = db_manager.get_database()
    
    cart_items = []
    cursor = db.cart_items.find({"user_id": current_user.id})
    
    for item_data in cursor:
        # Get product details
        product_data = db.products.find_one({"_id": ObjectId(item_data["product_id"])})
        if product_data:
            product_data["id"] = str(product_data["_id"])
            del product_data["_id"]
            from models import Product
            item_data["product"] = Product(**product_data)
        
        item_data["id"] = str(item_data["_id"])
        del item_data["_id"]
        cart_items.append(CartItem(**item_data))
    
    return cart_items

@router.post("/", response_model=CartItem, status_code=status.HTTP_201_CREATED)
async def add_to_cart(
    cart_item: CartItemCreate,
    current_user: User = Depends(get_current_active_user)
):
    """Add item to cart."""
    db = db_manager.get_database()
    
    # Check if product exists and is active
    product_data = db.products.find_one({"_id": ObjectId(cart_item.product_id), "is_active": True})
    if not product_data:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Check if product is already in cart
    existing_item = db.cart_items.find_one({
        "user_id": current_user.id,
        "product_id": cart_item.product_id
    })
    
    if existing_item:
        # Update quantity
        new_quantity = existing_item["quantity"] + cart_item.quantity
        result = db.cart_items.update_one(
            {"_id": existing_item["_id"]},
            {"$set": {"quantity": new_quantity, "updated_at": datetime.utcnow()}}
        )
        
        # Return updated item
        updated_item = db.cart_items.find_one({"_id": existing_item["_id"]})
        updated_item["id"] = str(updated_item["_id"])
        del updated_item["_id"]
        
        # Add product details
        product_data["id"] = str(product_data["_id"])
        del product_data["_id"]
        from models import Product
        updated_item["product"] = Product(**product_data)
        
        return CartItem(**updated_item)
    else:
        # Create new cart item
        item_data = cart_item.dict()
        item_data["user_id"] = current_user.id
        item_data["created_at"] = datetime.utcnow()
        item_data["updated_at"] = datetime.utcnow()
        
        result = db.cart_items.insert_one(item_data)
        item_data["id"] = str(result.inserted_id)
        
        # Add product details
        product_data["id"] = str(product_data["_id"])
        del product_data["_id"]
        from models import Product
        item_data["product"] = Product(**product_data)
        
        return CartItem(**item_data)

@router.put("/{item_id}", response_model=CartItem)
async def update_cart_item(
    item_id: str,
    cart_item_update: CartItemUpdate,
    current_user: User = Depends(get_current_active_user)
):
    """Update cart item quantity."""
    db = db_manager.get_database()
    
    # Check if item exists and belongs to user
    item_data = db.cart_items.find_one({
        "_id": ObjectId(item_id),
        "user_id": current_user.id
    })
    
    if not item_data:
        raise HTTPException(status_code=404, detail="Cart item not found")
    
    # Update item
    update_data = cart_item_update.dict()
    update_data["updated_at"] = datetime.utcnow()
    
    result = db.cart_items.update_one(
        {"_id": ObjectId(item_id)},
        {"$set": update_data}
    )
    
    # Return updated item
    updated_item = db.cart_items.find_one({"_id": ObjectId(item_id)})
    updated_item["id"] = str(updated_item["_id"])
    del updated_item["_id"]
    
    # Add product details
    product_data = db.products.find_one({"_id": ObjectId(updated_item["product_id"])})
    if product_data:
        product_data["id"] = str(product_data["_id"])
        del product_data["_id"]
        from models import Product
        updated_item["product"] = Product(**product_data)
    
    return CartItem(**updated_item)

@router.delete("/{item_id}")
async def remove_from_cart(
    item_id: str,
    current_user: User = Depends(get_current_active_user)
):
    """Remove item from cart."""
    db = db_manager.get_database()
    
    result = db.cart_items.delete_one({
        "_id": ObjectId(item_id),
        "user_id": current_user.id
    })
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Cart item not found")
    
    return {"message": "Item removed from cart"}

@router.delete("/")
async def clear_cart(current_user: User = Depends(get_current_active_user)):
    """Clear all items from user's cart."""
    db = db_manager.get_database()
    
    result = db.cart_items.delete_many({"user_id": current_user.id})
    
    return {"message": f"Cleared {result.deleted_count} items from cart"}
