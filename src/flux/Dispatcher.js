export class Dispatcher {
  constructor() {
    this.__listeners = [];
  }

  dispatch(action) {
    // notify listeners
    this.__listeners.forEach((listener) => listener(action));
  }

  register(listener){
    // add listeners
    this.__listeners.push(listener);
  }
}
