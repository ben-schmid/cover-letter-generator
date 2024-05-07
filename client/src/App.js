import React, { useState, useEffect} from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


//https://mui.com/.hr


function App() {
  const [message, setMessage] = useState ("")

  useEffect (() => {
    console.log("Fetching...")
    fetch('/chat').then(
      res => res.json()
    ).then(
      data => {
        setMessage(data.message)
        console.log(data)
      })
  }, [])

  const format_message = (text) => {
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        <br />
        </span>
    ))
  
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

  return (
    <div style={{ 
      marginTop: 8,
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center' }}>
      <div>
        {message ? (
          <p>{format_message(message)}</p> 
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Box
        sx={{
          width: 1000,
          maxWidth: '100%',
          mb: 4
        }}
        >
        <Stack direction="row" spacing = {2}>
          <TextField 
            fullWidth label="Message" 
            id="fullWidth" 
          />
          <button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
          Upload file
            <VisuallyHiddenInput type="file" />
          </button>
          <Button variant="contained" endIcon={<SendIcon />}>
            Send
          </Button>
        </Stack>
      </Box>  
    </div>
  );
  
}


export default App