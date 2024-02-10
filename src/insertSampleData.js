// insertSampleData.js

const mongoose = require('mongoose');
const CodeBlock = require('./CodeBlock');

// Connect to MongoDB
mongoose.connect('mongodb+srv://barm471:zeYk6lbFZmssyKuQ@cluster0.ifadyps.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample code blocks
const sampleCodeBlocks = [
  {
    title: 'Async/Await Example',
    code: `async function fetchData() {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  return data;
}`,
  },
  {
    title: 'Promise Example',
    code: `function fetchData() {
  return new Promise((resolve, reject) => {
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
}`,
  },
  // Add more sample code blocks as needed
];

// Insert sample code blocks into the database
// Insert sample code blocks into the database
const insertSampleData = async () => {
    try {
      for (const codeBlockData of sampleCodeBlocks) {
        const codeBlock = new CodeBlock(codeBlockData);
        await codeBlock.save();
      }
      console.log('Sample code blocks inserted successfully');
    } catch (error) {
      console.error('Error inserting sample code blocks:', error);
    } finally {
      // Disconnect from MongoDB after inserting data
      mongoose.disconnect();
    }
  };

  
insertSampleData();