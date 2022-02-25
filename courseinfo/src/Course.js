import React from 'react'
import Part from './Part'


const Course = ({course: {name, parts}}) => {

    const getParts = () => {
        return parts.map((part) => {
            return <Part part= {part} />
        })
    }

    const getTotal = () => {
        return parts.reduce((acc, curr) => {
            return acc+=curr.exercises
        },0)
    }

  return (
    <div>
        <h1>
            {name}
        </h1>
    {getParts()}
   <strong>total of {getTotal()} exercises</strong> 
    </div>
  )
}

export default Course
