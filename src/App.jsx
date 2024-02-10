import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { sendTextToServer, socket } from './SocketService'; // Import the socket instance
import { io } from 'socket.io-client'; // Add this import statement for 'io'
import {TaskButton} from './TaskButton';
import axios from 'axios'; 

const TextAreaComponent = ({ readOnly }) => {
  const [text, setText] = useState('');

  const handleTextChange = (event) => {
    setText(event.target.value);
    sendTextToServer(event.target.value);
  };
  //TODO: DELETE THIS

  return (
    <div>
      <textarea rows="4" cols="50" value={text} onChange={handleTextChange} readOnly={readOnly} />
      <br />
    </div>
  );
};






function StudentRoute() {
  return (
    <div>
      <h1>Student</h1>
      <TextAreaComponent readOnly={false} />
    </div>
  );
}

function TeacherRoute() {
  const [text, setText] = useState('');
  const [forceUpdate, setForceUpdate] = useState(false);
  useEffect(() => {
    const connectionOptions = {
      "force new connection": true,
      "reconnectionAttempts": "Infinity",
      "timeout": 10000,
      "transports": ["websocket"]
    };

    const socket = io.connect('http://localhost:3001', connectionOptions);

    // Add this line to log the connection status
    console.log('Socket connected in Teacher view');

    socket.on('textReceived', (data) => {
      // console.log(`Received text from server`, data);
      console.log(data['originalText'].code)
      setText(data.originalText.code);
      setForceUpdate(prev => !prev);
    });

    return () => {
      socket.disconnect();
    };
  }, [setText,setForceUpdate]);

  return (
    <div>
      <h1>Teacher</h1>
      {/* <TextAreaComponent readOnly={true} /> */}
      <textarea rows="4" cols="50" value={text} readOnly={true} key={forceUpdate} />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/teacher" element={<TeacherRoute />} />
            <Route path="/" element={<StudentRoute />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
