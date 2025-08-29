from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from database import db_manager
from models import WishlistItem, WishlistItemCreate, User
from auth import get_current_active_user
from datetime import datetime
from bson import ObjectId

router = APIRouter(prefix="/wishlist", tags=["Wishlist"])

@router.get("/", response_model=List[WishlistItem])
async def get_wishlist_items(current_user: User = Depends(get_current_active_user)):
    """Get all items in user's wishlist."""
    db = db_manager.get_database()
    
    wishlist_items = []
    cursor = db.wishlist_items.find({"user_id": current_user.id})
    
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
        wishlist_items.append(WishlistItem(**item_data))
    
    return wishlist_items

@router.post("/", response_model=WishlistItem, status_code=status.HTTP_201_CREATED)
async def add_to_wishlist(
    wishlist_item: WishlistItemCreate,
    current_user: User = Depends(get_current_active_user)
):
    """Add item to wishlist."""
    db = db_manager.get_database()
    
    # Check if product exists and is active
    product_data = db.products.find_one({"_id": ObjectId(wishlist_item.product_id), "is_active": True})
    if not product_data:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Check if product is already in wishlist
    existing_item = db.wishlist_items.find_one({
        "user_id": current_user.id,
        "product_id": wishlist_item.product_id
    })
    
    if existing_item:
        raise HTTPException(
            status_code=400,
            detail="Product already in wishlist"
        )
    
    # Create new wishlist item
    item_data = wishlist_item.dict()
    item_data["user_id"] = current_user.id
    item_data["created_at"] = datetime.utcnow()
    
    result = db.wishlist_items.insert_one(item_data)
    item_data["id"] = str(result.inserted_id)
    
    # Add product details
    product_data["id"] = str(product_data["_id"])
    del product_data["_id"]
    from models import Product
    item_data["product"] = Product(**product_data)
    
    return WishlistItem(**item_data)

@router.delete("/{item_id}")
async def remove_from_wishlist(
    item_id: str,
    current_user: User = Depends(get_current_active_user)
):
    """Remove item from wishlist."""
    db = db_manager.get_database()
    
    result = db.wishlist_items.delete_one({
        "_id": ObjectId(item_id),
        "user_id": current_user.id
    })
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Wishlist item not found")
    
    return {"message": "Item removed from wishlist"}

@router.delete("/")
async def clear_wishlist(current_user: User = Depends(get_current_active_user)):
    """Clear all items from user's wishlist."""
    db = db_manager.get_database()
    
    result = db.wishlist_items.delete_many({"user_id": current_user.id})
    
    return {"message": f"Cleared {result.deleted_count} items from wishlist"}
