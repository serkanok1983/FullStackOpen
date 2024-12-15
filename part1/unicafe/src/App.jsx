import {useState} from 'react'
import './App.css'

function App() {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const handleGood = () => {
        const updatedGood = good + 1;
        setGood(updatedGood);
    }

    const handleNeutral = () => {
        const updateNeutral = neutral + 1;
        setNeutral(updateNeutral);
    }

    const handleBad = () => {
        const updateBad = bad + 1;
        setBad(updateBad);
    }

    return (
        <>
            <div>
                <h1>give feedback</h1>
                <button onClick={handleGood}>good</button>
                <button onClick={handleNeutral}>neutral</button>
                <button onClick={handleBad}>bad</button>
            </div>
            <div>
                <h1>statistics</h1>
                <p>good {good}</p>
                <p>neutral {neutral}</p>
                <p>bad {bad}</p>
            </div>
        </>
    )
}

export default App
