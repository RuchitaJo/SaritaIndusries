from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Sarita Industries API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Helper functions for MongoDB serialization
def prepare_for_mongo(data):
    if isinstance(data, dict):
        for key, value in data.items():
            if isinstance(value, datetime):
                data[key] = value.isoformat()
    return data

def parse_from_mongo(item):
    if isinstance(item, dict):
        for key, value in item.items():
            if isinstance(value, str) and 'T' in value:
                try:
                    item[key] = datetime.fromisoformat(value.replace('Z', '+00:00'))
                except:
                    pass
    return item

# Define Models
class Product(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    category: str
    image_url: str
    features: List[str] = Field(default_factory=list)
    specifications: Optional[dict] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ProductCreate(BaseModel):
    name: str
    description: str
    category: str
    image_url: str
    features: List[str] = Field(default_factory=list)
    specifications: Optional[dict] = None

class QuoteRequest(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    company: str
    product_interest: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "pending"

class QuoteRequestCreate(BaseModel):
    name: str
    email: str
    phone: str
    company: str
    product_interest: str
    message: str

class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    subject: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "unread"

class ContactMessageCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    subject: str
    message: str

# Routes
@api_router.get("/")
async def root():
    return {"message": "Sarita Industries API", "status": "operational"}

# Product Routes
@api_router.get("/products", response_model=List[Product])
async def get_products():
    products = await db.products.find().to_list(length=None)
    return [Product(**parse_from_mongo(product)) for product in products]

@api_router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    product = await db.products.find_one({"id": product_id})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return Product(**parse_from_mongo(product))

@api_router.post("/products", response_model=Product)
async def create_product(product_data: ProductCreate):
    product = Product(**product_data.dict())
    product_dict = prepare_for_mongo(product.dict())
    await db.products.insert_one(product_dict)
    return product

# Quote Request Routes
@api_router.post("/quotes", response_model=QuoteRequest)
async def create_quote_request(quote_data: QuoteRequestCreate):
    quote = QuoteRequest(**quote_data.dict())
    quote_dict = prepare_for_mongo(quote.dict())
    await db.quote_requests.insert_one(quote_dict)
    return quote

@api_router.get("/quotes", response_model=List[QuoteRequest])
async def get_quote_requests():
    quotes = await db.quote_requests.find().sort("created_at", -1).to_list(length=None)
    return [QuoteRequest(**parse_from_mongo(quote)) for quote in quotes]

# Contact Message Routes
@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(contact_data: ContactMessageCreate):
    contact = ContactMessage(**contact_data.dict())
    contact_dict = prepare_for_mongo(contact.dict())
    await db.contact_messages.insert_one(contact_dict)
    return contact

@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages():
    messages = await db.contact_messages.find().sort("created_at", -1).to_list(length=None)
    return [ContactMessage(**parse_from_mongo(message)) for message in messages]

# Company Stats Route
@api_router.get("/stats")
async def get_company_stats():
    return {
        "happy_clients": 500,
        "years_experience": 15,
        "projects_completed": 1000,
        "on_time_delivery": 98
    }

# Initialize sample products
@api_router.post("/init-products")
async def initialize_products():
    existing_products = await db.products.count_documents({})
    if existing_products > 0:
        return {"message": "Products already initialized"}
    
    sample_products = [
        {
            "name": "Puddle Flanges",
            "description": "High-quality waterproofing solutions for concrete structures",
            "category": "Waterproofing",
            "image_url": "https://images.unsplash.com/photo-1455165814004-1126a7199f9b",
            "features": ["Corrosion resistant", "Easy installation", "Long-lasting durability", "Multiple sizes available"]
        },
        {
            "name": "Concrete Buckets",
            "description": "Durable concrete transport solutions for construction sites",
            "category": "Construction Equipment",
            "image_url": "https://images.unsplash.com/photo-1603814744450-36f978490b11",
            "features": ["Heavy-duty construction", "Efficient pouring mechanism", "Easy maintenance", "Various capacities"]
        },
        {
            "name": "Scaffolding Planks",
            "description": "Safe and reliable walking platforms for construction work",
            "category": "Safety Equipment",
            "image_url": "https://images.unsplash.com/photo-1603816885871-c122a9ff8d40",
            "features": ["Anti-slip surface", "Load tested", "Weather resistant", "Standardized dimensions"]
        }
    ]
    
    for product_data in sample_products:
        product = Product(**product_data)
        product_dict = prepare_for_mongo(product.dict())
        await db.products.insert_one(product_dict)
    
    return {"message": "Sample products initialized successfully"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)