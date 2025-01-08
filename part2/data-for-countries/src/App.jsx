import {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css'

const App = () => {
    const [value, setValue] = useState('')
    const [countries, setCountries] = useState([])
    const [filteredCountries, setFilteredCountries] = useState([])
    const [country, setCountry] = useState(null)

    useEffect(() => {
        axios
            .get('https://studies.cs.helsinki.fi/restcountries/api/all')
            .then(response => {
                setCountries(response.data)
            })
            .catch(error => {
                console.error('Error fetching data:', error)
            })
    }, [])

    useEffect(() => {
        if (value) {
            const filtered = countries.filter(country =>
                country.name.common.toLowerCase().includes(value.toLowerCase())
            )
            setFilteredCountries(filtered)
            if (filtered.length === 1) {
                const country = filtered[0]
                setCountry({
                    name: country.name.common,
                    capital: country.capital[0],
                    area: country.area,
                    languages: Object.values(country.languages).join(', '),
                    flag: country.flags.png
                })
            } else {
                setCountry(null)
            }
        } else {
            setFilteredCountries([])
            setCountry(null)
        }
    }, [value, countries])

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    const handleShowCountry = (country) => {
        setCountry({
            name: country.name.common,
            capital: country.capital[0],
            area: country.area,
            languages: Object.values(country.languages).join(', '),
            flag: country.flags.png
        })
    }

    return (
        <div>
            <input type="text" value={value} onChange={handleChange} placeholder='Search for a country' />
            {filteredCountries.length > 10 && <p>Too many matches, specify another filter</p>}
            {filteredCountries.length > 1 && filteredCountries.length <= 10 && (
                <ul>
                    {filteredCountries.map(country => (
                        <li key={country.cca3}>
                            {country.name.common} <button onClick={() => handleShowCountry(country)}>Show</button>
                        </li>
                    ))}
                </ul>
            )}
            {country && (
                <div>
                    <h1>{country.name}</h1>
                    <p><strong>Capital:</strong> {country.capital}</p>
                    <p><strong>Area:</strong> {country.area}</p>
                    <p><strong>Languages:</strong></p>
                    <ul>
                        {country.languages.split(', ').map((language, index) => (
                            <li key={index}>{language}</li>
                        ))}
                    </ul>
                    <img src={country.flag} alt={`Flag of ${country.name}`} width="100" />
                </div>
            )}
        </div>
    )
}

export default App
