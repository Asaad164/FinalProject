import joblib
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
# Enable CORS to allow requests from frontend applications (e.g., React)
CORS(app)
# Load the pre-trained machine learning model
model = joblib.load('apartment_price_model.pkl')

# Retrieve the expected feature names from the trained model
expected_features = model.feature_names_in_
@app.route('/predict', methods=['POST'])
def predict():
    # Parse JSON data from the POST request
    data = request.get_json()
    print("Received data from frontend:", data)

    # Create a DataFrame from the received data
    df = pd.DataFrame([data])

    #prepare and preprocess the data
    final_df = prepareData(df)

    # Predict
    predicted_price = model.predict(final_df)[0]
    rng = predicted_price * 0.08
    print(f"\nposted data to frontend: Predicted Price: {predicted_price - rng:,.2f}₪   to {predicted_price + rng:,.2f}₪")
    return jsonify({
        "Predicted Price": f"{predicted_price - rng:,.2f}₪ to {predicted_price + rng:,.2f}₪"
    })

def prepareData(df):

    # Simplify 'Block' to reduce granularity
    df['Block'] = df['Block'].astype(int) // 10
    # Parse 'Date of sale' and extract year and month
    df['Date of sale'] = pd.to_datetime(df['Date of sale'], dayfirst=True)
    df['SaleYear'] = df['Date of sale'].dt.year
    df['SaleMonth'] = df['Date of sale'].dt.month

    # Calculate 'old' feature
    df['old'] = df['SaleYear'].astype(int) - df['Year Built'].astype(int)

    # Calculate 'room density' feature
    df['Room_Density'] = df['Area'].astype(int) / df['Rooms'].astype(int)

    # Drop original date
    df = df.drop(columns=['Date of sale'])

    # One-hot encode City and Type
    df = pd.get_dummies(df, columns=['City', 'Type'], drop_first=False)

    # Create a final DataFrame with the exact order and set of features expected by the model
    final_df = pd.DataFrame(columns=expected_features)

    # Populate the new DataFrame with our data (to make the data sorted the same as in model fit)
    for feature in expected_features:
        if feature in df.columns:
            final_df[feature] = df[feature]
        else:
            final_df[feature] = 0

    return final_df

if __name__ == '__main__':
    app.run(debug=True)