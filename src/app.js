const express = require("express");
const cors = require("cors");

const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const {title, url, techs, likes} = request.body;
  let likeVariable = 0;

  if (!likes && likes!=undefined){
    likeVariable = likes; 
  }

  let repositorie = {id:uuid(), title, url, techs};

  repositorie.likes = likeVariable;

  repositories.push(repositorie);
  return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title, url, techs, likes} = request.body;
  const repositorieIndex = repositories.findIndex( repositorie => repositorie.id == id);
  let likeVariable = 0;

  if (repositorieIndex < 0){
    return response.status(400).json({error:"Id not found"});
  }

  if (!likes && likes == undefined){
    likeVariable = likes; 
  }

  let repositorie = { 
    id,
    title,
    url,
    techs,
  }

  repositorie.likes = likeVariable;

  repositories[repositorieIndex] = repositorie;

  return response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const repositorieIndex = repositories.findIndex( repositorie => repositorie.id == id);

  if (repositorieIndex < 0){
    return response.status(400).json({error:"Id not found"});
  }

  repositories.splice(repositorieIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const repositorieIndex = repositories.findIndex( repositorie => repositorie.id == id);

  if (repositorieIndex < 0){
    return response.status(400).json({error:"Id not found"});
  }

  if (repositories[repositorieIndex].likes && repositories[repositorieIndex].likes !=undefined){
    repositories[repositorieIndex].likes += 1;
  }

  else{
    repositories[repositorieIndex].likes = 1
  }

  return response.json(repositories[repositorieIndex]);
});

module.exports = app;
