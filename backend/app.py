from flask import Flask, request, jsonify
import pandas as pd
import torch
from transformers import BertTokenizer, BertModel
from flask_cors import CORS
from transformers import AutoModelForCausalLM, AutoTokenizer


import multiprocessing
multiprocessing.set_start_method("spawn", force=True)



app = Flask(__name__)
CORS(app)  # Allow requests from React frontend


# Load pre-trained BERT model and tokenizer
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
bert_model = BertModel.from_pretrained("bert-base-uncased")

# Load lightweight GPT model for generating course descriptions
gpt_tokenizer = AutoTokenizer.from_pretrained("distilgpt2")
gpt_model = AutoModelForCausalLM.from_pretrained("distilgpt2")


# Load course list
courses = [
    "Information Technology", "Management Studies", "Economics and Analytics",
    "Commerce", "Management and Finance", "Accounting and Finance", "Finance Management"
]

# Load questionnaire
import os 
csv_path = os.path.join(os.path.dirname(__file__), 'questionnaire.csv')
questionnaire_df = pd.read_csv(csv_path)  # CSV format: 'Question', 'Option a', 'Option b', 'Option c', 'Option d'

#@app.route('/')
#def home():
#    return "Welcome to the Flask Course Recommendation System!"


@app.route('/questions', methods=['GET'])
def get_questions():
    questions = []
    for _, row in questionnaire_df.iterrows():
        questions.append({
            "question": row["Question"],
            "options": [row["Option a"], row["Option b"], row["Option c"], row["Option d"]]
        })
    return jsonify(questions)

# Function to get BERT embeddings
def get_bert_embedding(text):
    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True, max_length=512)
    with torch.no_grad():
        outputs = bert_model(**inputs)
    return outputs.last_hidden_state[:, 0, :].squeeze().numpy()




@app.route('/recommend', methods=['POST'])
def recommend_course():
   data = request.json
   user_responses = data.get("responses", [])
  
   user_input = " ".join(user_responses)
   user_embedding = get_bert_embedding(user_input).reshape(1, -1)




    # Dummy recommendation (Replace with ML model later)
   recommended_course = courses[hash(user_input) % len(courses)]


   # Generate course description
   prompt = f"Course: {recommended_course}. Description:"
   inputs = gpt_tokenizer(prompt, return_tensors="pt")
   input_ids = inputs["input_ids"]
   attention_mask = inputs["attention_mask"]


   output_ids = gpt_model.generate(
       input_ids,
       attention_mask=attention_mask,
       max_length=50,
       num_return_sequences=1,
       do_sample=True,
       top_p=0.95,
       top_k=60,
       pad_token_id=gpt_tokenizer.eos_token_id
       )


   generated_text = gpt_tokenizer.decode(output_ids[0], skip_special_tokens=True)


   # Trim to get just the description
   course_description = generated_text.replace(prompt, "").strip()


   return jsonify({
       "recommended_course": recommended_course,
       "description": course_description
   })



if __name__ == '__main__':
    app.run(debug=False)
