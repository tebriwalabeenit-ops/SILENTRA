# SILENTRA — MQTT Protocol & Sensor Payload Specification

## 1. Protocol Architecture & Broker Standards

- **Standard**: MQTT v3.1.1 / v5.0 over TCP (Port 1883) with TLS encryption in production.
- **Message Encoding**: UTF-8 encoded JSON.
- **Broker**: Eclipse Mosquitto.
- **Timestamp Standard**: ISO 8601 UTC string (`YYYY-MM-DDTHH:MM:SS.sssZ`) or millisecond epoch.
- **Message Identification**: Unique UUID v4 `message_id` for deduplication.

---

## 2. Topic Taxonomy & Structure

All topics follow a structured hierarchical schema:
```
silentra/{env}/{building_id}/{domain}/{entity_type}/{entity_id}/{action_or_stream}
```

- `{env}`: Environment (`dev`, `staging`, `prod`).
- `{building_id}`: Facility identifier (e.g., `main-lib`).

### 2.1. Telemetry Ingestion Topics (Sensors $\rightarrow$ Backend)

| Topic | Sensor / Source | QoS | Retain | Description |
|---|---|---|---|---|
| `silentra/{env}/{building}/device/{device_mac}/status` | ESP32 System | 1 | False | Periodic device heartbeat and diagnostics |
| `silentra/{env}/{building}/device/{device_mac}/lwt` | ESP32 Broker LWT | 1 | True | Last Will and Testament for offline detection |
| `silentra/{env}/{building}/seat/{seat_code}/occupancy` | KW11-3Z Microswitch | 1 | True | Seat occupancy state change (debounced) |
| `silentra/{env}/{building}/gate/{gate_id}/passage` | Dual IR Break-beam | 1 | False | Directional passage counter event (IN/OUT) |
| `silentra/{env}/{building}/zone/{zone_id}/noise` | INMP441 I2S Mic | 0 | False | Periodic acoustic telemetry (dB SPL sample) |

### 2.2. Actuator Command Topics (Backend $\rightarrow$ ESP32)

| Topic | Actuator | QoS | Retain | Description |
|---|---|---|---|---|
| `silentra/{env}/{building}/device/{device_mac}/cmd/display` | OLED / LCD Screen | 1 | False | Push textual notification or occupancy tally to screen |
| `silentra/{env}/{building}/device/{device_mac}/cmd/buzzer` | Piezo Buzzer | 1 | False | Trigger audible alarm (pattern, frequency, duration) |

---

## 3. Strict Payload JSON Schemas

### 3.1. Device Heartbeat & Diagnostics
**Topic**: `silentra/{env}/{building}/device/{device_mac}/status`

```json
{
  "message_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "device_id": "ESP32-DEV-PROTOTYPE-01",
  "mac_address": "C8:C9:A3:FB:2E:10",
  "firmware_version": "1.0.0-rc1",
  "uptime_seconds": 14280,
  "wifi_rssi_dbm": -58,
  "free_heap_bytes": 182440,
  "timestamp": "2026-11-20T01:35:00.000Z",
  "data_origin": "HARDWARE",
  "sensors_healthy": {
    "microswitch_1": true,
    "microswitch_2": true,
    "breakbeam_channel_a": true,
    "breakbeam_channel_b": true,
    "inmp441_i2s": true
  }
}
```

### 3.2. Last Will and Testament (LWT)
**Topic**: `silentra/{env}/{building}/device/{device_mac}/lwt`
- Configured during MQTT client `connect()`.
- If ESP32 ungracefully drops connection (power loss, WiFi failure), Mosquitto immediately distributes this payload.

```json
{
  "device_id": "ESP32-DEV-PROTOTYPE-01",
  "mac_address": "C8:C9:A3:FB:2E:10",
  "status": "OFFLINE",
  "timestamp": "2026-11-20T01:35:30.000Z",
  "reason": "CONNECTION_LOST"
}
```

### 3.3. Seat Occupancy Event (KW11-3Z Microswitch)
**Topic**: `silentra/{env}/{building}/seat/{seat_code}/occupancy`
- Published on state change after hardware debounce ($\ge 1500\text{ms}$).

```json
{
  "message_id": "3b2e5a7d-8f90-4e12-b13c-7a6b4e3f9821",
  "seat_code": "FL01-ZNA-S001",
  "device_id": "ESP32-DEV-PROTOTYPE-01",
  "gpio_pin": 14,
  "is_occupied": true,
  "raw_state": 0,
  "debounce_duration_ms": 1500,
  "timestamp": "2026-11-20T01:36:12.450Z",
  "data_origin": "HARDWARE"
}
```

