const mongoose = require('mongoose');
const Person = require('./models/Person');
require('dotenv').config();
const { mongoose, Person } = require('./db');



/* Create and Save a Record of a Model*/
const personData = {
  name: 'John Doe',
  age: 30,
  favoriteFoods: ['Pizza', 'Burger'],
};

const person = new Person(personData);

person.save(function (err, data) {
  if (err) {
    console.error(err);
  } else {
    console.log('Record saved:', data);
  }
});


/* Create Many Records with model.create()*/
const arrayOfPeople = [
    { name: 'Alice', age: 25, favoriteFoods: ['Pasta', 'Salad'] },
    { name: 'Bob', age: 28, favoriteFoods: ['Steak', 'Sushi'] },
    { name: 'Charlie', age: 22, favoriteFoods: ['Ice Cream', 'Cake'] },
  ];

  Person.create(arrayOfPeople, function (err, data) {
    if (err) {
      console.error(err);
    } else {
      console.log('Multiple records created:', data);
    }
  });

/* Use model.find() to Search Your Database*/
  Person.find({ name: 'Alice' }, function (err, people) {
    if (err) {
      console.error(err);
    } else {
      console.log('People with name Alice:', people);
    }
  });

  //: Use model.findOne() to Return a Single Matching Document from Your Database*/
  const foodToFind = 'Steak';
  Person.findOne({ favoriteFoods: foodToFind }, function (err, person) {
    if (err) {
      console.error(err);
    } else {
      console.log(`Person who likes ${foodToFind}:`, person);
    }
  });
/* Use model.findById() to Search Your Database By _id*/
  const personIdToFind = '<Replace with a valid _id>';
  Person.findById(personIdToFind, function (err, person) {
    if (err) {
      console.error(err);
    } else {
      console.log(`Person with ID ${personIdToFind}:`, person);
    }
  });


  /* : Perform Classic Updates*/
  const personIdToUpdate = '<Replace with a valid _id>';
  const newFavoriteFood = 'Hamburger';

  Person.findById(personIdToUpdate, function (err, person) {
    if (err) {
      console.error(err);
    } else {
      person.favoriteFoods.push(newFavoriteFood);
      person.save(function (err, updatedPerson) {
        if (err) {
          console.error(err);
        } else {
          console.log('Updated person:', updatedPerson);
        }
      });
    }
  });

/* Perform New Updates on a Document Using model.findOneAndUpdate()*/
  const personNameToUpdate = 'Alice';
  const newAge = 20;

  Person.findOneAndUpdate(
    { name: personNameToUpdate },
    { age: newAge },
    { new: true },
    function (err, updatedPerson) {
      if (err) {
        console.error(err);
      } else {
        console.log('Updated person:', updatedPerson);
      }
    }
  );

/* Delete One Document Using model.findByIdAndRemove*/
  const personIdToDelete = '<Replace with a valid _id>';

  Person.findByIdAndRemove(personIdToDelete, function (err, removedPerson) {
    if (err) {
      console.error(err);
    } else {
      console.log('Removed person:', removedPerson);
    }
  });

  /* MongoDB and Mongoose - Delete Many Documents with model.remove()*/
  const nameToDelete = 'Mary';

  Person.remove({ name: nameToDelete }, function (err, result) {
    if (err) {
      console.error(err);
    } else {
      console.log(`Number of documents removed for name ${nameToDelete}:`, result.deletedCount);
    }
  });

/* Chain Search Query Helpers to Narrow Search Results*/
  const foodToSearch = 'burritos';

  Person.find({ favoriteFoods: foodToSearch })
    .sort('name')
    .limit(2)
    .select('-age')
    .exec(function (err, people) {
      if (err) {
        console.error(err);
      } else {
        console.log(`People who like ${foodToSearch} (sorted by name, limited to 2, age hidden):`, people);
      }
    });

