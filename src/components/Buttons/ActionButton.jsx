import React from 'react';
import style from '../Counter.module.css';

const ActionButton = ({callBack, text}) => {

  return (
    <button className={style.button} onClick={callBack}>
      {text}
    </button>
  )
};

export default ActionButton;