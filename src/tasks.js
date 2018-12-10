import { generate as id} from 'shortid';
import { Dispatcher, ReduceStore } from './flux';

const tasksDispatcher = new Dispatcher();

const CREATE_TASK = `CREATE_TASK`;
const COMPLETE_TASK = `COMPLETE_TASK`;
const SHOW_TASKS = `SHOW_TASKS`;

const createNewActionTask = (content) => {
  return {
    type: CREATE_TASK,
    value: content
  }
};

const completeTaskAction = (id,isComplete) => {
  return {
    type: COMPLETE_TASK,
    id, 
    value: isComplete
  }
};
const initialState = {
  tasks: [{
      id: id(),
      content: "Update CSS styles",
      complete: false
  }, {
      id: id(),
      content: "Add unit tests",
      complete: false
  }, {
      id: id(),
      content: "Post to social media",
      complete: false
  },{
      id: id(),
      content: "Install hard drive",
      complete: true
  }],
  showComplete:true
};

const showTasksAction = (show) => {
  return {
    type: SHOW_TASKS,
    value: show
  }
};

class TasksStore extends ReduceStore {
  getInitialState() {
    return initialState;
  }

  getState() {
    return this.__state;
  }

  reduce(state, action) {
    console.log("Reducing ...", state, action);
    let newState;
    switch(action.type) {
      case CREATE_TASK:
        newState = {... state, tasks: [...state.tasks]};
        newState.tasks.push({
          id: id(),
          content: action.value,
          complete: false
        });
        return newState;
      case COMPLETE_TASK:
        newState = {... state, tasks: [...state.tasks]};
        const affectedElementIndex = newState.tasks.findIndex(t=> t.id === action.id);
        newState.tasks[affectedElementIndex] = {...state.tasks[affectedElementIndex], complete: action.value};
        return newState;
      case SHOW_TASKS:
        newState = { ... state, tasks: [...state.tasks], showComplete: action.value };
        return newState;
    }
    return state;
  }
}

const TaskComponent = ({content,complete,id})=>(
  `<section>
    ${content} <input type="checkbox" name="taskCompleteCheck" data-taskid=${id} ${complete ? "checked" : ""}> 
  </section>`
);

document.forms.undo.addEventListener(`submit`, (e)=> {
  e.preventDefault();
  tasksStore.revertLastState();
});

const render = () => {
  const tasksSection = document.getElementById(`tasks`);
  const state = tasksStore.getState();

  const rendered = tasksStore.getState().tasks
        .filter(task=>state.showComplete ? true : !task.complete)
        .map(TaskComponent).join("");
    tasksSection.innerHTML = rendered;

    document.getElementsByName('taskCompleteCheck').forEach((element) => {
      element.addEventListener(`change`, (e)=> {
        const id = e.target.attributes['data-taskid'].value;
        const checked = e.target.checked;
        tasksDispatcher.dispatch(completeTaskAction(id,checked));
      })
    });
                    
};

document.forms.newTask.addEventListener(`submit`, (e) => {
  e.preventDefault();
  const name = e.target.newTaskName.value;
  if(name) {
    tasksDispatcher.dispatch(createNewActionTask(name));
    e.target.newTaskName.value = null;
  }
});

document.getElementById(`showComplete`).addEventListener('change',({target}) => {
  const showComplete = target.checked;
  tasksDispatcher.dispatch(showTasksAction(showComplete));
});

const tasksStore = new TasksStore(tasksDispatcher);

tasksDispatcher.dispatch("TEST_DISPATCH");

tasksStore.addListener(() => {
  render();
});

render();



