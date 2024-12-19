import {useState} from 'react'
import './App.css'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({text, value, text2}) => (
    <tr>
        <td style={{textAlign: "left"}}>{text}</td>
        <td style={{textAlign: "left", paddingLeft: "8px"}}>
            {value} {text2}
        </td>
    </tr>
);

const Statistics = ({good, neutral, bad, count, total}) => {
    if (good === 0 && neutral === 0 && bad === 0) {
        return <p>No feedback given</p>
    }
    return (
        <table style={{margin: "0 auto", borderCollapse: "collapse"}}>
            <tbody>
            <StatisticLine text="good" value={good}/>
            <StatisticLine text="neutral" value={neutral}/>
            <StatisticLine text="bad" value={bad}/>
            <StatisticLine text="all" value={count}/>
            <StatisticLine text="average" value={(total / count).toFixed(2)}/>
            <StatisticLine text="positive" value={(good / count * 100).toFixed(2)} text2="%"/>
            </tbody>
        </table>
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
