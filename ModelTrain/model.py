import json

import pandas as pd
from firebase import firebase
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import joblib


def prepareData(df):
    # Convert 'Date of sale' column to datetime object
    df['Date of sale'] = pd.to_datetime(df['Date of sale'], errors='coerce', dayfirst=True)
    # Extract year and month from the sale date
    df['SaleYear'] = df['Date of sale'].dt.year
    df['SaleMonth'] = df['Date of sale'].dt.month
    # Drop the original 'Date of sale' column after extracting useful parts
    df = df.drop(columns=['Date of sale'])
    df = df.dropna()

    # Convert categorical variables into one-hot encoded columns
    df = pd.get_dummies(df, columns=['Type', 'City'])

    # Reduce the granularity of the 'Block' feature by grouping every 10 blocks
    df['Block'] = df['Block'] // 10
    # Calculate how old the apartment was at the time of sale
    df['old'] = df['SaleYear'].astype(int) - df['Year Built'].astype(int)
    # Calculate room density: how many square meters per room
    df['Room_Density'] = df['Area'] / df['Rooms']
    return df

def loadData():
    # FBconn = firebase.FirebaseApplication('https://finalprojdb-40136-default-rtdb.europe-west1.firebasedatabase.app/', None)
    #
    #
    # data_k = FBconn.get('/AllK', None)
    # data_h = FBconn.get('/AllH', None)
    # data_n = FBconn.get('/AllN', None)

    with open("AllKj.json", "r", encoding="utf-8") as f:
        data_k = json.load(f)
    with open("AllHj.json", "r", encoding="utf-8") as f:
        data_h = json.load(f)
    with open("AllNj.json", "r", encoding="utf-8") as f:
        data_n = json.load(f)

    # Convert loaded data into pandas DataFrames
    df_k = pd.DataFrame(data_k)
    df_h = pd.DataFrame(data_h)
    df_n = pd.DataFrame(data_n)

    # Combine all data into one DataFrame
    df = pd.concat([df_k, df_h, df_n], ignore_index=True)
    # Remove any rows with missing values
    df = df.dropna()

    return df

def trainModel(df):
    # Define input features (X) and target variable (y)
    X = df.drop(columns=['Selling price in NIS'])
    y = df['Selling price in NIS']

    # Split data into training and test sets (80% train, 20% test)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

    # Initialize and train a Random Forest model
    model = RandomForestRegressor()
    model.fit(X_train, y_train)
    joblib.dump(model, 'apartment_price_model.pkl')  # Save model
    print("Model saved to apartment_price_model.pkl")

    # Evaluate the model using R² score
    score = model.score(X_test, y_test)

    print(f"Model R² Score: {score:.2f}")

def main():
    print("Loading data...")
    df = loadData()

    print("Preprocessing data...")
    df = prepareData(df)

    print("Training model...")
    trainModel(df)


if __name__ == "__main__":
    main()


