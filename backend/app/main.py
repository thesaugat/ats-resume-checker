from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router
from typing import Union
import os
from contextlib import asynccontextmanager


app = FastAPI(title="My Microservices Backend")

# Define allowed origins for CORS (e.g., allow frontend from localhost)
allow_origins = [
    "http://3.27.34.4",  # Your EC2 public IP
    "http://localhost:5173",  # Local development
    "http://localhost",  # Production frontend
    "*",  # Allow all (for testing)
]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,  # Can be ["*"] to allow all origins (not recommended for production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers (including Content-Type)
)


@app.on_event("startup")
async def startup():
    #  Create upload directory if it doesn't exist
    # os.makedirs("uploaded", exist_ok=True)

    # # Setup MongoDB indexes
    # await setup_indexes()

    pass


app.include_router(router)
