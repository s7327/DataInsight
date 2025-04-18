import os
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from joblib import load

# ─── CONFIG ────────────────────────────────────────────────────────────────────
logging.basicConfig(level=logging.DEBUG)
app = Flask(__name__)
CORS(app)

def extract_date_parts(df):
    df = df.copy()
    df["Order Year"] = df["Order Date"].dt.year
    df["Order Month"] = df["Order Date"].dt.month
    df["Order Day"] = df["Order Date"].dt.day
    return df

# Define paths for all your models
MODEL_PATHS = {
    "sales": {
        "rfr": r"C:\Users\Ayan Jain\Desktop\DataInsight\backend\models\sales_randomforest_pipeline.joblib",  # RandomForestRegressor
        "catboost": r"C:\Users\Ayan Jain\Desktop\DataInsight\backend\models\catboost_pipeline.joblib",  # CatBoost
        "hgb": r"C:\Users\Ayan Jain\Desktop\DataInsight\backend\models\sales_hgb_pipeline.joblib",  # HistGradientBoostingRegressor
    },
    "profit": {
        "lgbm": r"C:\Users\Ayan Jain\Desktop\DataInsight\backend\models\profit_lgbm_pipeline.joblib",  # LightGBM
        "svr": r"C:\Users\Ayan Jain\Desktop\DataInsight\backend\models\svr_pipeline.joblib",  # SVR
        "xgb": r"C:\Users\Ayan Jain\Desktop\DataInsight\backend\models\xgb_pipeline.joblib",  # XGBoost
    }
}# ─── LOAD MODELS ───────────────────────────────────────────────────────────────
models = {
    "sales": {},
    "profit": {}
}

# Load all models
for model_type in MODEL_PATHS:
    for model_name, model_path in MODEL_PATHS[model_type].items():
        try:
            models[model_type][model_name] = load(model_path)
            logging.info(f"✅ {model_name} model for {model_type} loaded")
        except Exception as e:
            models[model_type][model_name] = None
            logging.error(f"❌ Failed to load {model_name} model for {model_type}: {e}")

# ─── API ENDPOINT ──────────────────────────────────────────────────────────────
@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    model_type = data.get("model_type")
    model_name = data.get("model_name")

    if not model_type or not model_name:
        return jsonify({"error": "Missing 'model_type' or 'model_name'"}), 400

    if model_type not in models or model_name not in models[model_type]:
        return jsonify({"error": f"Model '{model_name}' for '{model_type}' not found"}), 400

    model = models[model_type].get(model_name)
    if model is None:
        return jsonify({"error": f"Model '{model_name}' not loaded"}), 400

    try:
        df = pd.DataFrame([data])

        if "Order Date" not in df.columns:
            return jsonify({"error": "Order Date is required"}), 400

        df["Order Date"] = pd.to_datetime(df["Order Date"], format="%Y-%m-%d")
        df["Order Year"] = df["Order Date"].dt.year
        df["Order Month"] = df["Order Date"].dt.month
        df["Order Day"] = df["Order Date"].dt.day

        # Prediction
        prediction = model.predict(df)
        return jsonify({"prediction": float(prediction[0])})

    except Exception as e:
        logging.exception("Prediction failed")
        return jsonify({"error": str(e)}), 500

# ─── RUN SERVER ────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
