import os
from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

model_path = os.path.abspath(os.path.join(os.path.dirname(__file__), 'fraud_detection_model.pkl'))
if not os.path.exists(model_path):
    raise FileNotFoundError(f"Model not found at {model_path}")

model = joblib.load(model_path)

selected_features = ['distance_from_home', 'distance_from_last_transaction',
                      'ratio_to_median_purchase_price', 'used_chip',
                      'used_pin_number', 'online_order']

@app.route("/")
def health_check():
    return "Service is running!"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        if len(data["features"]) != len(selected_features):
            return jsonify({"error": f"Expected {len(selected_features)} features, but got {len(data['features'])}"}), 400

        features = np.array(data["features"]).reshape(1, -1)
        prediction = model.predict(features)
        return jsonify({"prediction": int(prediction[0])})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)