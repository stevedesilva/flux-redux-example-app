export class Store {
  constructor(dispatcher) {
    // store registers with dispatcher
    dispatcher.register(this.__onDispatch.bind(this));
    // notify components when action received and state changes
    this.__listeners = [];
    this.__state = this.getInitialState();
  }

  __onDispatch() {
    // receive action from dispatcher
    throw new Error("Subclasses must override __onDispatch method of the flux store");
  }

  getInitialState() {
    // intialisation on store creation
    throw new Error("Subclasses must override __getInitialisedState method of the flux store");
  }

  addListener(listener) {
    // components interested in state
    this.__listeners.push(listener);
  }

  __emitChange() {
    // notify components of new state
    this.__listeners.forEach(listener=>listener(this.__state));
  }
}