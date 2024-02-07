import time
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import json
import os

app = Flask(__name__)
CORS(app)

# Set your OpenAI API key in the .env
openaiClient = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

available_models = ['gpt-3.5-turbo',
                    'gpt-3.5-turbo-1106',
                    'gpt-4',
                    'gpt-4-1106-preview']
gpt_model = available_models[1]

def prompt_gpt(topic, prev_questions):
    pre_prompt = "You are a quiz bot. You will receive a topic and your task is to create an extremely super duper hard, in-depth, practically impossible question that's super obscure related to the topic and four possible answers for the user. Don't make the question about the definition of the topic. Avoid questions that are more than 100 words long. Only one answer should be correct and the other three should be wrong. Return a JSON object with the question key labeled as 'question', with the keys for answers 1 through 4 labeled 'a1', 'a2', 'a3', and 'a4' respectively, and the correct answer key labeled as 'correct_answer' with the value either being 1, 2, 3, or 4. Avoid questions that are more than 100 words long and answers that are more than 10 words long. Make the wrong answers related to the correct answer to try to trick the guesser.\n\n"
        
    if prev_questions:
        prev_prompt = "Don't ever use these questions when generating the question:\n"
        for i in range(len(prev_questions)):
            prev_prompt += f"Question {i+1}: {prev_questions[i]}\n"
        prev_prompt += "\nTopic: "
    else:
        prev_prompt = "Topic: "

    content = pre_prompt + prev_prompt + topic

    print(f"\nCalling OpenAI API\n| Model: {gpt_model}\n| Prev Qs: {len(prev_questions)}\n| Topic: '{topic}'\n")

    completion = openaiClient.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": content,
            }
        ],
        model=gpt_model,
        # Determine valid GPT instances
        response_format={ "type": "json_object" }
    )

    return completion.choices[0].message.content

def check_gpt(generated_text, topic, prev_questions):
    content = generated_text
    try:
        evaluated = False
        attempts = 0
        while not evaluated and attempts < 5:
            try:
                print("Starting evaluation.")

                eval_prompt = "You are a double checking machine. I will provide a question and an answer, and you will tell me if that is the correct answer for the question. Your response should be a JSON object with only one key called 'evaluation' and the value should be the string '0' if it is not the correct answer or the string '1' if it is the correct answer.\n\n"

                json_content = json.loads(content)

                check_question = json_content['question']
                check_answers = [json_content['a1'], json_content['a2'], json_content['a3'], json_content['a4']]
                check_answer = check_answers[int(json_content['correct_answer'])-1]

                eval_prompt += f"Question: {check_question}\nAnswer: {check_answer}"

                print("Evaluation prompting.")
                eval_response = openaiClient.chat.completions.create(
                    messages=[
                        {
                            "role": "user",
                            "content": eval_prompt,
                        }
                    ],
                    model=available_models[3],
                    response_format={ "type": "json_object" }
                )
                print("Finished evaluation prompting.")

                eval_content = json.loads(eval_response.choices[0].message.content)

                print(f"| Eval Q: {check_question}")
                print(f"| Eval A: {check_answer}")
                
                if int(eval_content['evaluation']):
                    print('| Evaluation: Valid.')
                    evaluated = True
                else:
                    print('| Evaluation: Not valid.')
                    attempts += 1
                    content = prompt_gpt(topic, prev_questions)
            except:
                evaluated = True
                print("Error occurred during evaluation.")
    except:
        return content
    
    return content

@app.route('/api/submit', methods=['POST'])
def submit_data():
    try:
        data = request.get_json()
        topic = data.get('prompt', '')
        prev_questions = data.get('prev_questions', [])

        if len(prev_questions) > 10:
            prev_questions = prev_questions[len(prev_questions) - 10:]
        
        generated_text = prompt_gpt(topic, prev_questions)

        generated_text = check_gpt(generated_text, topic, prev_questions)

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
            print(f"\nAPI Response\n| Question: {question}\n| A1: {a1}\n| A2: {a2}\n| A3: {a3}\n| A4: {a4}\n| Correct Answer: {correct_answer}\n")

            return jsonify(result)
        except Exception as e:
            result = {'status': 'error', 'message': str(e)}
            return jsonify(result), 500
    except Exception as e:
        result = {'status': 'error', 'message': str(e)}
        return jsonify(result), 500

if __name__ == '__main__':
    app.run(debug=True)