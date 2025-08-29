from pymongo import MongoClient
from pymongo.database import Database
from config import settings

class DatabaseManager:
    def __init__(self):
        self.client: MongoClient = None
        self.database: Database = None
    
    def connect_to_database(self):
        try:
            self.client = MongoClient(settings.mongodb_uri)
            self.database = self.client[settings.database_name]
            # Test the connection
            self.client.admin.command('ping')
            print("Successfully connected to MongoDB!")
        except Exception as e:
            print(f"Error connecting to MongoDB: {e}")
            raise e
    
    def close_database_connection(self):
        if self.client:
            self.client.close()
    
    def get_database(self) -> Database:
        return self.database

# Global database manager instance
db_manager = DatabaseManager()
