import Observable from './Observable';
import counterContsants from './../constants/counterConstants';

const {
  TICKING,
  PAUSED,
  STOPPED,
  RESETTING,
} = counterContsants;

class CounterService {

  count = new Observable(0);
  counterState = new Observable(STOPPED);

  constructor () {
    this.tick = this.tick.bind(this);
    this.resetCount = this.resetCount.bind(this);
    this.startCounter = this.startCounter.bind(this);
    this.pauseCounter = this.pauseCounter.bind(this);
    this.stopCounter = this.stopCounter.bind(this);
    this.resetCounter = this.resetCounter.bind(this);
  }
    
  tick() {
    this.count.set(this.count.get() + 1);
  }

  resetCount() {
    this.count.set(0);
  }

  startCounter () {
    this.counterState.set(TICKING);
  }

  pauseCounter () {
    this.counterState.set(PAUSED);
  }

  stopCounter () {
    this.counterState.set(STOPPED);
  }

  resetCounter () {
    this.counterState.set(RESETTING);
  }

};


export default CounterService;