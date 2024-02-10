// codeBlockRoutes.js

const express = require('express');
const router = express.Router();
const CodeBlock = require('../models/CodeBlock');

// Get all code blocks
router.get('/codeblocks', async (req, res) => {
  try {
    const codeBlocks = await CodeBlock.find();
    res.json(codeBlocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new code block
router.post('/codeblocks', async (req, res) => {
  const codeBlock = new CodeBlock({
    title: req.body.title,
    code: req.body.code,
  });

  try {
    const newCodeBlock = await codeBlock.save();
    res.status(201).json(newCodeBlock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
