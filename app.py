from flask import Flask, request, jsonify

app = Flask(__name__)
log_data = []

@app.route('/log', methods=['POST'])
def receive_log():
    data = request.json
    print("Received log:", data)
    log_data.append(data)
    return jsonify({"status": "received"}), 200

@app.route('/logs', methods=['GET'])
def get_logs():
    return jsonify(log_data), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)
