import time
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import os

app = Flask(__name__)
CORS(app)

# Set your OpenAI API key
openaiClient = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.route('/api/submit', methods=['POST'])
def submit_data():
    try:
        data = request.get_json()
        prompt = data.get('prompt', '')
        

        
        # Make a request to the OpenAI API
        print("Making API call...")
        completion = openaiClient.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model="gpt-3.5-turbo",
        )

        generated_text = completion.choices[0].message.content

        result = {'status': 'success', 'message': generated_text}
        return jsonify(result)
    except Exception as e:
        result = {'status': 'error', 'message': str(e)}
        return jsonify(result), 500

if __name__ == '__main__':
    app.run(debug=True)