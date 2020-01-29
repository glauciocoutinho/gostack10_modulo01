const express = require('express');

const server = express();

//Para ler JSON na requisição - plugin que entende JSON
server.use(express.json());

// Query params = ?/teste=1
// Route params = /users/1
// Request body = { "name": "Eumesmo", "e-mail": "meuemail@hotmail.com" }

// CRUD - Create, Read, Update, Delete 

const users = [ 'Paulo', 'Maria', 'Pedro', 'José'];

server.get('/users', (req, res) => {
  return res.json(users);
})

server.get('/users/:index', (req, res) => {
  const { index } = req.params;

  return res.json(users[index]);
})

// POST - create
server.post('/users', (req, res) =>{
  const { name } = req.body;

  users.push(name);

  return res.json(users)
})

// PUT - update editar
server.put('/users/:index', (req, res) =>{
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;
  
  return res.json(users);
})

// DELETE
server.delete('/users/:index', (req, res) =>{
  const { index } = req.params;

  users.splice(index, 1);
  
  //return res.json(users);
  return res.send();
})


server.listen(3000);