from flask import Flask, request, jsonify
from flask_cors import CORS
import whisper
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load model
model = whisper.load_model("base")

@app.route("/")
def home():
    return {"message": "EduVoice Backend Running 🚀"}

# Transcribe API
@app.route("/transcribe", methods=["POST"])
def transcribe():
    if "file" not in request.files:
        return {"error": "No file uploaded"}, 400

    file = request.files["file"]
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    result = model.transcribe(file_path)

    return jsonify({
        "text": result["text"]
    })


if __name__ == "__main__":
    app.run(debug=True)