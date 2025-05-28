
# Flask Converted Project

This project is a simplified conversion of a React + TypeScript dashboard into a Flask web application using HTML, Tailwind CSS, and vanilla JavaScript.

## 📁 Project Structure

```
flask_converted_project/
│
├── app.py                   # Main Flask application
├── requirements.txt         # Python dependencies
├── templates/               # HTML templates using Jinja2
│   ├── layout.html
│   ├── login.html
│   ├── dashboard.html
│   ├── network_traffic.html
│   └── packet_analysis.html
├── static/                  # Static files (CSS, JS, images)
│   ├── css/
│   └── js/
```

## 🚀 Getting Started

### 1. Set up a Python environment

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Run the Flask server

```bash
python app.py
```

The app will be available at `http://127.0.0.1:5000`.

## 🔐 Login Info

Use the following dummy credentials to log in:

- **Username:** `admin`
- **Password:** `password123`

## 🧱 Tech Stack

- Flask (Python)
- Tailwind CSS (CDN based)
- HTML Templates (Jinja2)
- Vanilla JavaScript

## 🛠 Future Enhancements (Suggestions)

- Add charts using Chart.js or ApexCharts.
- Hook up a database for persistent login and data.
- Add real-time monitoring features with WebSockets or polling.

---

© 2025 Bolt Security Interface – Flask Edition
