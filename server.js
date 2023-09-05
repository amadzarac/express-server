const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Sample data as a constant array
const myData = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
];

// GET - Read all items
app.get('/items', (req, res) => {
  res.json(myData);
});

// POST - Create a new item
app.post('/items', (req, res) => {
  const newItem = req.body;
  myData.push(newItem);
  res.status(201).json(newItem);
});

// PUT - Update an item by ID
app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedItem = req.body;
  const index = myData.findIndex(item => item.id === id);
  if (index !== -1) {
    myData[index] = updatedItem;
    res.json(updatedItem);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// DELETE - Delete an item by ID
app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = myData.findIndex(item => item.id === id);
  if (index !== -1) {
    myData.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
