from flask import Flask, request, jsonify
from openai_api import generate_cover_letter, read_file


app = Flask(__name__)


@app.route("/data", methods=["POST"])
def handle_data():
    jobDescription = request.form['message']
    file = request.files['file']
    result = generate_cover_letter(jobDescription, file)
    return jsonify({"coverLetter": result})

@app.route("/chat", methods=["GET"])
def chat():
    return jsonify({"coverLetter": ""})

if __name__ == "__main__":
    app.run(debug=True)

