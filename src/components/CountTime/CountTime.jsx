import React from 'react';
import calculateTime from './../../utils/calculateTime';
import style from '../Counter.module.css';

const CountTime = ({count}) => {

  return (
    <div className={style.counter} >
      {calculateTime(count)}
    </div>
  )
};

export default CountTime;