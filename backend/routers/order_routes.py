from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from database import db_manager
from models import Order, OrderCreate, OrderUpdate, User, CartItem
from auth import get_current_active_user
from datetime import datetime
from bson import ObjectId

router = APIRouter(prefix="/orders", tags=["Orders"])

@router.post("/", response_model=Order, status_code=status.HTTP_201_CREATED)
async def create_order(
    order: OrderCreate,
    current_user: User = Depends(get_current_active_user)
):
    """Create a new order from cart items."""
    db = db_manager.get_database()
    
    # Validate cart items
    cart_items = []
    total_amount = 0
    
    for item in order.items:
        # Get cart item details
        cart_item_data = db.cart_items.find_one({
            "_id": ObjectId(item.product_id),
            "user_id": current_user.id
        })
        
        if not cart_item_data:
            raise HTTPException(
                status_code=400,
                detail=f"Cart item {item.product_id} not found"
            )
        
        # Get product details
        product_data = db.products.find_one({"_id": ObjectId(item.product_id)})
        if not product_data:
            raise HTTPException(
                status_code=400,
                detail=f"Product {item.product_id} not found"
            )
        
        # Check stock
        if product_data["stock_quantity"] < item.quantity:
            raise HTTPException(
                status_code=400,
                detail=f"Insufficient stock for product {product_data['name']}"
            )
        
        # Calculate total
        item_total = product_data["price"] * item.quantity
        total_amount += item_total
        
        # Add to cart items list
        cart_items.append({
            "product_id": item.product_id,
            "quantity": item.quantity
        })
    
    # Create order
    order_data = order.dict()
    order_data["user_id"] = current_user.id
    order_data["total_amount"] = total_amount
    order_data["created_at"] = datetime.utcnow()
    order_data["updated_at"] = datetime.utcnow()
    
    result = db.orders.insert_one(order_data)
    order_data["id"] = str(result.inserted_id)
    
    # Update product stock
    for item in order.items:
        db.products.update_one(
            {"_id": ObjectId(item.product_id)},
            {"$inc": {"stock_quantity": -item.quantity}}
        )
    
    # Clear user's cart
    db.cart_items.delete_many({"user_id": current_user.id})
    
    return Order(**order_data)

@router.get("/", response_model=List[Order])
async def get_user_orders(current_user: User = Depends(get_current_active_user)):
    """Get all orders for the current user."""
    db = db_manager.get_database()
    
    orders = []
    cursor = db.orders.find({"user_id": current_user.id}).sort("created_at", -1)
    
    for order_data in cursor:
        order_data["id"] = str(order_data["_id"])
        del order_data["_id"]
        orders.append(Order(**order_data))
    
    return orders

@router.get("/{order_id}", response_model=Order)
async def get_order(
    order_id: str,
    current_user: User = Depends(get_current_active_user)
):
    """Get a specific order by ID."""
    db = db_manager.get_database()
    
    try:
        order_data = db.orders.find_one({
            "_id": ObjectId(order_id),
            "user_id": current_user.id
        })
        
        if not order_data:
            raise HTTPException(status_code=404, detail="Order not found")
        
        order_data["id"] = str(order_data["_id"])
        del order_data["_id"]
        return Order(**order_data)
    
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid order ID")

@router.put("/{order_id}/cancel")
async def cancel_order(
    order_id: str,
    current_user: User = Depends(get_current_active_user)
):
    """Cancel an order (only pending orders can be cancelled)."""
    db = db_manager.get_database()
    
    try:
        order_data = db.orders.find_one({
            "_id": ObjectId(order_id),
            "user_id": current_user.id
        })
        
        if not order_data:
            raise HTTPException(status_code=404, detail="Order not found")
        
        if order_data["status"] != "pending":
            raise HTTPException(
                status_code=400,
                detail="Only pending orders can be cancelled"
            )
        
        # Update order status
        result = db.orders.update_one(
            {"_id": ObjectId(order_id)},
            {
                "$set": {
                    "status": "cancelled",
                    "updated_at": datetime.utcnow()
                }
            }
        )
        
        # Restore product stock
        for item in order_data["items"]:
            db.products.update_one(
                {"_id": ObjectId(item["product_id"])},
                {"$inc": {"stock_quantity": item["quantity"]}}
            )
        
        return {"message": "Order cancelled successfully"}
    
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid order ID")
