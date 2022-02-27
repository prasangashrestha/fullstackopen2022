import {useState, useEffect} from 'react'
import axios from 'axios'

const Country = ({country : {name, capital, area, languages, flags}}) => {
    
    const [show, setShow] = useState(false)

    const getLanguages = () => {
        const langArr = []
        for(let lang in languages){
            langArr.push(languages[lang])
        }
        return langArr
    }

    const handleShow = () => {
        setShow(!show)
    }

    return (
        <div>
            {name.common} 
            <button onClick={handleShow}>show</button>
            {show 
                ? <div>
                    <h1> {name.common} </h1>
                    <p> capital {capital[0]} </p>
                    <p> area {area}</p>

                    <h2>languages:</h2>
                    <ul>
                        {getLanguages().map(lang => <li>{lang}</li>)}
                    </ul>

                    <img src={flags['png']}/>
                   </div>
                 : ""  
            }
        </div>

    )
}

const App = () => {
    
    const [countries, setCountries] = useState([])
    const [filterName, setFilterName] = useState('')
    

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
        .then((res) => {
            setCountries(res.data)
        })
    }, [])

    const handleFilter = e => {
        setFilterName(e.target.value)                       
    }

    const filteredCountries = () => {
        const filtercountries = countries
                .filter(country => country.name.common.toLowerCase().includes(filterName.toLowerCase()))
        return filtercountries.length<=10
                ? filtercountries
                : []
    }

    return (
        <p>find countries
            <input value= {filterName} onChange={handleFilter} />
            {filteredCountries()
                    .map( c => <Country country={c} />)
            }
        </p>
    )
}

  export default App