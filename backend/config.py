from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    mongodb_uri: str = "mongodb+srv://ankit:ankit@cluster0.kvppdtr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    database_name: str = "ecommerce_db"
    jwt_secret_key: str = "your-super-secret-jwt-key-change-this-in-production"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    class Config:
        env_file = ".env"

settings = Settings()
