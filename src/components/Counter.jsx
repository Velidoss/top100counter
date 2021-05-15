import React, { useEffect } from 'react'
import counterContsants from '../constants/counterConstants';
import { useObservable } from './../Hooks/useObservable';
import counterService from './../state/counterService';

const {
  TICKING,
  PAUSED,
  STOPPED,
  RESETTING,
} = counterContsants;

export default function Counter() {

  const count = useObservable(counterService.count);
  const counterState = useObservable(counterService.counterState);

  useEffect(() => {  
    let counter;

    const stopCount = () => {
      clearInterval(counter);
      counterService.stopCounter();
    }

    if (counterState === TICKING) {
      counter = setInterval(() => {
        counterService.tick()
      }, 1000);
      return () => clearInterval(counter);
    }
    if (counterState === PAUSED) {
      clearInterval(counter);
      counterService.pauseCounter();
    }
    if (counterState === STOPPED) {      
      counterService.resetCount();
      stopCount();
    }
    if (counterState === RESETTING) {    
      counterService.resetCount();
      stopCount();
      counterService.startCounter();
    }
  }, [counterState])

  return (
    <div>
      <p>
        {count}
      </p>
      { counterState === STOPPED || counterState === PAUSED 
        ? <button onClick={counterService.startCounter}>
            Start
          </button>
        : <button onClick={counterService.stopCounter}>
            Stop
          </button>
      }
      <button onDoubleClick={counterService.pauseCounter}>
        Wait
      </button>
      <button onClick={counterService.resetCounter}>
        Reset
      </button>
    </div>
  )
}