### 3.4. Gate Passage Event (Dual IR Break-Beam)
**Topic**: `silentra/{env}/{building}/gate/{gate_id}/passage`
- Direction determined on-chip by beam interruption sequence:
  - Beam A broken $\rightarrow$ Beam B broken: `IN` (Entry)
  - Beam B broken $\rightarrow$ Beam A broken: `OUT` (Exit)

```json
{
  "message_id": "8c4a91b2-2e45-412d-a419-f5619d8e7b14",
  "gate_id": "FL01-GATE-MAIN",
  "floor_id": "FL-01",
  "device_id": "ESP32-DEV-PROTOTYPE-01",
  "direction": "IN",
  "transit_duration_ms": 420,
  "beam_sequence": ["BEAM_A", "BEAM_B"],
  "timestamp": "2026-11-20T01:36:45.120Z",
  "data_origin": "HARDWARE"
}
```

### 3.5. Noise Level Telemetry (INMP441 I2S Microphone)
**Topic**: `silentra/{env}/{building}/zone/{zone_id}/noise`
- Published periodically (default interval: every $2.0\text{s}$) or immediately on threshold violation.

```json
{
  "message_id": "1d8f7e2a-6c34-4b90-8e12-3f5a7b9c1d4e",
  "zone_id": "ZN-01A",
  "floor_id": "FL-01",
  "device_id": "ESP32-DEV-PROTOTYPE-01",
  "sample_window_ms": 2000,
  "decibel_spl_avg": 54.8,
  "decibel_spl_peak": 68.2,
  "is_threshold_exceeded": false,
  "threshold_limit_db": 60.0,
  "timestamp": "2026-11-20T01:37:00.000Z",
  "data_origin": "HARDWARE"
}
```

### 3.6. Actuator Command: OLED / LCD Display
**Topic**: `silentra/{env}/{building}/device/{device_mac}/cmd/display`

```json
{
  "command_id": "a9e8d7c6-b5a4-4321-9876-fedcba098765",
  "line_1": "SILENTRA MONITOR",
  "line_2": "OCC: 42/50 (84%)",
  "line_3": "NOISE: 52 dB (OK)",
  "line_4": "ZONE: QUIET STACKS",
  "display_mode": "STANDARD",
  "duration_seconds": 0
}
```

### 3.7. Actuator Command: Piezo Buzzer
**Topic**: `silentra/{env}/{building}/device/{device_mac}/cmd/buzzer`

```json
{
  "command_id": "7f8e9d0a-1b2c-3d4e-5f6a-7b8c9d0e1f2a",
  "pattern": "ALERT_DOUBLE_BEEP",
  "frequency_hz": 2700,
  "beep_duration_ms": 150,
  "pause_duration_ms": 100,
  "repeat_count": 2,
  "reason": "NOISE_EXCEEDED_WARNING"
}
```

---

## 4. Hardware Pinout & Wiring (ESP32 DevKit V1 Prototype)

| Component | Physical Pin | ESP32 GPIO | Mode / Interface | Purpose |
|---|---|---|---|---|
| **KW11-3Z Microswitch 1** | Pin 14 | `GPIO14` | Input Pull-up | Seat 1 Occupancy Sensor |
| **KW11-3Z Microswitch 2** | Pin 27 | `GPIO27` | Input Pull-up | Seat 2 Occupancy Sensor |
| **IR Break-beam Channel A** | Pin 25 | `GPIO25` | Input Pull-up | Gate Transit Beam A |
| **IR Break-beam Channel B** | Pin 26 | `GPIO26` | Input Pull-up | Gate Transit Beam B |
| **INMP441 SCK** | Pin 18 | `GPIO18` | I2S Bit Clock | Microphone Clock Line |
| **INMP441 WS (LRCK)** | Pin 19 | `GPIO19` | I2S Word Select | Left/Right Frame Select |
| **INMP441 SD (Data Out)** | Pin 21 | `GPIO21` | I2S Serial Data | 24-bit Audio Sample Data |
| **SSD1306 OLED SDA** | Pin 22 | `GPIO22` | I2C Data | Visual Screen Data |
| **SSD1306 OLED SCL** | Pin 23 | `GPIO23` | I2C Clock | Visual Screen Clock |
| **Piezo Buzzer** | Pin 4 | `GPIO4` | PWM / Tone Out | Audible Alerts |
