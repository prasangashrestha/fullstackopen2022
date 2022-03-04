import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAllService = () => {
    const request = axios.get(baseUrl)
    return request.then(res => res.data)
}
const createPersonService = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(res => res.data)
  }
  
const updatePersonService = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(res => res.data)
}

const deletePersonService = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(res => res.data)
}

export  {
    getAllService,
    createPersonService,
    updatePersonService,
    deletePersonService
}