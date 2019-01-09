console.log('Message-board');
import { createStore, combineReducers } from 'redux';
import { get } from './http';

export const ONLINE = `ONLINE`; 
export const OFFLINE = `OFFLINE`; 
export const AWAY = `AWAY`; 
export const BUSY = `BUSY`; 

export const UPDATE_STATUS = `UPDATE_STATUS`;
export const CREATE_NEW_MESSAGE = `CREATE_NEW_MESSAGE`; 

const defaultState = {
  messages : [{
    date: new Date('2019-01-01 20:00:00'),
    postedBy: `Max`,
    content: `I <3 the new productivity app!`
  },
  {
    date: new Date('2019-01-01 20:01:00'),
    postedBy: `Ben`,
    content: `I like computer games!`
  },
  {
    date: new Date('2019-01-01 20:02:00'),
    postedBy: `Steve`,
    content: `I love coding!`
  }],
  userStatus: ONLINE
};

const userStatusReducer = (state=defaultState.userStatus, {type, value})=>{
  switch(type) {
    case UPDATE_STATUS: 
      return value;
      break;
  }
  return state;
};

const messagesReducer = (state=defaultState.messages, {type, value, postedBy, date})=>{
  switch(type) {
    case CREATE_NEW_MESSAGE: 
      const newState = [{date, postedBy,content:value}, ... state];
      return newState;
      break;
  }
  return state;
};

 
const combineReducer = combineReducers({
  userStatus: userStatusReducer,
  messages: messagesReducer
});

const store = createStore(combineReducer);

document.forms.newMessage.addEventListener("submit",(e) => {
  e.preventDefault();
  const value = e.target.newMessage.value;
  const username = localStorage[`preferences`] ? JSON.parse(localStorage[`preferences`]).userName : "Steve";
  store.dispatch(new newMessageAction(value,username));
});

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
  document.forms.newMessage.newMessage.value = "";
};

const statusUpdateAction = (value) => {
  return {
    type: UPDATE_STATUS,
    value
  }
};

const newMessageAction = (content, postedBy) => {
  const date = new Date();
  return {
    type: CREATE_NEW_MESSAGE,
    value: content,
    postedBy,
    date
  }
};

document.forms.selectStatus.status.addEventListener("change", (e) => {
  store.dispatch(statusUpdateAction(e.target.value));
});

render();

store.subscribe(render);

console.log("Making request...");
get(`http://www.bbc.co.uk`, (id) => {
  console.log("Receiving callback",id);
});