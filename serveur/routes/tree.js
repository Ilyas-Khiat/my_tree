import express from 'express';
import Person from '../models/Person.js';
import Union from '../models/Union.js';


const router = express.Router();
// Add a new person
router.post('/persons', async (req, res) => {
  try {
    const person = new Person(req.body);
    await person.save();
    res.status(201).json(person);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Edit a person
router.put('/persons/:id', async (req, res) => {
  try {
    const person = await Person.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!person) return res.status(404).json({ message: 'Person not found' });
    res.json(person);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a person
router.delete('/persons/:id', async (req, res) => {
  try {
    const person = await Person.findOneAndDelete({ id: req.params.id });
    if (!person) return res.status(404).json({ message: 'Person not found' });
    res.json({ message: 'Person deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete all persons
router.delete('/persons', async (req, res) => {
  try {
    await Person.deleteMany();
    res.json({ message: 'All persons deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add a new union
router.post('/unions', async (req, res) => {
  try {
    const union = new Union(req.body);
    await union.save();
    res.status(201).json(union);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Edit a union
router.put('/unions/:id', async (req, res) => {
  try {
    const union = await Union.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!union) return res.status(404).json({ message: 'Union not found' });
    res.json(union);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a union
router.delete('/unions/:id', async (req, res) => {
  try {
    const union = await Union.findOneAndDelete({ id: req.params.id });
    if (!union) return res.status(404).json({ message: 'Union not found' });
    res.json({ message: 'Union deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete all unions
router.delete('/unions', async (req, res) => {
  try {
    await Union.deleteMany();
    res.json({ message: 'All unions deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get the tree structure
router.get('/', async (req, res) => {
  try {
    const persons = await Person.find();
    const unions = await Union.find();

    const personsObj = {};
    const unionsObj = {};
    const links = [];

    persons.forEach(person => {
      personsObj[person.id] = person.toObject();
      if (person.parent_union) {
        links.push([person.parent_union, person.id]);
      }
      person.own_unions.forEach(unionId => {
        links.push([person.id, unionId]);
      });
    });

    unions.forEach(union => {
      unionsObj[union.id] = union.toObject();
      union.partner.forEach(partnerId => {
        links.push([partnerId, union.id]);
      });
      union.children.forEach(childId => {
        links.push([union.id, childId]);
      });
    });

    const tree = {
      start: persons[0] ? persons[0].id : null,
      persons: personsObj,
      unions: unionsObj,
      links: links
    };

    res.status(200).json(tree);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
