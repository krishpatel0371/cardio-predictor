import joblib
import os
import numpy as np

try:
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    SCALER_PATH = os.path.join(BASE_DIR, "scaler_final.pkl")
    
    print(f"Loading scaler from: {SCALER_PATH}")
    scaler = joblib.load(SCALER_PATH)
    
    print("Scaler loaded.")
    print(f"Type: {type(scaler)}")
    
    # Check if fitted (StandardScaler usually has mean_ attribute)
    if hasattr(scaler, 'mean_'):
        print(f"Scaler mean_: {scaler.mean_}")
    else:
        print("WARNING: Scaler does not appear to have 'mean_' attribute (might not be fitted).")
        
    # Try a dummy transform
    dummy_input = np.array([[1, 170, 70, 120, 80, 1, 1, 0, 0, 1, 30]]) # 11 features
    print("Attempting transform...")
    transformed = scaler.transform(dummy_input)
    print("Transform successful.")
    print(f"Transformed output: {transformed}")

except Exception as e:
    print(f"ERROR: {e}")
