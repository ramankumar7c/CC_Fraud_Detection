import os
from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load the saved model and metadata
model_path = os.path.abspath(os.path.join(os.path.dirname(__file__), 'rf_pso_model.pkl'))
if not os.path.exists(model_path):
    raise FileNotFoundError(f"Model not found at {model_path}")

model_data = joblib.load(model_path)
model = model_data["model"]
selected_feature_names = model_data["selected_feature_names"]

@app.route("/")
def health_check():
    return "✅ Fraud detection service is running!"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json

        if not data or "features" not in data:
            return jsonify({"error": "Missing 'features' in request body"}), 400

        features = data["features"]

        if len(features) != len(selected_feature_names):
            return jsonify({
                "error": f"Expected {len(selected_feature_names)} features: {selected_feature_names}, "
                         f"but got {len(features)}"
            }), 400

        features_array = np.array(features).reshape(1, -1)
        prediction = model.predict(features_array)
        return jsonify({
            "prediction": int(prediction[0]),
            "used_features": selected_feature_names
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)