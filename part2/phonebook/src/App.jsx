/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import './App.css'
import personService from './services/persons'

const Filter = ({ filter, handleFilterChange }) => {
    return (
        <div>
            filter shown with <input value={filter} onChange={handleFilterChange} />
        </div>
    )
}

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <p></p>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const Persons = ({ persons, filter, setPersons }) => {
    const deletePerson = (id, name) => {
        if (window.confirm(`Delete ${name}?`)) {
            personService
                .remove(id)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== id))
                })
        }
    }

    return (
        <ul>
            {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person =>
                <li style={{ listStyleType: 'none', marginBottom: '5px' }} key={person.id}>
                    {person.name} {person.number} <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
                </li>
            )}
        </ul>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber,
        }
        if (persons.find(person => person.name === newName)) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                const person = persons.find(person => person.name === newName)
                const changedPerson = { ...person, number: newNumber }
                personService
                    .update(person.id, changedPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
                        setNewName('')
                        setNewNumber('')
                    })
            }
            return
        }
        personService
            .create(personObject)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                setNewName('')
                setNewNumber('')
            })
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
            <h3>add a new</h3>
            <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
                newNumber={newNumber} handleNumberChange={handleNumberChange} />
            <h3>Numbers</h3>
            <Persons persons={persons} filter={filter} setPersons={setPersons} />
        </div>
    )
}

export default App
