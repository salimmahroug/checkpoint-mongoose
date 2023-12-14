const express = require('express');
const router = express.Router();
const PersonModel = require('../Module/person');

// Create many people with Model.create()
router.post('/createMany', (req, res) => {
  const arrayOfPeople = req.body;

  PersonModel.create(arrayOfPeople)
    .then(docs => {
      console.log(docs);
      res.send(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

// Use model.find() to search your database
router.get('/findByName/:name', (req, res) => {
  const personName = req.params.name;

  PersonModel.find({ name: personName })
    .then(docs => {
      console.log(docs);
      res.send(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

// Use model.findOne() to return a single matching document from your database
router.get('/findByFood/:food', (req, res) => {
  const food = req.params.food;

  PersonModel.findOne({ favoriteFood: food })
    .then(docs => {
      console.log(docs);
      res.send(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

// Use model.findById() to search your database by _id
router.get('/findById/:id', (req, res) => {
  const personId = req.params.id;

  PersonModel.findById(personId)
    .then(docs => {
      console.log(docs);
      res.send(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

// Perform classic updates by running find, edit, then save
router.put('/addFavoriteFood/:id', async (req, res) => {
    const personId = req.params.id;
  
    try {
      const person = await PersonModel.findById(personId);
  
      if (!person) {
        return res.status(404).send({ msg: 'Person not found' });
      }
  
      person.favoriteFoods.push('hamburger');
      const updatedPerson = await person.save();
  
      console.log(updatedPerson);
      res.send(updatedPerson);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });
  
  

// Perform new updates on a document using model.findOneAndUpdate()
router.put('/updateAgeByName/:name', (req, res) => {
  const personName = req.params.name;

  PersonModel.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true }
  )
    .then(updatedPerson => {
      console.log(updatedPerson);
      res.send(updatedPerson);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

// Delete one document using model.findOneAndDelete
router.delete('/removeById/:id', (req, res) => {
    const personId = req.params.id;
  
    PersonModel.findOneAndDelete({ _id: personId })
      .then(removedPerson => {
        console.log(removedPerson);
        res.send(removedPerson);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  });
  
  // MongoDB and Mongoose - Delete many documents with model.deleteMany()
  router.delete('/removeByName/:name', (req, res) => {
    const personName = req.params.name;
  
    PersonModel.deleteMany({ name: personName })
      .then(deleteResult => {
        console.log(deleteResult);
        res.send(deleteResult);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  });
  



module.exports = router;
