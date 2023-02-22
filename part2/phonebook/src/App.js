import { useState, useEffect } from 'react';
import personService from './services/personService';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState({
    message: '',
    style: '',
  });

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => {
        setNotification({
          message: error.response.data.error,
          style: 'error',
        });
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const personExists = persons.find((person) => {
      return person.name === personObject.name;
    });

    if (personExists) {
      const ok = `${personObject.name} is already added to phonebook, replace the old number with a new one?`;
      if (window.confirm(ok)) {
        personService
          .update(personExists.id, personObject)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== personExists.id ? person : returnedPerson
              )
            );
            setNotification({
              message: `Replaced ${personExists.name} number with a new one`,
              style: 'success',
            });
            setTimeout(() => {
              setNotification(null);
            }, 5000);
            setNewName('');
            setNewNumber('');
          })
          .catch((error) => {
            const message = error.response.data.error
              ? error.response.data.error
              : `Information of ${personExists.name} was already been deleted from server`;

            setNotification({
              message: message,
              style: 'error',
            });
            setTimeout(() => {
              setNotification(null);
            }, 5000);
            setNewName('');
            setNewNumber('');
            setPersons(persons.filter((n) => n.id !== personExists.id));
          });
      }
    } else {
      personService
        .create(personObject)
        .then((createdPerson) => {
          setNotification({
            message: `Added ${createdPerson.name}`,
            style: 'success',
          });
          setTimeout(() => {
            setNotification(null);
          }, 5000);
          setPersons(persons.concat(createdPerson));
          setNewName('');
          setNewNumber('');
        })
        .catch((error) => {
          setNotification({
            message: error.response.data.error,
            style: 'error',
          });
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        });
    }
  };

  const handlePersonDelete = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.remove(person.id).then(() => {
        setPersons(persons.filter((data) => data.id !== person.id));
      });
    }
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleNameChange={handleNameChange}
      />
      <h3>Numbers</h3>
      <Persons
        personsToShow={personsToShow}
        handlePersonDelete={handlePersonDelete}
      />
    </div>
  );
};

export default App;
