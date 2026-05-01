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