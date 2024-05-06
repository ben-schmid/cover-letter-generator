from openai import OpenAI
import fitz 

API_KEY = ""

client = OpenAI(api_key=API_KEY)

def generate_cover_letter():

    resume = read_file()
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are an assistant that generates professional formated coverletters based on the resume and job description"},
            {"role": "user", "content": f"Based on my resume: \n\n {resume} \n\n please generate a cover letter for a retail position"}
        ]
    )

    return completion.choices[0].message.content
#print (generate_cover_letter())

def read_file():
    with fitz.open("C:/Users/Bensc/Documents/Side Projects/Coverletter-Maker/Cover-Letter-Generator/client/Ben_s_Resume_2.pdf") as doc:
        text = ""
        for page in doc:
            text += page.get_text()
    return text
    



    
        
        

        
    
    