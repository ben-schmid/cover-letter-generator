import React, { useState, useEffect} from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';


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

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'flex-end', 
      alignItems: 'center', 
      height: '100vh' }}>
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
      <Button variant="contained" endIcon={<SendIcon />}>
        Send
      </Button>
      </Stack>
    </Box>
  
      
    </div>
  );
  
}


export default App