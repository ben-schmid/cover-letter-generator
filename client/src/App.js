import React, { useState, useEffect } from 'react';
import { Button, Box, TextField, Stack, styled,  Menu, MenuItem} from '@mui/material';
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [message, setMessage] = useState("");
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [position, setPosition] = useState("")
  const[company, setCompany] = useState("")
  const [sideButtons, setSideButtons] = useState([])
  const [anchorEl, setAnchorEl] = useState(null)

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

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  


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
    formData.append('company', company)
    formData.append('position', position)

    fetch('/data', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      setMessage(data.coverLetter);
      setSideButtons(prevSideButtons => [
        ...prevSideButtons,
        { id: data._id, company: company, position: position }
      ]);
    })
    .catch(error => console.error('Error:', error));
  };

  const handleSideButtonClick = (sideButtonId) => {
    fetch(`/previous_cl?id=${sideButtonId}`)
      .then(response => response.json())
      .then(data => {
        setMessage(data.cover_letter);
      })
      .catch(error => console.error('Error:', error));
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null)
  }



  return (
    <div className="app">
      <section className="sidebar">
        <Button variant="contained" onClick={handleMenuOpen}>Previous CV</Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {sideButtons.map((sideButton, index) => (
            <MenuItem key={index} onClick={() => handleSideButtonClick(sideButton.id)}>
              {sideButton.company} - {sideButton.position}
            </MenuItem>
          ))}
        </Menu>

      </section>

      <section className="main">
        <div className="message-container">
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
              '& .MuiTextField-root': { m: 1, width: 'calc(100% - 16px)'  },
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