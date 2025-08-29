from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from database import db_manager
from models import Product, Category
from bson import ObjectId

router = APIRouter(prefix="/products", tags=["Products"])

@router.get("/", response_model=List[Product])
async def get_products(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    category_id: Optional[str] = None,
    search: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None
):
    """Get products with filtering and pagination."""
    db = db_manager.get_database()
    
    # Build filter query
    filter_query = {"is_active": True}
    
    if category_id:
        filter_query["category_id"] = category_id
    
    if search:
        filter_query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}}
        ]
    
    if min_price is not None or max_price is not None:
        price_filter = {}
        if min_price is not None:
            price_filter["$gte"] = min_price
        if max_price is not None:
            price_filter["$lte"] = max_price
        filter_query["price"] = price_filter
    
    # Get products with pagination
    products = []
    cursor = db.products.find(filter_query).skip(skip).limit(limit)
    
    for product_data in cursor:
        product_data["id"] = str(product_data["_id"])
        del product_data["_id"]
        products.append(Product(**product_data))
    
    return products

@router.get("/{product_id}", response_model=Product)
async def get_product(product_id: str):
    """Get a specific product by ID."""
    db = db_manager.get_database()
    
    try:
        product_data = db.products.find_one({"_id": ObjectId(product_id), "is_active": True})
        if not product_data:
            raise HTTPException(status_code=404, detail="Product not found")
        
        product_data["id"] = str(product_data["_id"])
        del product_data["_id"]
        return Product(**product_data)
    
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid product ID")

@router.get("/categories", response_model=List[Category])
async def get_categories():
    """Get all active categories."""
    db = db_manager.get_database()
    
    categories = []
    for category_data in db.categories.find():
        category_data["id"] = str(category_data["_id"])
        del category_data["_id"]
        categories.append(Category(**category_data))
    
    return categories

@router.get("/categories/{category_id}", response_model=Category)
async def get_category(category_id: str):
    """Get a specific category by ID."""
    db = db_manager.get_database()
    
    try:
        category_data = db.categories.find_one({"_id": ObjectId(category_id)})
        if not category_data:
            raise HTTPException(status_code=404, detail="Category not found")
        
        category_data["id"] = str(category_data["_id"])
        del category_data["_id"]
        return Category(**category_data)
    
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid category ID")
