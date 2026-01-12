import joblib
import numpy as np
import os
import pandas as pd

# Load model and scaler
try:
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    SCALER_PATH = os.path.join(BASE_DIR, "scaler_final.pkl")
    MODEL_PATH = os.path.join(BASE_DIR, "model.pkl")
    
    scaler = joblib.load(SCALER_PATH)
    model = joblib.load(MODEL_PATH)
    
    print("Model and Scaler loaded.")
    
    # User inputs from screenshot
    # Gender: Male -> 2 (assuming 1=Female, 2=Male based on typical cardio dataset, need to verify if user app sends 1/2)
    # Predict.js sends: <option value="2">Male</option> -> form.gender is "2".
    gender = 2
    height = 165
    weight = 98
    ap_hi = 170
    ap_lo = 110
    cholesterol = 3 # Well Above Normal
    gluc = 3 # Well Above Normal
    smoke = 1 # Yes
    alco = 1 # Yes
    active = 0 # No (Physically active? No -> 0)
    age_years = 55
    
    # Feature order: ['gender', 'height', 'weight', 'ap_hi', 'ap_lo', 'cholesterol', 'gluc', 'smoke', 'alco', 'active', 'age_years']
    input_features = np.array([[
        gender, height, weight, ap_hi, ap_lo, 
        cholesterol, gluc, smoke, alco, active, 
        age_years
    ]])
    
    print(f"Input features: {input_features}")
    
    # Scale
    input_scaled = scaler.transform(input_features)
    print(f"Scaled features: {input_scaled}")
    
    # Predict
    if hasattr(model, "predict_proba"):
        proba = model.predict_proba(input_scaled)
        print(f"Prediction Probabilities: {proba}")
        print(f"Risk Score (Class 1): {proba[0][1]}")
    else:
        pred = model.predict(input_scaled)
        print(f"Prediction (Class): {pred}")

except Exception as e:
    print(f"Error: {e}")
