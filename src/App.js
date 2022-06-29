import './App.css';
import React, {useState, useEffect} from 'react';
import Dice from './components/dice/BetterDice';
import {nanoid} from 'nanoid';
import Confetti from 'react-confetti';
import useWindowSize from './components/hooks/usewindowsize';


function App() {
  const startTime = Date.now();
  const storedRecords = localStorage.getItem('records');
  const [dices, setDices] = useState(allNewDices());
  const [tenzies, setTenzies] = useState(false);
  const [records, setRecords] = useState(storedRecords ? JSON.parse(storedRecords) : {bestTime: Infinity, bestCount: Infinity});
  const [metrics, setMetrics] = useState({
    startTime: startTime,
    rollsCount: 1,
    endTime: 0
  });
  const [newBestTime, setNewBestTime] = useState(false);
  const [newBestCount, setNewBestCount] = useState(false);

  useEffect(() => {
    localStorage.setItem('records', JSON.stringify(records))
  }, [records]);

  const size = useWindowSize();

  useEffect(() => {
    
    // Checking if there are any unheld dices
    let unheldDices = dices.filter(aDice => !aDice.isHeld);
    if (unheldDices.length !== 0) return;
    
    // Checking if all the dices have the same value
    let firstDiceValue = dices[0].value;
    for (let aDice of dices) {
      if (aDice.value != firstDiceValue) return;
    }
    const finishTime = Date.now() - metrics.startTime;

    setMetrics(prev => ({
      ...prev,
      endTime: finishTime
    }));

    if (finishTime < records.bestTime) {
      setNewBestTime(true);
      setRecords(prev => ({
        ...prev,
        bestTime: finishTime
      }))
    }

    if (metrics.rollsCount < records.bestCount) {
      setNewBestCount(true);
      setRecords(prev => ({
        ...prev,
        bestCount: metrics.rollsCount,
      }))
    }
    setTenzies(true);

  }, [dices]);

  function allNewDices() {
    const result = [];
    for (let index = 0; index < 10; index++) {
      result.push(
        {
          id: nanoid(),
          value: Math.ceil(Math.random() * 6),
          isHeld: false
        }
        
        );
    }
    return result;
  }

  function rollDice() {
    if (tenzies) {
      setDices(allNewDices());
      setTenzies(prev => !prev);
      setMetrics({
        startTime: Date.now(),
        rollsCount: 0,
        endTime: 0
      });
      setNewBestCount(false);
      setNewBestTime(false);
    }
    setMetrics(prev => ({...prev, rollsCount: prev.rollsCount + 1}))
    setDices(prevDices => prevDices.map(aDice => {
      return aDice.isHeld ? aDice : {
        id: nanoid(),
        value: Math.ceil(Math.random() * 6),
        isHeld: false
      }
    }));
  }

  function holdDice(id) {
    if (tenzies) return;
    setDices(prevDices => prevDices.map(aDice => {
      if (aDice.id == id) return {...aDice, isHeld: !aDice.isHeld}
      return aDice;
    }));
  }

  return (
    <div className='app--container'>
      {tenzies ? <Confetti height={size.height} width={size.width} gravity={0.2} /> : ""}
        <main className='App'>
          <div className='tenzies--container'>
            <div className='tenzies--heading'>
              <h1 className='tenzies--title'>{tenzies ? 'You won!' : 'Tenzies'}</h1>
              <p className='tenzies--intro'>{tenzies ? `Your time: ${metrics.endTime / 1000} seconds! It took ${metrics.rollsCount} rolls to win!` : 'Roll until all dice are the same. Click each die to freeze it at its current value between rolls.'}</p>
              {(newBestCount || newBestTime) && 
              <>
              <p className='tenzies--intro newRecord--title'>You set a new record!</p>
              {newBestCount && <p className="newRecord">New best count is {records.bestCount}!</p>}
              {newBestTime && <p className="newRecord">New best time is {records.bestTime / 1000}s!</p>}
              </>}
            </div>
            <div className='tenzies--grid'>
              {dices.map((elem) => {
                return <Dice
                        onClick={() => holdDice(elem.id)} 
                        value={elem.value} 
                        key={elem.id} 
                        isHeld={elem.isHeld} />
              })}
            </div>
            <button className='tenzies--roll' onClick={rollDice}>{tenzies ? 'New Game' : 'Roll'}</button>
          </div>
        </main>
    </div>
  )
}

export default App;
