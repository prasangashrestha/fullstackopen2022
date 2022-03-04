import { useState, useEffect } from 'react'
import {getAllService, createPersonService, updatePersonService, deletePersonService} from './services/persons'

const Person = ({person : {name, number, id}, handleSubmit}) => {
    return (
        <div>
            {name} {number}
            <button onClick = {(e) => {return window.confirm(`Do you want to delete ${name}`) && handleSubmit(e, id)}}>Delete</button>
        </div>
    )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    getAllService()
    .then(res => {
        setPersons(res)
    })
  }, [])
  
  const addPerson = e => {
      e.preventDefault()
      const newPerson = { 
          name: newName,
          number: newNumber
      }

      createPersonService(newPerson)
           .then(res => {
               setPersons([...persons, res])
               
           })
  }

  const updatePerson = (e,id) => {
      e.preventDefault()
      const newPerson = {
          id: id,
          name: newName,
          number: newNumber
      }

      updatePersonService(id, newPerson)
                .then(res => {
                     setPersons(persons.map(person => person.id !== id ? person : res))
                })

  }

  const deletePerson = (e, id) => {
      e.preventDefault()
      
      deletePersonService(id)
            .then(res => {
                setPersons(persons.filter(person => person.id !== id))
            })
       
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const existing = persons.find(person => person.name === newName) 

    if(!existing){
        addPerson(e)
    }else{
        if(window.confirm(`${newName} already exists in the database. Do you want to update the number?`))
            updatePerson(e, existing.id)
    }

    setNewName('')
    setNewNumber('')
    
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
      //console.log(persons.length)
      return persons.length> 0 
            &&
            persons
            .filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
            .map(person => {
               return  <Person key = {person.id} person = {person} handleSubmit={deletePerson}/>
            } )
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