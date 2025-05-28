import pandas as pd

# Read Excel file with date parsing
df = pd.read_excel("H1.xlsx")

# Convert the date column to datetime (if not already)
df['Date of sale'] = pd.to_datetime(df['Date of sale'])

# Format the date to "DD/MM/YYYY"
df['Date of sale'] = df['Date of sale'].dt.strftime('%d/%m/%Y')

# Export to JSON with readable date format
df.to_json("H1.json", orient="records", indent=4, force_ascii=False)
