import json
import pandas as pd
import joblib


# First, load the model to see what features it expects
model = joblib.load('apartment_price_model.pkl')

expected_features = model.feature_names_in_

# Load JSON data
with open("ra.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Build DataFrame from the single record
df = pd.DataFrame([data])

# Preprocess Date
df['Block'] = df['Block'] //10
df['Date of sale'] = pd.to_datetime(df['Date of sale'], dayfirst=True)
df['SaleYear'] = df['Date of sale'].dt.year
df['SaleMonth'] = df['Date of sale'].dt.month

# Calculate 'old' feature
df['old'] = df['SaleYear'] - df['Year Bulit']
df['Room_Density'] = df['Area'] / df['Rooms']

# Drop original date
df = df.drop(columns=['Date of sale'])

# One-hot encode City and Type
df = pd.get_dummies(df, columns=['City', 'Type'], drop_first=False)


# Create a new DataFrame with exactly the columns the model expects, in the right order
final_df = pd.DataFrame(columns=expected_features)

# Populate the new DataFrame with our data
for feature in expected_features:
    if feature in df.columns:
        final_df[feature] = df[feature]
    else:
        final_df[feature] = 0


# Predict
predicted_price = model.predict(final_df)[0]
rng = predicted_price*0.08
print(f"\nPredicted Price: {predicted_price-rng:,.2f} NIS   to {predicted_price+rng:,.2f} NIS")