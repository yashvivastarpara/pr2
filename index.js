const { log } = require("console");
const express = require("express");
const app = express();
app.use(express.json());
const port = 8090;
 
let todos =[
    { title: 'HTML', isCompleted: true, id: 1 },
    { title: 'JavaScript', isCompleted: true, id: 2 },
    { title: 'React', isCompleted: false, id: 3 },
];

app.get('/',(req,res)=>{
    res.send('Welcome to the TODO API')
})

app.get('/todos',(req,res)=>{
    res.json(todos);
})

app.post('/addtodo', (req, res) => {
    const { title, isCompleted } = req.body;
    const id = todos.length + 1;
    const newTodo = { title, isCompleted, id };
    todos.push(newTodo);
    res.json(newTodo);
  });
  
  app.patch('/update/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedTodo = todos.find((todo) => todo.id === id);
    if (!updatedTodo) {
      res.status(404).json({ error: 'Todo not found' });
    } else {
      const { title, isCompleted } = req.body;
      updatedTodo.title = title || updatedTodo.title;
      updatedTodo.isCompleted = isCompleted || updatedTodo.isCompleted;
      res.json(updatedTodo);
    }
  });

  app.delete('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
      res.status(404).json({ error: 'Todo not found' });
    } else {
      const deletedTodo = todos.splice(index, 1)[0];
      res.json({ deletedTodo, todos });
    }
  });
  app.get('/todo/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find((t) => t.id === id);
    if (!todo) {
      res.status(404).json({ error: 'Todo not found' });
    } else {
      res.json(todo);
    }
  });

  app.get('/findbystatus', (req, res) => {
    const { isCompleted } = req.query;
    if (isCompleted === 'true') {
      const completedTodos = todos.filter((todo) => todo.isCompleted === true);
      res.json(completedTodos);
    } else if (isCompleted === 'false') {
      const incompleteTodos = todos.filter((todo) => todo.isCompleted === false);
      res.json(incompleteTodos);
    } else {
      res.status(400).json({ error: 'Invalid filter value' });
    }
  });


app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
