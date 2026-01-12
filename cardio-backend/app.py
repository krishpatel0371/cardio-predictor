from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import joblib
import numpy as np
import os

# -----------------------------
# App Configuration
# -----------------------------
app = Flask(
    __name__,
    static_folder="../cardio-frontend/build",
    static_url_path=""
)

CORS(app)

# -----------------------------
# Correct Absolute Paths
# -----------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(BASE_DIR, "rf_model.pkl")
SCALER_PATH = os.path.join(BASE_DIR, "scaler_final.pkl")

print("Model path:", MODEL_PATH)
print("Scaler path:", SCALER_PATH)

# -----------------------------
# Load ML Model & Scaler
# -----------------------------
model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)

# -----------------------------
# API Routes
# -----------------------------
@app.route("/api", methods=["GET"])
def home():
    return jsonify({"message": "Cardio Disease Prediction API is running"})

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        gender = int(data["gender"])
        height = float(data["height"])
        weight = float(data["weight"])
        ap_hi = float(data["ap_hi"])
        ap_lo = float(data["ap_lo"])
        cholesterol = int(data["cholesterol"])
        gluc = int(data["gluc"])
        smoke = int(data["smoke"])
        alco = int(data["alco"])
        active = int(data["active"])
        age_years = float(data["age"])

        input_data = np.array([[
            gender, height, weight, ap_hi, ap_lo,
            cholesterol, gluc, smoke, alco, active,
            age_years
        ]])

        input_scaled = scaler.transform(input_data)

        if hasattr(model, "predict_proba"):
            proba = float(model.predict_proba(input_scaled)[0][1])
        else:
            proba = float(model.predict(input_scaled)[0])

        if proba >= 0.75:
            risk = "HIGH RISK"
        elif proba >= 0.45:
            risk = "MODERATE RISK"
        else:
            risk = "LOW RISK"

        return jsonify({
            "risk": risk,
            "risk_score": round(proba, 2)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400


# -----------------------------
# Serve React Frontend
# -----------------------------
@app.route("/")
@app.route("/<path:path>")
def serve_react(path="index.html"):
    if os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, "index.html")


# -----------------------------
# Main
# -----------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
