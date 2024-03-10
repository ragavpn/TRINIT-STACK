from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "http://localhost:5000"]}})

@app.route("/upload")
def handle_upload():
    byte_array = request.args.get('byteArray')
    print(byte_array)