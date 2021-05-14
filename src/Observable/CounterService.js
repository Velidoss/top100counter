import Observable from './Observable';
import counterContsants from './../constants/counterConstants';

const {
  TICKING,
  PAUSED,
  STOPPED,
  RESETTING,
} = counterContsants;

class CounterService {

  counter = new Observable({});

  constructor (count, counterState) {
    this.counter.count = count;
    this.counter.counterState = counterState;
  }

  tick() {
    this.counter.set({...this.counter.get(), count: this.counter.count + 1});
  }

  resetCount() {
    this.counter.set(0);
  }

  startCounter () {
    this.counter.set({
      ...this.counter.get(), 
      counterState: TICKING,
    });
  }

  pauseCounter () {
        this.counter.set({
      ...this.counter.get(), 
      counterState: PAUSED,
    });
  }

  stopCounter () {
        this.counter.set({
      ...this.counter.get(), 
      counterState: STOPPED,
    });
  }

  resetCounter () {
        this.counter.set({
      ...this.counter.get(), 
      counterState: RESETTING,
    });
  }

};


export default new CounterService({count: 0, counterState: STOPPED});