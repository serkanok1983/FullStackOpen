import {useState} from 'react'
import './App.css'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({text, value, text2}) => <p>{text} {value} {text2}</p>

const Statistics = (props) => {
    if (props.good === 0 && props.bad === 0 && props.neutral === 0) {
        return <p>No feedback given</p>
    }
    return (
        <div>
            <StatisticLine text="good" value={props.good}/>
            <StatisticLine text="neutral" value={props.neutral}/>
            <StatisticLine text="bad" value={props.bad}/>
            <StatisticLine text="all" value={props.count}/>
            <StatisticLine text="average" value={props.total / props.count}/>
            <StatisticLine text="positive" value={props.good / props.count * 100} text2="%"/>
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
                <Button handleClick={handleGood} text="good"/>
                <Button handleClick={handleNeutral} text="neutral"/>
                <Button handleClick={handleBad} text="bad"/>
            </div>
            <div>
                <h1>statistics</h1>
                <Statistics good={good} neutral={neutral} bad={bad} count={count} total={total}/>
            </div>
        </>
    )
}

export default App
