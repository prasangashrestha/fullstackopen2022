import { useState } from 'react'

const Button = ({onClick, text}) => {
    return <button onClick={() => onClick(text)}>
          {text}
    </button>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (text) => {
      if(text === 'good'){
            setGood(curr=>curr+1)
       }else if(text === 'neutral'){
            setNeutral(curr=> curr+1)
        }else{
            setBad(curr => curr+1)
        }
     }

    
    const calcAverage = () => {
        const total = good + neutral + bad
        const score = (good + bad * -1)
        const average = score/total
        return average
    }

    const calcPositive = () => {
        return (good/(good+neutral+bad)) * 100
    }
  

  return (
    <div>
      <h1>give feedback</h1>

      <Button onClick={handleClick} text="good" />
      <Button onClick={handleClick} text="neutral" />
      <Button onClick={handleClick} text="bad" />

      {(good || neutral || bad)?
        <div>
        <h1>statistics</h1>
        <p>good: {good}</p>
        <p>neutral: {neutral}</p>
        <p>bad: {bad}</p>
        <p>all: {good + neutral + bad}</p>
        <p>average: {calcAverage()}</p>
        <p>positive: {calcPositive()}%</p>
        </div>
     : null
    }
    </div>
  )
}

export default App