import React, { useState, useEffect } from 'react';
import { Button, Box, TextField, Stack, styled } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const format_message = (text) => {
  return text.split('\n').map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


function App() {
  const [message, setMessage] = useState("");
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [position, setPosition] = useState("")
  const[comapny, setCompany] = useState("")


  const handleInputChange = (event) => {
    setInput(event.target.value)
  }
  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  }
  const handlePositionChange = (event) =>{
    setPosition(event.target.value)
  }
  const handleCompanyChange = (event) =>{
    setCompany(event.target.value)
  }

  const sendData = () => {
    const formData = new FormData();
    formData.append('message', input)
    formData.append('file' , file);
    formData.append('company', comapny)
    formData.append('position', position)

    fetch('/data', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      setMessage(data.coverLetter);
      console.log(data);
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div className="app">
      <section className="sidebar">
        <Button variant="contained">New Chat</Button>
      </section>

      <section className="main">
        <div className="message-container">
          {message ? (
            <p>{format_message(message)}</p>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <section className="bottom-section">
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '24ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField 
              id="company-name" 
              label="Company Name" 
              variant="outlined" 
              onChange={handleCompanyChange}
              />
            <TextField 
              id="position-name" 
              label="Position" 
              variant="outlined"
              onChange={handlePositionChange}
               />
          </Box>


          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '50ch' },
            }}
            noValidate
            autoComplete="off"
          >
            
            <Stack direction="row" spacing={2}>
              <TextField
                id="job-description"
                label="Job Description"
                multiline
                maxRows={4}
                value = {input}
                onChange={handleInputChange}
              />
             <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
          <VisuallyHiddenInput type="file" accept="application/pdf" onChange={handleFileChange} />
        </Button>
              <Button 
                onClick={sendData} 
                variant="contained" 
                endIcon={<SendIcon />}>
                Send
              </Button>
            </Stack>
          </Box>
        </section>
      </section>
    </div>
  );
}

export default App;