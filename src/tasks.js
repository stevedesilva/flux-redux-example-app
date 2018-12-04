import { generate as id} from 'shortid';
import { Dispatcher, ReduceStore } from './flux';

const tasksDispatcher = new Dispatcher();

class TasksStore extends ReduceStore {
  getInitialState() {
    return {
      tasks : [{
        id: id(),
        content: 'Do NGN Migration',
        complete: 'true'
      },
      {
        id: id(),
        content: 'Update CAPI code for route to SPOT and Livefyre',
        complete: 'false'
      },
      {
        id: id(),
        content: 'Update Self service code for route to SPOT and Livefyre',
        complete: 'false'
      },
      {
        id: id(),
        content: 'Turn on SPOT for NGN',
        complete: 'false'
      },
      {
        id: id(),
        content: 'Remove switches for livefyre in SF, CAPI and SS',
        complete: 'false'
      }],
      showComplete : true
    }
  }

  getState() {
    return this.__state;
  }

  reduce(state, action) {
    console.log("Reducing ...", state, action);
    return state;
  }
}

const tasksStore = new TasksStore(tasksDispatcher);

tasksDispatcher.dispatch("TEST_DISPATCH");

