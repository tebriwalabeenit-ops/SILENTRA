"""
SILENTRA — FastAPI Application Entrypoint
"""
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Lifecycle startup: Initialize DB connection pool, start MQTT listener if in HYBRID or HARDWARE mode
    # Start Demo Simulator if in HYBRID or SIMULATION mode
    yield
    # Lifecycle shutdown: Close MQTT client, drain connections, stop simulator


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Smart Library Intelligence & Monitoring System — Backend API",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/v1/system/health", tags=["System"])
async def health_check():
    """System health status check."""
    return {
        "status": "healthy",
        "app_name": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "environment": settings.ENVIRONMENT,
        "app_mode": settings.APP_MODE.value,
        "sqlite_fallback": settings.USE_SQLITE_FALLBACK,
    }
