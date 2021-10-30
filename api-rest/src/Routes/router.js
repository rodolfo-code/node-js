const express = require('express');
const { uuid } = require('uuidv4');

const router = express.Router();

const array = [];

router.get('/', (req, res) => {
  const { title } = req.query;

  if (title) {
    const result = array.filter((project) => project.title.includes(title));
    return res.json(result);
  }

  return res.json(array);
});

router.post('/', (req, res) => {
  const { title, owner } = req.body;
  const id = uuid();
  const newProject = { id, title, owner };

  array.push(newProject);

  return res.json(newProject);
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, owner } = req.body;

  const projectIndex = array.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return res.status(400).json({ error: 'Project not found' });
  }

  const project = { id, title, owner };

  array[projectIndex] = project;

  return res.json(project);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const projectIndex = array.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return res.status(400).json({ error: 'Project not found' });
  }

  array.splice(projectIndex, 1);

  return res.status(204).end();
});

module.exports = router;
