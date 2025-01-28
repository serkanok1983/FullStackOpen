/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    const { type, text } = message
    const messageStyle = {
        color: type === "info" ? "green" : "red",
        background: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderColor: type === "info" ? "green" : "red",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    return (
        <div style={messageStyle}>
            {text}
        </div>
    )
}

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

const Persons = ({ persons, filter, setPersons, setMessage }) => {
    const deletePerson = (id, name) => {
        if (window.confirm(`Delete ${name}?`)) {
            personService
                .remove(id)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== id))
                })
                .catch(() => {
                    setMessage({ type: "error", text: `Information of ${name} has already been removed from server` })
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
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
    const [message, setMessage] = useState(null)

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
                    .catch(() => {
                        setMessage({ type: "error", text: `Information of ${newName} has already been removed from server` })
                        setTimeout(() => {
                            setMessage(null)
                        }, 5000)
                        setPersons(persons.filter(p => p.id !== person.id))
                    })
                setMessage({ type: "info", text: `Updated ${newName}` })
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
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
            .catch(error => {
                setMessage({ type: "error", text: error.response.data.error })
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            })
        setMessage({ type: "info", text: `Added ${newName}` })
        setTimeout(() => {
            setMessage(null)
        }, 5000)
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
            <Notification message={message} />
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
            <h3>add a new</h3>
            <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
                newNumber={newNumber} handleNumberChange={handleNumberChange} />
            <h3>Numbers</h3>
            <Persons persons={persons} filter={filter} setPersons={setPersons} setMessage={setMessage} />
        </div>
    )
}

export default App
