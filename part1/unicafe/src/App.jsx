import {useState} from 'react'
import './App.css'

const Statistics = (props) => {
    if (props.good === 0 && props.bad === 0 && props.neutral === 0) {
        return <p>No feedback given</p>
    }
    return (
        <div>
            <h1>statistics</h1>
            <p>good {props.good}</p>
            <p>neutral {props.neutral}</p>
            <p>bad {props.bad}</p>
            <p>all {props.count}</p>
            <p>average {props.total / props.count}</p>
            <p>positive {props.good / props.count * 100} %</p>
        </div>
    )
}

function App() {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const [total, setTotal] = useState(0);
    const [count, setCount] = useState(0);

    const handleGood = () => {
        const updatedGood = good + 1;
        setGood(updatedGood);
        const updatedCount = count + 1;
        setCount(updatedCount);
        const updatedTotal = total + 1;
        setTotal(updatedTotal);
    }

    const handleNeutral = () => {
        const updateNeutral = neutral + 1;
        setNeutral(updateNeutral);
        const updatedCount = count + 1;
        setCount(updatedCount);
        setTotal(total);
    }

    const handleBad = () => {
        const updateBad = bad + 1;
        setBad(updateBad);
        const updatedCount = count + 1;
        setCount(updatedCount);
        const updatedTotal = total - 1;
        setTotal(updatedTotal);
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
                <Statistics good={good} neutral={neutral} bad={bad} count={count} total={total}/>
            </div>
        </>
    )
}

export default App
