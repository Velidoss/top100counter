import React from 'react';
import calculateTime from './../../utils/calculateTime';

const CountTime = ({count}) => {

  return (
    <div>
      {calculateTime(count)}
    </div>
  )
};

export default CountTime;