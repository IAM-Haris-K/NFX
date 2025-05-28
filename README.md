# NFX (NetFloweXplorer) Dashboard

The **NFX Dashboard** is a web-based interface designed for real-time monitoring, analysis, and visualization of network traffic and security events. This application provides a centralized view of key security data, including live packet analysis, suspicious alerts, and traffic patterns—making it ideal for internal SOC (Security Operations Center) use or educational environments.

---

## 🔐 Features

### ✔️ User Login System
- Simple username/password authentication
- Session-based user login/logout

### 📊 Dashboard Overview
- Summary of alert counts, event logs, and suspicious activities
- Modular sections to visualize packet data and trends

### 🌐 Network Traffic Visualization
- View simplified real-time traffic data
- Placeholder ready for integration with packet sniffers (e.g., tcpdump, Wireshark)

### 🧪 Packet Analysis Page
- Display of sample or real packet data
- Supports inspection and review of suspicious payloads or IPs

---

## 🧱 Technologies Used

- **Flask** – Python web framework
- **Jinja2** – HTML templating engine
- **Tailwind CSS** – Utility-first CSS framework
- **Vanilla JavaScript** – Lightweight client-side interactivity

---

## 🚀 Usage Scenarios

- Internal monitoring by security teams (SIEM-lite)
- Cybersecurity training and labs
- Visualization frontend for IDS/IPS logs (e.g., Suricata, Snort)
- Educational project for Flask, network analysis, and frontend/backend integration

---

## 🛠️ Setup Instructions

```bash
# Step 1: Create a virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Step 2: Install dependencies
pip install -r requirements.txt

# Step 3: Run the Flask app
python app.py
