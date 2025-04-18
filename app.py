import streamlit as st
import pandas as pd
import joblib

# Load both trained models
sales_model = joblib.load("sales_model.pkl")  # Sales prediction model
xgb_profit_model = joblib.load("xgb_model_profit_prediction.pkl")  # XGBoost profit prediction model
lgbm_profit_model = joblib.load("lgbm_model.pkl")  # LGBM profit prediction model

st.title("📊 Superstore Sales & Profit Predictor")

# Input form
with st.form("predict_form"):
    st.subheader("Enter the product details:")

    ship_mode = st.selectbox("Ship Mode", ["Standard Class", "Second Class", "First Class", "Same Day"])
    segment = st.selectbox("Segment", ["Consumer", "Corporate", "Home Office"])
    region = st.selectbox("Region", ["East", "West", "Central", "South"])
    category = st.selectbox("Category", ["Furniture", "Office Supplies", "Technology"])
    sub_category = st.selectbox("Sub-Category", ["Bookcases", "Chairs", "Phones", "Binders", "Accessories", "Others"])
    quantity = st.number_input("Quantity", min_value=1, value=1)
    profit = st.number_input("Profit", value=0.0)
    returns = st.selectbox("Returned", [0.0, 1.0])
    payment_mode = st.selectbox("Payment Mode", ["Online", "Cards", "Cash"])

    model_type = st.selectbox("Select Model", ["Predict Sales", "Predict Profit"])

    # If "Predict Profit" is selected, allow user to choose between XGBoost and LGBM models
    if model_type == "Predict Profit":
        profit_model_type = st.selectbox("Select Profit Model", ["XGBoost", "LGBM"])

    submitted = st.form_submit_button("Predict")

# Predict
if submitted:
    input_data = pd.DataFrame([{
        "Ship Mode": ship_mode,
        "Segment": segment,
        "Region": region,
        "Category": category,
        "Sub-Category": sub_category,
        "Quantity": quantity,
        "Profit": profit,
        "Returns": returns,
        "Payment Mode": payment_mode
    }])

    if model_type == "Predict Sales":
        # Predict sales using the sales model
        sales_prediction = sales_model.predict(input_data)[0]
        st.success(f"💰 Predicted Sales: ${sales_prediction:.2f}")
    elif model_type == "Predict Profit":
        # Predict profit based on the selected model
        if profit_model_type == "XGBoost":
            profit_prediction = xgb_profit_model.predict(input_data)[0]
        elif profit_model_type == "LGBM":
            profit_prediction = lgbm_profit_model.predict(input_data)[0]

        st.success(f"💰 Predicted Profit: ${profit_prediction:.2f}")
