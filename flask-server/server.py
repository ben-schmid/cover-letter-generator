from flask import Flask, request, jsonify
from openai_api import generate_cover_letter
from mongodb import insert_data, get_all_cl, get_cl_by_id, delete_cl_by_id



app = Flask(__name__)


@app.route("/initialize_coverletter_list", methods=["GET"])
def initialize_coverletter_list():
    cl_list = get_all_cl()
    for cl in cl_list:
        cl['_id'] = str(cl['_id'])  
    return jsonify(cl_list)

@app.route("/data", methods=["POST"])
def handle_data():
    jobDescription = request.form['message']
    file = request.files['file']
    company = request.form['company']
    position = request.form['position']

    result = generate_cover_letter(jobDescription, file, company, position)
    insert_data(company, position, result)
    
    return jsonify({"coverLetter": result})

@app.route("/previous_cl", methods=["GET"])
def get_previous_data():
    cl_id = request.args.get('id')
    
    cover_letter = get_cl_by_id(cl_id)  
    if cover_letter:
        cover_letter['_id'] = str(cover_letter['_id'])  
        return jsonify(cover_letter)
    else:
        return jsonify({'error': 'Cover letter not found'}), 404
    
@app.route("/delete_coverletter", methods=["DELETE"])
def delete_coverletter():
    cl_id = request.args.get('id')
    result = delete_cl_by_id(cl_id)

    if result:
        return jsonify({'message': 'Cover letter deleted successfully'})
    else:
        return jsonify({'message': 'Cover letter not found'}), 404


    

if __name__ == "__main__":
    app.run(debug=True)

