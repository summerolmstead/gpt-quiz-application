import time
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import json
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
        
        preprompt = "You are a quiz bot. You will receive a topic and your task is to create a question related to the topic and four possible answers for the user. Avoid questions that are more than 100 words long. Only one answer should be correct and the other three should be wrong. Return a JSON object with the question key labeled as 'question', with each answer key labeled 'a1', 'a2', 'a3', and 'a4' respectively, and the correct answer key labeled as 'correct_answer' with the value either being 1, 2, 3, or 4. Avoid questions that are more than 100 words long and answers that are more than 10 words long. Make the question somewhat abstract. \n\nTopic: "
        
        completion = openaiClient.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": preprompt + prompt,
                }
            ],
            model="gpt-3.5-turbo-1106",
            response_format={ "type": "json_object" }
        )

        generated_text = completion.choices[0].message.content

        try:
            json_content = json.loads(generated_text)

            question = json_content['question']
            a1, a2, a3, a4 = json_content['a1'], json_content['a2'], json_content['a3'], json_content['a4']
            correct_answer = json_content['correct_answer']
            
            result = {'status': 'success', 'content': 
                {
                    'question': question,
                    'a1': a1,
                    'a2': a2,
                    'a3': a3,
                    'a4': a4,
                    'correct_answer': correct_answer
                }
            }
            return jsonify(result)
        except Exception as e:
            result = {'status': 'error', 'message': str(e)}
            return jsonify(result), 500
    except Exception as e:
        result = {'status': 'error', 'message': str(e)}
        return jsonify(result), 500

if __name__ == '__main__':
    app.run(debug=True)