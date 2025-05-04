import requests

url = "http://127.0.0.1:5000/recommend"

# Dummy data - 18 fake answers (same structure as what React sends)
data = {
    "responses": ["Option A"] * 18
}

try:
    response = requests.post(url, json=data)
    print("Status Code:", response.status_code)
    print("Response JSON:", response.json())
except Exception as e:
    print("Error:", e)
