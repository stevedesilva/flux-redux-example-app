export class Dispatcher {
  constructor() {
    // registered stores
    this.__listeners = [];
  }

  dispatch(action) {
    // notify stores that action has occurred 
    this.__listeners.forEach((listener) => listener(action));
  }

  register(listener){
    // add stores to dispatcher
    this.__listeners.push(listener);
  }
}
