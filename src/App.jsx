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
  const handleLogText = () => {
    console.log('About to emit text',text);
    sendTextToServer(text);
  };
  return (
    <div>
      <textarea rows="4" cols="50" value={text} onChange={handleTextChange} readOnly={readOnly} />
      <br />
    </div>
  );
};






function StudentRoute() {
  const [titles, setTitles] = useState([]); // State to store fetched titles

  useEffect(() => {
    // Fetch titles from the backend when the component mounts
    const fetchTitles = async () => {
      try {
        const response = await axios.get('http://localhost:3001/codeblocks');
        setTitles(response.data.map(codeBlock => codeBlock.title));
      
      } catch (error) {
        console.error('Error fetching titles:', error);
      }
    };

    fetchTitles(); // Call fetchTitles function when the component mounts
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <div>
      <h1>Student</h1>
      {/* Map over the titles array and render a TaskButton component for each title */}
      {titles.map((title, index) => (
        <div key={index}>
          <TaskButton title={'test'} onClickFunc={() => {}} />
          <h1>index</h1> {/* You can adjust the layout as needed */}
        </div>
      ))}
      {/* <TextAreaComponent readOnly={false} /> */}
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