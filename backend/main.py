from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import uvicorn

from database import db_manager
from routers import (
    auth_routes, admin_routes, product_routes, 
    cart_routes, order_routes, wishlist_routes
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("Starting up E-commerce Backend...")
    try:
        db_manager.connect_to_database()
        print("Database connection established successfully!")
    except Exception as e:
        print(f"Failed to connect to database: {e}")
        raise e
    
    yield
    
    # Shutdown
    print("Shutting down E-commerce Backend...")
    db_manager.close_database_connection()

# Create FastAPI app
app = FastAPI(
    title="E-commerce Backend API",
    description="A comprehensive REST API for e-commerce platform with admin and user portals",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure this properly for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_routes.router, prefix="/api/v1")
app.include_router(admin_routes.router, prefix="/api/v1")
app.include_router(product_routes.router, prefix="/api/v1")
app.include_router(cart_routes.router, prefix="/api/v1")
app.include_router(order_routes.router, prefix="/api/v1")
app.include_router(wishlist_routes.router, prefix="/api/v1")

@app.get("/")
async def root():
    """Root endpoint with API information."""
    return {
        "message": "Welcome to E-commerce Backend API",
        "version": "1.0.0",
        "docs": "/docs",
        "redoc": "/redoc"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    try:
        # Test database connection
        db_manager.get_database().command("ping")
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database connection failed: {str(e)}")

@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    """Global exception handler."""
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error occurred"}
    )

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
