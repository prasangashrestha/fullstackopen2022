const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req,res) => {
    res.json(persons)
})

app.get('/api/info', (req,res) => {
    const total = persons.length
    res.end(`<p>There are total ${total} people</p> <p>${Date.now()}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if(note){
        res.json(person)
    }else{
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req,res) => {
    const maxId = persons.length>0 
                        ? Math.max(...persons.map(person => person.id))
                        : 0
            
    const newPerson = req.body

    const personName = newPerson.name
    const personNumber = newPerson.number

    if (Object.keys(newPerson).length === 0) {
        return res.status(400).json({
          error: 'content missing'
        })
    }

    if (!personName || !personNumber)  {
        return res.status(400).json({
            error: 'param name or number is missing'
          })
    }

    newPerson.id = maxId + 1
    
    persons = persons.concat(newPerson)

    res.json(newPerson)
})



const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)