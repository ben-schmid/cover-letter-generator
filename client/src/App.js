import React, { useState, useEffect} from 'react'


//https://mui.com/


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
    <div>
      {message ? (
        <p>{format_message(message)}</p> 
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}


export default App