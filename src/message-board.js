import { createStore } from 'redux';

export const ONLINE = `ONLINE`; 
export const OFFLINE = `OFFLINE`; 
export const AWAY = `AWAY`; 
export const BUSY = `BUSY`; 

export const UPDATE_STATUS = `UPDATE_STATUS`; 

const defaultState = {
  messages : [{
    date: new Date('2019-01-01 20:00:00'),
    postedBy: `Steve`,
    content: `I <3 the new productivity app!`
  },
  {
    date: new Date('2019-01-01 20:01:00'),
    postedBy: `Steve`,
    content: `I like computer games!`
  },
  {
    date: new Date('2019-01-01 20:02:00'),
    postedBy: `Steve`,
    content: `I love coding!`
  }],
  userStatus: undefined
};

const reducer = (state=defaultState, {type, value})=>{
  switch(type) {
    case UPDATE_STATUS: 
      return {...state, userStatus: value};
      break;
  }
  return state;
};

const store = createStore(reducer);

const render = () => {
  const { messages, userStatus} = store.getState();
  document.getElementById("messages").innerHTML = messages
    .sort((a,b) => b.date - a.date)
    .map(message => (`
      <div>
      ${message.postedBy} : ${message.content}
      </div>
    `))
    .join("");

  document.forms.newMessage.fields.disabled = (userStatus === OFFLINE);
};

const statusUpdateAction = (value) => {
  return {
    type: UPDATE_STATUS,
    value
  }
};

document.forms.selectStatus.status.addEventListener("change", (e) => {
  store.dispatch(statusUpdateAction(e.target.value));
});

render();

store.subscribe(render);