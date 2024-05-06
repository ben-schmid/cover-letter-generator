from flask import Flask, request, jsonify
from openai_api import generate_cover_letter


app = Flask(__name__)


#members API route

@app.route("/chat")
def members():
    result = generate_cover_letter()

    return jsonify({'message': result})

if __name__ == "__main__":
    app.run(debug=True)

