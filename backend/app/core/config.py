"""
SILENTRA — Core Configuration & Application Settings
"""
from enum import Enum
from typing import List, Union
from pydantic import AnyHttpUrl, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class AppMode(str, Enum):
    HYBRID = "HYBRID"                  # Hardware on mapped pins, simulation on unmonitored virtual desks
    HARDWARE_ONLY = "HARDWARE_ONLY"    # Exclusively physical sensors; simulator is off
    SIMULATION_ONLY = "SIMULATION_ONLY"# Full synthetic simulation; hardware disabled


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"
    )

    # General
    ENVIRONMENT: str = "development"
    APP_NAME: str = "SILENTRA"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = True
    LOG_LEVEL: str = "INFO"
    SECRET_KEY: str = "silentra_dev_secret_key_change_in_production_min32chars"

    # Runtime Mode
    APP_MODE: AppMode = AppMode.HYBRID

    # Server & CORS
    BACKEND_HOST: str = "0.0.0.0"
    BACKEND_PORT: int = 8000
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
    ]

    # Database
    DATABASE_URL: str = "postgresql+asyncpg://silentra_user:silentra_password@localhost:5432/silentra_db"
    SQLITE_DB_URL: str = "sqlite+aiosqlite:///./silentra_dev.db"
    USE_SQLITE_FALLBACK: bool = True

    # MQTT Broker
    MQTT_BROKER_HOST: str = "localhost"
    MQTT_BROKER_PORT: int = 1883
    MQTT_CLIENT_ID: str = "silentra_backend_srv"
    MQTT_USERNAME: str = ""
    MQTT_PASSWORD: str = ""
    MQTT_KEEPALIVE: int = 60
    MQTT_TOPIC_PREFIX: str = "silentra"

    # Sensor Thresholds
    NOISE_THRESHOLD_DB_SPL: float = 65.0
    NOISE_WARNING_DURATION_SEC: int = 5
    INACTIVITY_TIMEOUT_MINUTES: int = 30
    PROTOTYPE_DEVICE_ID: str = "ESP32-DEV-PROTOTYPE-01"

    @property
    def effective_db_url(self) -> str:
        """Returns the database URL, switching to SQLite fallback if configured."""
        if self.USE_SQLITE_FALLBACK and "postgresql" in self.DATABASE_URL:
            return self.SQLITE_DB_URL
        return self.DATABASE_URL


settings = Settings()
