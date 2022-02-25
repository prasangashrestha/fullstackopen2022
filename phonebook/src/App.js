import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
      ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const existing = persons.find(person => person.name === newName)

    if(!existing){
        const newPerson = {name: newName, number:newNumber}
        setPersons([...persons, newPerson])
    }else{
        alert(`${newName} is already added to the phonebook`)
    }

    setNewName('')
    
  }
  
  const handleChangeName = (e) => {
    setNewName(e.target.value)
  }

  const handleChangeNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const handleChangeFilter = (e) => {
    setFilterName(e.target.value)
  }

  const getfilteredName = () => {
      
      return persons
            .filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
            .map(person => <p>{person.name} {person.number}</p>)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <p>
          filter shown with 
          <input value={filterName} onChange={handleChangeFilter}/>
      </p>

      <h1>add a new</h1>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value= {newName} onChange={handleChangeName} />
        </div>
        <div>
          number: <input value= {newNumber} onChange={handleChangeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>      
        {
           getfilteredName()
        }
    </div>
  )
}

export default App