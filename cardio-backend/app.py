from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)

# ✅ Proper CORS configuration for React frontend
CORS(
    app,
    resources={r"/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"]}},
    supports_credentials=True,
)

# Load trained model & scaler
model = joblib.load("rf_model.pkl")
scaler = joblib.load("scaler.pkl")

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Cardio Disease Prediction API is running"})

# ✅ Allow POST + OPTIONS (important)
@app.route("/predict", methods=["POST", "OPTIONS"])
def predict():

    # 🔁 Handle preflight request
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight OK"}), 200

    try:
        data = request.get_json(force=True)

        # ---------- INPUTS ----------
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

        # ---------- BMI ----------
        height_m = height / 100
        bmi = round(weight / (height_m ** 2), 2)

        # ---------- MODEL INPUT ----------
        input_data = np.array([[
            gender, height, weight, ap_hi, ap_lo,
            cholesterol, gluc, smoke, alco, active,
            age_years, bmi
        ]])

        input_scaled = scaler.transform(input_data)

        # ---------- MODEL PREDICTION ----------
        if hasattr(model, "predict_proba"):
            proba = model.predict_proba(input_scaled)[0][1]
        else:
            proba = float(model.predict(input_scaled)[0])

        # ---------- MEDICAL RULE OVERRIDE ----------
        if bmi >= 35:
            risk = "HIGH RISK (Severe Obesity)"
        elif bmi >= 30 and ap_hi >= 140:
            risk = "HIGH RISK (Obesity + High BP)"
        elif proba >= 0.75:
            risk = "HIGH RISK"
        elif proba >= 0.45:
            risk = "MODERATE RISK"
        else:
            risk = "LOW RISK"

        # ---------- RESPONSE ----------
        return jsonify({
            "risk": risk,
            "risk_score": round(proba, 2),
            "bmi": bmi
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
