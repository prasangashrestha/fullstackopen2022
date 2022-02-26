import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(res => {
        setPersons(res.data)
    })
  }, [])
  

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