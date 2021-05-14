import React, { useEffect, useState } from 'react'
import counterContsants from './counterConstants';

const {
  TICKING,
  PAUSED,
  STOPPED,
  RESETTING,
} = counterContsants;

export default function Counter() {

  const [count, setCount] = useState(0);
  const [counterState, setCounterState] = useState(STOPPED);

  useEffect(() => {  
    let counter;
    const tick = () => {
      setCount((count) => count + 1);
      console.log('tick');
    }

    const stopCount = () => {
      clearInterval(counter);
    }

    if (counterState === TICKING) {
      counter = setInterval(() => {
        tick()
      }, 1000);
      return () => clearInterval(counter);
    }
    if (counterState === PAUSED) {
      stopCount();
    }
    if (counterState === STOPPED) {      
      setCount(0);
      stopCount();
    }
    if (counterState === RESETTING) {    
      setCount(0);
      stopCount();
      startCounter();
    }
  }, [counterState])

  const startCounter = () => {
    setCounterState(TICKING);
  }

  const pauseCounter = () => {
    setCounterState(PAUSED);
  }

  const stopCounter = () => {
    setCounterState(STOPPED);
  }

  const resetCounter = () => {
    setCounterState(RESETTING);
  }

  return (
    <div>
      <p>
        {count}
      </p>
      { counterState === STOPPED || counterState === PAUSED 
        ? <button onClick={startCounter}>
            Start
          </button>
        : <button onClick={stopCounter}>
            Stop
          </button>
      }
      <button onDoubleClick={pauseCounter}>
        Wait
      </button>
      <button onClick={resetCounter}>
        Reset
      </button>
    </div>
  )
}
