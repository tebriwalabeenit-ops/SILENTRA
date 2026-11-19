# SILENTRA — ESP32 Prototype Firmware Specification

## 1. Physical Hardware Overview

The initial prototype leverages a single **ESP32 DevKit V1** microcontroller connected to:
- **2x KW11-3Z Mechanical Microswitches**: Installed under chair cushions / desk contact points for physical occupancy detection.
- **2x IR Break-Beam Sensor Channels (Emitter/Receiver)**: Placed across a transit portal at a spacing of 15–20 cm to detect directional transit (Beam A $\rightarrow$ Beam B = Entry; Beam B $\rightarrow$ Beam A = Exit).
- **1x INMP441 Omnidirectional MEMS Microphone**: Uses the I2S digital audio bus for low-noise acoustic measurement of ambient decibel levels ($L_{Aeq}$ dB SPL).
- **1x 0.96" SSD1306 OLED Display (I2C)**: Provides local visual metrics (headcount, zone noise status).
- **1x 5V Active Piezo Buzzer**: Provides audible alert patterns upon prolonged noise threshold breaches.

---

## 2. Pinout & GPIO Connection Diagram

| Component | Pin Label | ESP32 GPIO | Description / Mode |
|---|---|---|---|
| KW11-3Z Switch 1 | COM / NO | `GPIO14` | INPUT_PULLUP (Switch closures ground the pin) |
| KW11-3Z Switch 2 | COM / NO | `GPIO27` | INPUT_PULLUP (Switch closures ground the pin) |
| IR Break-beam A | Receiver Out | `GPIO25` | INPUT_PULLUP (Beam break pulls HIGH/LOW) |
| IR Break-beam B | Receiver Out | `GPIO26` | INPUT_PULLUP (Beam break pulls HIGH/LOW) |
| INMP441 SCK | Serial Clock | `GPIO18` | I2S Bit Clock (`I2S_NUM_0`) |
| INMP441 WS | Word Select | `GPIO19` | I2S Word Select / Left-Right Clock |
| INMP441 SD | Serial Data | `GPIO21` | I2S Audio Sample Input |
| INMP441 L/R | Channel Select | `GND` | Tied to GND for Left Channel data |
| SSD1306 SDA | Serial Data | `GPIO22` | I2C Data line |
| SSD1306 SCL | Serial Clock | `GPIO23` | I2C Clock line |
| Piezo Buzzer | Positive (+) | `GPIO4` | PWM output / GPIO digital toggle |

---

## 3. Debounce & Signal Processing Rules

1. **Microswitch Mechanical Debounce**:
   - Hardware switches experience contact chatter upon settling.
   - Firmware implements a debouncing window of $1500\text{ms}$ before committing an `OCCUPIED` transition.
   - Firmware implements a release debounce of $2000\text{ms}$ before reporting `AVAILABLE` to avoid transient posture shifts from registering as departures.

2. **Directional Passage Finite State Machine (FSM)**:
   - Sequence $A_{\text{broken}} \rightarrow B_{\text{broken}} \rightarrow A_{\text{clear}} \rightarrow B_{\text{clear}}$ registers **ENTRY**.
   - Sequence $B_{\text{broken}} \rightarrow A_{\text{broken}} \rightarrow B_{\text{clear}} \rightarrow A_{\text{clear}}$ registers **EXIT**.
   - Incomplete breaks or timeouts ($> 2500\text{ms}$) are discarded to avoid spurious counts.

3. **I2S Acoustic Sampling**:
   - 32-bit (24-bit valid) samples are acquired via DMA buffer at 16 kHz or 44.1 kHz.
   - Firmare computes Root Mean Square (RMS) over a sliding $2000\text{ms}$ window and maps to calibrated dB SPL:
     $$\text{dB SPL} \approx 20 \log_{10}\left(\frac{\text{RMS}}{\text{Ref}}\right) + \text{Calibration Offset}$$
