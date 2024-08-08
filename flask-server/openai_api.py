from openai import OpenAI
import fitz 



client = OpenAI()

def generate_cover_letter(data,file,company, position):
    resume = read_file(file)

    #resume = read_file(file)
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are an assistant that generates professional formated coverletters based on the resume and job description"},
            {"role": "user", "content": f"Based on my resume: \n\n {resume} \n\n and this job description \n\n {data} \n\n please generate a cover letter for a job title of {position} at company name {company}. Please ONLY include my cover letter in the response"}
        ]
    )

    return completion.choices[0].message.content
#print (generate_cover_letter())

def read_file(file):
    with fitz.open(stream=file.read(), filetype="pdf") as doc:
        text = ""
        for page in doc:
            text += page.get_text()
    return text
    



    
        
        

        
    
    