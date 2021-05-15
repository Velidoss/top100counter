import React, { useEffect, useState } from 'react'
import counterContsants from '../constants/counterConstants';
import { useObservable } from './../Hooks/useObservable';
import counterService from './../state/counterService';
import CountTime from './CountTime/CountTime';
import style from './Counter.module.css';
import ActionButton from './Buttons/ActionButton';

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
  }, [counterState]);

  return (
    <div className={style.dataContainer}>
      <CountTime count={count} />
        { counterState === STOPPED || counterState === PAUSED 
          ? <ActionButton callBack={counterService.startCounter} text={'Start'} />
          : <ActionButton callBack={counterService.stopCounter} text={'Stop'} />
        }
        <ActionButton 
          callBack={() => {
            if (waitTime) {
              if (Date.now() - waitTime <= 300) {
                counterService.pauseCounter();
              } 
              setWaitTime(null);
            }
            setWaitTime(Date.now());
          }} 
          text={'Wait'} 
        />
        <ActionButton callBack={counterService.resetCounter} text={'Reset'} />
    </div>
  )
}
