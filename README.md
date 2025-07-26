# Real Estate Price Prediction System

A full-stack web application that predicts real estate prices in Israel using machine learning. The system combines a Python Flask backend with a React.js frontend to provide accurate property price estimates based on various property characteristics.

## Features

- **Price Prediction**: Get accurate property price estimates based on area, rooms, location, and other factors
- **Interactive Interface**: User-friendly React-based frontend with responsive design
- **Detailed Reports**: Download comprehensive estimation reports
- **Real-time Processing**: Fast prediction results using pre-trained machine learning models

## Technology Stack

### Backend
- **Language**: Python 3.12+
- **Framework**: Flask
- **Machine Learning**: scikit-learn
- **Data Processing**: pandas
- **Model Serialization**: joblib

### Frontend
- **Framework**: React.js
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Node.js**: v16+

## System Requirements

### Backend Requirements
- Python 3.12 or higher
- pip (Python package manager)

### Frontend Requirements
- Node.js v16 or higher
- npm (Node package manager)

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Asaad164/FinalProject.git
cd FinalProject
```

### 2. Backend Setup (ServerFlask)

Navigate to the backend directory:
```bash
cd ServerFlask
```

Install Python dependencies:
```bash
pip install -r requirements.txt
```

Ensure the trained model file `apartment_price_model.pkl` is present in the ServerFlask folder.

Start the Flask server:
```bash
python server.py
```

The backend server will run on `http://localhost:5000` (or the port specified in your configuration).

### 3. Frontend Setup (real-estate-app)

Open a new terminal and navigate to the frontend directory:
```bash
cd real-estate-app
```

Install Node.js dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

The frontend application will be available at `http://localhost:3000` (or the port shown in your terminal).

## Project Structure

```
<img width="865" height="857" alt="image" src="https://github.com/user-attachments/assets/a8e1fb9c-9cbb-4645-818b-9f2672f566a7" />

```

##  Usage

1. **Start both servers**: Ensure both the Flask backend and React frontend are running
2. **Navigate to the application**: Open your browser and go to the frontend URL
3. **Enter property details**: Fill in the property form with:
   - Area (m²)
   - Number of rooms
   - Year built
   - Block number
   - Sale date
   - City
   - Property type
   - Sold part
4. **Get prediction**: Submit the form to receive an estimated price range
5. **Download report**: Optionally download a detailed estimation report

## Model Information

The system uses a pre-trained machine learning model (`apartment_price_model.pkl`) that analyzes various property features to predict prices. The model is trained on real estate transaction data from Israel and provides price estimates based on:

- Property area
- Number of rooms
- Construction year
- Location (city and block)
- Property type
- Sale date
- Sold part percentage

## Extending the System

### Adding New Cities

1. Obtain real estate data for the new city (recommended source: Israel Tax Authority)
2. Format the data according to the required JSON structure:
```json
{
  "Block": "<block_number>",
  "Date of sale": "<sale_date>",
  "Selling price in NIS": "<property_price>",
  "Type": "<property_type>",
  "Sold part": "<sold_percentage>",
  "City": "<city_name>",
  "Year Built": "<construction_year>",
  "Area": "<area_in_m2>",
  "Rooms": "<number_of_rooms>"
}
```
3. Use the training code in `ModelTrain/model.py` to retrain the model
4. Replace the old model file with the newly trained `apartment_price_model.pkl`

### Improving Accuracy

For better prediction accuracy:
- Regularly update the dataset with new transaction data
- Retrain the model monthly or quarterly
- Consider integrating real-time data feeds from official sources
- Expand the feature set with additional property characteristics

## License

This project was developed as part of an academic capstone.

---

**Note**: This system is designed for educational and research purposes. For professional real estate valuations, consult with certified appraisers and real estate professionals.
