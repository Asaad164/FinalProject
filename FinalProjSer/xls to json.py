import pandas as pd

# Load the Excel file (you can specify a sheet name if needed)
df = pd.read_excel("AllH.xlsx")  # Adjust sheet name as needed

# Convert to JSON
df.to_json("AllHj.json", orient="records",indent=4)  # "records" gives you a list of dictionaries
