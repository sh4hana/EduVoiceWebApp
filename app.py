from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Backend Running"

@app.route("/summarize", methods=["POST"])
def summarize():
    data = request.json
    text = data.get("text")

    words = text.split()
    summary = " ".join(words[:10])

    return jsonify({"summary": summary})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")