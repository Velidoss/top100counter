import React, { useEffect, useState } from 'react'
import counterContsants from '../constants/counterConstants';
import { useObservable } from './../Hooks/useObservable';
import counterService from './../state/counterService';
import CountTime from './CountTime/CountTime';

const {
  TICKING,
  PAUSED,
  STOPPED,
  RESETTING,
} = counterContsants;

export default function Counter() {

  const count = useObservable(counterService.count);
  const counterState = useObservable(counterService.counterState);
  const [waitTime, setWaitTime] = useState(null);

  useEffect(() => {  
    let counter;

    if (counterState === TICKING) {
      counter = setInterval(() => {
        counterService.tick()
      }, 1000);
      return () => clearInterval(counter);
    }
    if (counterState === PAUSED) {
      clearInterval(counter);
    }
    if (counterState === STOPPED) {  
      clearInterval(counter);    
      counterService.resetCount();
    }
    if (counterState === RESETTING) {    
      counterService.resetCount();
      clearInterval(counter);
      counterService.startCounter();
    }
  }, [counterState])

  return (
    <div style={{
      textAlign: 'center'
    }}>
      <CountTime count={count} />
        { counterState === STOPPED || counterState === PAUSED 
          ? <button onClick={counterService.startCounter}>
              Start
            </button>
          : <button onClick={counterService.stopCounter}>
              Stop
            </button>
        }
        <button 
          onClick={() => {
            if (waitTime) {
              if (Date.now() - waitTime <= 300) {
                counterService.pauseCounter();
              } else {
                setWaitTime(null);
              }
            }
            setWaitTime(Date.now());
          }}
        >
          Wait
        </button>
        <button onClick={counterService.resetCounter}>
          Reset
        </button>
    </div>
  )
}
