import pandas as pd
import joblib
import sklearn
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier

print(f"Scikit-learn version: {sklearn.__version__}")

# Load data
df = pd.read_csv('preProcessed.csv')

# Features to use (excluding BMI)
feature_cols = ['gender', 'height', 'weight', 'ap_hi', 'ap_lo', 'cholesterol', 'gluc', 'smoke', 'alco', 'active', 'age_years']
X = df[feature_cols]
y = df['cardio']

# Train/Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Scale
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train Random Forest
model = RandomForestClassifier(n_estimators=100, max_depth=10, random_state=42)
model.fit(X_train_scaled, y_train)

# Evaluate
print(f"Train Accuracy: {model.score(X_train_scaled, y_train)}")
print(f"Test Accuracy: {model.score(X_test_scaled, y_test)}")

# Save directly to final names
joblib.dump(model, 'model.pkl')
joblib.dump(scaler, 'scaler_final.pkl')

print("Retraining complete. Saved model.pkl and scaler_final.pkl.")
