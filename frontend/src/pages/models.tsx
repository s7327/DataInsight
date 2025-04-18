import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ModelsPage() {
  const [formData, setFormData] = useState({
    "Order Date": "",
    "Ship Mode": "",
    "Segment": "",
    "Region": "",
    "Category": "",
    "Sub-Category": "",
    "Quantity": "",
    "Profit": "",
    "Returns": "",
    "Payment Mode": "",
  });

  const [modelType, setModelType] = useState("sales");
  const [modelName, setModelName] = useState("hgb");
  const [prediction, setPrediction] = useState(null);

  // Whenever modelType flips, reset modelName to a valid default
  useEffect(() => {
    setModelName(modelType === "sales" ? "hgb" : "lgbm");
  }, [modelType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      model_type: modelType,
      model_name: modelName,
    };

    try {
      const res = await axios.post("http://localhost:5000/predict", payload);
      setPrediction(res.data.prediction);
    } catch (err) {
      console.error(err);
      alert("Error making prediction: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Predict Sales or Profit</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date */}
        <div>
          <label className="block mb-1">Order Date</label>
          <input
            type="date"
            name="Order Date"
            value={formData["Order Date"]}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Categorical & numeric features */}
        <div className="grid grid-cols-2 gap-4">
          {/* Ship Mode */}
          <div>
            <label className="block mb-1">Ship Mode</label>
            <select
              name="Ship Mode"
              value={formData["Ship Mode"]}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            >
              <option value="">Select Ship Mode</option>
              <option value="Standard Class">Standard Class</option>
              <option value="Second Class">Second Class</option>
              <option value="First Class">First Class</option>
              <option value="Same Day">Same Day</option>
            </select>
          </div>

          {/* Segment */}
          <div>
            <label className="block mb-1">Segment</label>
            <select
              name="Segment"
              value={formData["Segment"]}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            >
              <option value="">Select Segment</option>
              <option value="Consumer">Consumer</option>
              <option value="Corporate">Corporate</option>
              <option value="Home Office">Home Office</option>
            </select>
          </div>

          {/* Region */}
          <div>
            <label className="block mb-1">Region</label>
            <select
              name="Region"
              value={formData["Region"]}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            >
              <option value="">Select Region</option>
              <option value="East">East</option>
              <option value="West">West</option>
              <option value="Central">Central</option>
              <option value="South">South</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1">Category</label>
            <select
              name="Category"
              value={formData["Category"]}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            >
              <option value="">Select Category</option>
              <option value="Furniture">Furniture</option>
              <option value="Office Supplies">Office Supplies</option>
              <option value="Technology">Technology</option>
            </select>
          </div>

          {/* Sub-Category */}
          <div>
            <label className="block mb-1">Sub-Category</label>
            <select
              name="Sub-Category"
              value={formData["Sub-Category"]}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            >
              <option value="">Select Sub-Category</option>
              {/* Add all your sub-categories here */}
              <option value="Bookcases">Bookcases</option>
              <option value="Chairs">Chairs</option>
              {/* … */}
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className="block mb-1">Quantity</label>
            <input
              type="number"
              name="Quantity"
              value={formData["Quantity"]}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>

          {/* Profit */}
          <div>
            <label className="block mb-1">Profit</label>
            <input
              type="number"
              step="0.01"
              name="Profit"
              value={formData["Profit"]}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>

          {/* Returns */}
          <div>
            <label className="block mb-1">Returns</label>
            <select
              name="Returns"
              value={formData["Returns"]}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            >
              <option value="">Returned?</option>
              <option value="0.0">No</option>
              <option value="1.0">Yes</option>
            </select>
          </div>

          {/* Payment Mode */}
          <div>
            <label className="block mb-1">Payment Mode</label>
            <select
              name="Payment Mode"
              value={formData["Payment Mode"]}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            >
              <option value="">Select Payment Mode</option>
              <option value="Online">Online</option>
              <option value="Cards">Cards</option>
              <option value="Cash">Cash</option>
            </select>
          </div>
        </div>

        {/* Model selection */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1">Model Type</label>
            <select
              value={modelType}
              onChange={(e) => setModelType(e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="sales">Sales</option>
              <option value="profit">Profit</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block mb-1">
              {modelType === "sales" ? "Sales Model" : "Profit Model"}
            </label>
            <select
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              className="w-full border rounded p-2"
            >
              {modelType === "sales" ? (
  <>
    <option value="hgb">CatBoost</option>
  </>
) : (
  <>
    <option value="lgbm">LightGBM</option>
  </>
)}

            </select>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Predict
        </button>
      </form>

      {prediction !== null && (
        <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
          <strong>Prediction:</strong> ${prediction.toFixed(2)}
        </div>
      )}
    </div>
  );
}
