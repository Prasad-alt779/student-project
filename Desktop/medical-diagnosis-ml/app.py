from flask import Flask, request, jsonify
import pandas as pd
from sklearn.ensemble import RandomForestClassifier

# Step 1: Create Flask App
app = Flask(__name__)

# Step 2: Prepare Training Data
data = pd.DataFrame({
    'fever': [1, 1, 0, 1, 0, 1, 0, 1],
    'cough': [1, 1, 1, 0, 0, 1, 1, 0],
    'headache': [1, 0, 1, 1, 1, 1, 0, 0],
    'fatigue': [1, 1, 0, 1, 1, 1, 0, 1],
    'disease': ['Flu', 'Cold', 'Allergy', 'Dengue', 'Malaria', 'Flu', 'Allergy', 'Dengue']
})

# Step 3: Train ML Model
X = data[['fever', 'cough', 'headache', 'fatigue']]
y = data['disease']
model = RandomForestClassifier(random_state=42)
model.fit(X, y)

# Step 4: API Endpoint - Health Check
@app.route('/')
def home():
    return jsonify({
        'message': 'Medical Diagnosis API Running',
        'version': '1.0',
        'status': 'OK'
    })

# Step 5: API Endpoint - Predict Disease
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data
        data_json = request.get_json()
        
        # Extract features
        features = data_json.get('features')
        
        # Validate input
        if features is None:
            return jsonify({
                'error': 'Missing features field',
                'example': {'features': [1, 1, 1, 1]},
                'fields': ['fever', 'cough', 'headache', 'fatigue']
            }), 400
        
        if len(features) != 4:
            return jsonify({
                'error': f'Expected 4 features, got {len(features)}',
                'fields': ['fever', 'cough', 'headache', 'fatigue']
            }), 400
        
        # Make prediction
        prediction = model.predict([features])[0]
        
        return jsonify({
            'disease': str(prediction),
            'confidence': 'High',
            'success': True
        })
    
    except Exception as e:
        return jsonify({
            'error': str(e),
            'success': False
        }), 500

# Step 6: Run the server
if __name__ == '__main__':
    print("=" * 60)
    print("Medical Diagnosis ML API")
    print("=" * 60)
    print("\nEndpoints:")
    print("  GET  http://localhost:5000/             (Health Check)")
    print("  POST http://localhost:5000/predict      (Make Prediction)")
    print("\nExample:")
    print("  curl -X POST http://localhost:5000/predict")
    print("       -H 'Content-Type: application/json'")
    print("       -d '{\"features\": [1, 1, 1, 1]}'")
    print("\n" + "=" * 60)
    app.run(debug=True, host='0.0.0.0', port=5000)
# AI-Powered Medical Diagnosis Classifier (One-File Project)

from flask import Flask, request, jsonify
import pandas as pd
from sklearn.ensemble import RandomForestClassifier

# Create Dataset
data = pd.DataFrame({
    'fever':    [1,1,0,1,0,1,0,1],
    'cough':    [1,1,1,0,0,1,1,0],
    'headache': [1,0,1,1,1,1,0,0],
    'fatigue':  [1,1,0,1,1,1,0,1],
    'disease':  ['Flu','Cold','Allergy','Dengue','Malaria','Flu','Allergy','Dengue']
})

# Train Model
X = data[['fever','cough','headache','fatigue']]
y = data['disease']

model = RandomForestClassifier(random_state=42)
model.fit(X, y)

# Create Flask App
app = Flask(__name__)

@app.route('/')
def home():
    return "Medical Diagnosis Classifier Running"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        input_data = request.json['features']  # Example: [1,1,1,1]
        prediction = model.predict([input_data])[0]
        return jsonify({'disease': str(prediction), 'success': True})
    except Exception as e:
        return jsonify({'error': str(e), 'success': False}), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)