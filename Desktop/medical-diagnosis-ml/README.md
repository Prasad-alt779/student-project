# Medical Diagnosis ML API

## 📋 Overview
An AI-powered medical diagnosis classifier using Flask and RandomForest machine learning model.

## 🏗️ Code Structure

### Step 1: Import Libraries
```python
from flask import Flask, request, jsonify
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
```

### Step 2: Initialize Flask App
```python
app = Flask(__name__)
```

### Step 3: Prepare Training Data
Creates a dataset with 8 patient records containing:
- **Features**: fever, cough, headache, fatigue (0 or 1)
- **Target**: disease diagnosis

### Step 4: Train ML Model
```python
X = data[['fever', 'cough', 'headache', 'fatigue']]
y = data['disease']
model = RandomForestClassifier(random_state=42)
model.fit(X, y)
```

### Step 5: Create API Endpoints

#### Endpoint 1: Health Check
- **URL**: `GET http://localhost:5000/`
- **Response**:
```json
{
  "message": "Medical Diagnosis API Running",
  "version": "1.0",
  "status": "OK"
}
```

#### Endpoint 2: Make Prediction
- **URL**: `POST http://localhost:5000/predict`
- **Request**:
```json
{
  "features": [1, 1, 1, 1]
}
```
- **Response**:
```json
{
  "disease": "Flu",
  "confidence": "High",
  "success": true
}
```

## 🚀 How to Run

### 1. Install Dependencies
```bash
pip install flask pandas scikit-learn
```

### 2. Start the Server
```bash
python app.py
```

### 3. Test the API

**Health Check:**
```bash
curl http://localhost:5000/
```

**Make Prediction:**
```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"features": [1, 1, 1, 1]}'
```

## 📊 Features Guide

| Feature | Value | Meaning |
|---------|-------|---------|
| fever | 0 or 1 | No fever / Has fever |
| cough | 0 or 1 | No cough / Has cough |
| headache | 0 or 1 | No headache / Has headache |
| fatigue | 0 or 1 | No fatigue / Has fatigue |

## 🎯 Predicted Diseases
- Flu
- Cold
- Allergy
- Dengue
- Malaria

## ✅ Status
- ✅ Code: Clean and Working
- ✅ Syntax: Verified
- ✅ API: Tested
- ✅ GitHub: Committed and Pushed
- ✅ Server: Ready to Run
