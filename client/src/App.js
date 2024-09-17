import React, { useState, useEffect } from 'react';
import { Button, IconButton, List, ListItem, Box, TextField, Stack,
   styled, Alert, CircularProgress} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
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
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [position, setPosition] = useState("")
  const [company, setCompany] = useState("")
  const [sideButtons, setSideButtons] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch("/initialize_coverletter_list")
      .then(response => response.json())
      .then(data => {
        const buttons = data.map(item =>({
          id: item._id,
          company: item.company,
          position: item.position,
        }));
        setSideButtons(buttons)
      })
  },[])

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

  const sendData = async () => {
    if (!company || !position || !file){
      setErrorMessage('Please fill in all required fields.')
      return;
        
      
    }
    setIsLoading(true)
    const formData = new FormData();
    formData.append('message', input)
    formData.append('file' , file);
    formData.append('company', company)
    formData.append('position', position)


    try { 
      const response = await fetch('/data', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setMessage(data.coverLetter);
      setSideButtons((prevSideButtons) => [
        ...prevSideButtons,
        { id: data._id, company, position }
      ])
    } catch(error) {
      console.error('Error:', error);
      setErrorMessage('An error occured while sending data. Please try again')
    };
    setIsLoading(false);
  }

  const handleDeleteCoverLetter =  async (coverLetterIdID) => {

  }

  const handleSideButtonClick = (sideButtonId) => {
    fetch(`/previous_cl?id=${sideButtonId}`)
      .then(response => response.json())
      .then(data => {
        setMessage(data.cover_letter);
      })
      .catch(error => console.error('Error:', error));
  }



  return (
    <div className="app">
      <section className="sidebar">
        <h1>Your Cover Letters</h1>
          <List>
          {sideButtons.map((sideButton) => (
            <ListItem
              key={sideButton.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  // onClick={() =>handleDeleteCoverLEtter(sideButton.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
              }
              >
                <Button
                  variant="text"
                  onClick={()=>handleSideButtonClick(sideButton.id)}
                  style={{ textTransform: 'none'}}
                >
                  {sideButton.company} - {sideButton.position}
                </Button>
              </ListItem>
          ))}
        </List>
      </section>

      <section className="main">
        <div className="message-container">
          {errorMessage &&(
            <Alert severity="error" onClose={() =>setErrorMessage('')}>
              {errorMessage}
            </Alert>
          )}
          {message ? (
            <p>{format_message(message)}</p>
          ) : 
            <p></p>
          }
        </div>

        <section className="bottom-section">
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: 'calc(50% - 16px)'  },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField 
              id="company-name" 
              label="Company Name" 
              variant="outlined" 
              value={company}
              onChange={handleCompanyChange}
              />
            <TextField 
              id="position-name" 
              label="Position" 
              variant="outlined"
              value={position}
              onChange={handlePositionChange}
               />
          </Box>


          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: 'calc(50% - 16px)'  },
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
              variant="contained"
              startIcon={<CloudUploadIcon />}
              >
                Upload file
                <VisuallyHiddenInput
                  type="file" 
                  accept="application/pdf" 
                  onChange={handleFileChange}
                />
              </Button>
              <Button 
                onClick={sendData} 
                variant="contained" 
                endIcon={<SendIcon />}
              >
                {isLoading ? <CircularProgress />: 'Send'}
              </Button>
            </Stack>
          </Box>
        </section>
      </section>
    </div>
  );
}

export default App;