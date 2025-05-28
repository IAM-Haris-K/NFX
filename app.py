
from flask import Flask, render_template, request, redirect, url_for, session

app = Flask(__name__)
app.secret_key = 'supersecretkey'  # Replace with a secure key in production

# Dummy credentials
USER_CREDENTIALS = {
    "admin": "password123"
}

@app.route('/')
def home():
    if 'username' in session:
        return redirect(url_for('dashboard'))
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if USER_CREDENTIALS.get(username) == password:
            session['username'] = username
            return redirect(url_for('dashboard'))
        return render_template('login.html', error="Invalid credentials")
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('login'))

@app.route('/dashboard')
def dashboard():
    if 'username' not in session:
        return redirect(url_for('login'))
    return render_template('dashboard.html')

@app.route('/network-traffic')
def network_traffic():
    if 'username' not in session:
        return redirect(url_for('login'))
    return render_template('network_traffic.html')

@app.route('/packet-analysis')
def packet_analysis():
    if 'username' not in session:
        return redirect(url_for('login'))
    return render_template('packet_analysis.html')

if __name__ == '__main__':
    app.run(debug=True)
