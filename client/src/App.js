import React, { useState, useEffect } from 'react';
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

function uploadButton() {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload file
      <VisuallyHiddenInput type="file" />
    </Button>
  );
}

export default function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("Fetching...");
    fetch('/chat').then(
      res => res.json()
    ).then(
      data => {
        setMessage(data.message);
        console.log(data);
      });
  }, []);

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
            sx={{
              width: 1000,
              maxWidth: '100%',
              color: 'white',
              mb: 4
            }}
          >
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth label="Message"
                id="fullWidth"
                fontColor="white"
              />
              <Button variant="contained" endIcon={<SendIcon />}>
                Send
              </Button>
            </Stack>
          </Box>
        </section>
      </section>
    </div>
  );
}