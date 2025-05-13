import pandas as pd
from firebase import firebase
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split


FBconn = firebase.FirebaseApplication('https://finalprojdb-40136-default-rtdb.europe-west1.firebasedatabase.app/', None)


data_k = FBconn.get('/AllK', None)
data_h = FBconn.get('/AllH', None)
data_n = FBconn.get('/AllN', None)


df_k = pd.DataFrame(data_k)
df_h = pd.DataFrame(data_h)
df_n = pd.DataFrame(data_n)

# Combine
df = pd.concat([df_k, df_h, df_n], ignore_index=True)

df = df.dropna()

df['Date of sale'] = pd.to_datetime(df['Date of sale'], errors='coerce', dayfirst=True)
df['SaleYear'] = df['Date of sale'].dt.year
df['SaleMonth'] = df['Date of sale'].dt.month
df = df.drop(columns=['Date of sale'])


df = pd.get_dummies(df, columns=['Type','City'])

df['Block'] = df['Block'] //10
df['old'] = df['SaleYear'].astype(int) - df['Year Bulit'].astype(int) #######
df['Price_per_sqm'] = df['Selling price in NIS'] / df['Area'] ########
df['Room_Density'] = df['Area'] / df['Rooms'] #######1

X = df.drop(columns=['Selling price in NIS'])
y = df['Selling price in NIS']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model = RandomForestRegressor()
model.fit(X_train, y_train)


score = model.score(X_test, y_test)

print(f"Model R² Score: {score:.2f}")