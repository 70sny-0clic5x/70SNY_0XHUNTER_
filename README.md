# Project: 70SNY_0XHUNTER (v1.0-stable)
**Advanced OSINT Framework for Digital Identity Correlation & Dark Web Reconnaissance**

> [!IMPORTANT]
> **Access the Tool:** To use this tool, please access our official Telegram bot: 
> [**@Oxhunter_h0sny_bot**](https://t.me/Oxhunter_h0sny_bot)

## 1. Overview
`70SNY_0XHUNTER` is a **Hybrid Intelligence Framework** designed for deep digital footprint mapping. It bridges the gap between surface web auditing and darknet reconnaissance by combining automated **Tor-proxy tunneling** with high-speed scraping. The engine specializes in real-time extraction of PII (Personally Identifiable Information), including leaked emails, phone numbers, and crypto-wallets across both clear and onion services.

## 2. Technical Specifications
* **Architecture:** Decoupled Client-Server model with **SOCKS5 Tor Gateway** integration.
* **Backend Engine:** Python 3.x / Flask utilizing **Multi-Threading** and **Playwright** for browser automation.
* **Frontend Controller:** Asynchronous Vanilla JavaScript (ES6+) utilizing **Server-Sent Events (SSE)** for real-time result streaming.
* **Recon Logic:** * **Regex Extraction Engine:** Automated pattern matching for emails, hashes, and blockchain addresses.
    * **Onion Discovery:** Integrated scraping for specialized Dark Web directories (Ahmia, Torch, Dread).
    * **Anti-Detection:** Implements dynamic **User-Agent rotation** and headless browser emulation to bypass anti-scraping mechanisms.

## 3. Core Functionalities
* **Threaded Execution:** Concurrent scanning of multiple targets to minimize latency.
* **Live Status Streaming:** Incremental data transmission allowing immediate result rendering without batch delays.
* **Heuristic Analysis:** Accurate classification of status codes (200 OK vs. 404/Redirect) to prevent false positives.
* **Integrated Recon:** Coverage includes mainstream social media, developer platforms, and deep-web repositories.

## 4. Repository Metadata
* **Access Level:** **Private**. Contains proprietary request headers and bypass logic.
* **Author:** 70SNY_0xHUNTER
* **Environment:** Compatible with Linux/Unix/Windows environments.

## 5. Visual Documentation
![Project Demo](./assets/70SNY_0XHUNTER.gif)

## 6. Deployment & Dependencies
To initialize the environment, refer to the `requirements.txt` file for the necessary library stack:
```bash
pip install -r requirements.txt
python app.py
