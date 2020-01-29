const express = require('express');

const server = express();

//Para ler JSON na requisição - plugin que entende JSON
server.use(express.json());

// Query params = ?/teste=1
// Route params = /users/1
// Request body = { "name": "Eumesmo", "e-mail": "meuemail@hotmail.com" }

// CRUD - Create, Read, Update, Delete 

const users = [ 'Paulo', 'Maria', 'Pedro', 'José'];

server.use('/users', (req, res, next) => {
  console.time('Request');
  console.log(`Método: ${req.method}; URL: ${req.url}`);

  next();
  
  console.timeEnd('Request');
});

// middlewares local
function checkUserExists(req, res, next){
  if (!req.body.name) {
    return res.status(400).json({ error: 'User name is required!' });
  }

  return next();
};

// middlewares de verificação

//function checkUserInArray(req, res, next){
//  if (!users[req.params.index]){
//    return res.status(400).json({error: 'User does not exist!'});
//
//    return next();
//  }
//};

function checkUserInArray(req, res, next){
  // adicionando uma nova variável
  const user = users[req.params.index];

  if (!user) {
    return res.status(400).json({ error: 'User does not exist!' });
  }
  
  req.user = user;  

  return next();
};




server.get('/users', (req, res) => {
  return res.json(users);
});

server.get('/users/:index', checkUserInArray, (req, res) => {
  return res.json(req.user);

  //const { index } = req.params;

  //return res.json(users[index]);

});

// POST - create
server.post('/users', checkUserExists, (req, res) =>{
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

// PUT - update editar
server.put('/users/:index', checkUserInArray, checkUserExists, (req, res) =>{
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;
  
  return res.json(users);
});

// DELETE
server.delete('/users/:index', checkUserInArray, (req, res) =>{
  const { index } = req.params;

  users.splice(index, 1);
  
  //return res.json(users);
  return res.send();
});


server.listen(3000);