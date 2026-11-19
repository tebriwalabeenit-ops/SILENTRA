# SILENTRA — Smart Library Intelligence & Monitoring System

SILENTRA is an enterprise-grade Smart Library Intelligence and Monitoring System that bridges physical IoT hardware sensing with a real-time 2D/3D digital twin.

---

## 1. System Capabilities

- **Real-Time Headcount Monitoring**: Bi-directional entry/exit tracking using dual IR break-beam sensor channels.
- **Seat Occupancy Intelligence**: Sub-second seat occupancy tracking with hardware microswitches and auto-debouncing.
- **Acoustic Noise Hotspots**: Decibel sound pressure level ($L_{Aeq}$ dB SPL) monitoring via I2S MEMS microphones with automated threshold alerts.
- **Dual 2D/3D Digital Twin**: Architectural 2D floor plans synchronized with an interactive Three.js 3D isometric environment.
- **Librarian Notification Suite**: Real-time push alerts, physical piezo buzzer alarms, and OLED hardware display updates.
- **Strict Data Integrity**: Rigorous architectural isolation ensuring simulated demo data never contaminates real physical hardware streams.

---

## 2. Technology Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, shadcn/ui, Lucide React
- **3D Spatial Visualization**: Three.js, React Three Fiber, Drei
- **Backend**: Python 3.12+, FastAPI, SQLAlchemy 2.0 (Async), Pydantic v2
- **Database & Migrations**: PostgreSQL 16 (with SQLite async local fallback), Alembic
- **IoT & Protocols**: MQTT (Eclipse Mosquitto 2.0), ESP32 DevKit V1 (C++ / PlatformIO)
- **Real-time WebSockets**: Async WebSocket hub for push-based updates
- **Deployment**: Docker, Docker Compose

---

## 3. Product Design System

- **Primary Forest Green**: `#245B45`
- **Deep Forest**: `#173D30`
- **Warm White**: `#FAFAF7`
- **Surface Grey**: `#F1F3F0`
- **Charcoal**: `#252B28`
- **Border Grey**: `#DDE2DC`
- **Typography**: Inter
- **Navigation**: Horizontal tabs (Overview, Library View, Floor Management, Seats & Users, Noise Monitoring, Analytics, Reports, Settings). No permanent left sidebar.

---

## 4. Repository Structure

```
LIBRARY_SEATING/
├── backend/                  # FastAPI backend, async DB models, MQTT consumer
│   ├── app/
│   │   ├── api/              # REST & WebSocket endpoints
│   │   ├── core/             # Configuration, logging, security
│   │   ├── db/               # SQLAlchemy async engine & base
│   │   ├── models/           # 12 core relational entities
│   │   ├── mqtt/             # Mosquitto broker client & handlers
│   │   ├── schemas/          # Pydantic v2 validation schemas
│   │   └── services/         # State machine, acoustic analyzer, simulator
│   ├── alembic/              # Database migration versions
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/                 # React 19 + TypeScript + Vite + Three.js SPA
│   ├── src/
│   │   ├── components/       # shadcn/ui primitives & layout components
│   │   ├── features/         # Feature modules per navigation tab
│   │   │   └── library-view/ # 2D architectural & 3D R3F digital twin
│   │   ├── hooks/            # WebSocket & data query hooks
│   │   ├── store/            # Zustand global state
│   │   └── types/            # Strict TypeScript interfaces
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.ts
├── firmware/                 # ESP32 C++ firmware
│   └── esp32/
│       ├── src/              # Breakbeam, microswitch, INMP441, OLED, buzzer
│       └── platformio.ini
├── docs/                     # Specifications & Architecture
│   ├── architecture.md       # Full architectural breakdown
│   ├── database-schema.md    # ER diagram & 12 entity catalog
│   ├── mqtt-specification.md # Topic taxonomy & JSON schemas
│   ├── api-specification.md  # REST & WebSocket API specification
│   └── roadmap.md            # Phased implementation plan
├── deploy/                   # Mosquitto and container configs
├── docker-compose.yml        # Orchestration (DB, MQTT, Backend, Frontend)
├── .env.example              # Environment variables template
├── .gitignore
└── README.md
```

---

## 5. Architectural Documentation Index

- [System Architecture Specification](file:///c:/Users/Beenit/OneDrive/Desktop/LIBRARY_SEATING/docs/architecture.md)
- [Database Schema & ER Diagram](file:///c:/Users/Beenit/OneDrive/Desktop/LIBRARY_SEATING/docs/database-schema.md)
- [MQTT Protocol & Payload Specification](file:///c:/Users/Beenit/OneDrive/Desktop/LIBRARY_SEATING/docs/mqtt-specification.md)
- [REST API & WebSocket Specification](file:///c:/Users/Beenit/OneDrive/Desktop/LIBRARY_SEATING/docs/api-specification.md)
- [Implementation Roadmap](file:///c:/Users/Beenit/OneDrive/Desktop/LIBRARY_SEATING/docs/roadmap.md)
