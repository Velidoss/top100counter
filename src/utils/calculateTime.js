const calculateTime = (count) => {
  const attachZero = (number) => {
    return number > 9 ? number : `0${number}`;
  };
  if (count) {
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    hours = Math.floor(count / 3600) % 24;
    minutes = Math.floor(count / 60) % 60;
    seconds = count % 60;
    return `${attachZero(hours)} : ${attachZero(minutes)} : ${attachZero(seconds)}`;
  }
  return '00 : 00 : 00';
}

export default calculateTime;