import { createStore } from 'redux';

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

const store = createStore((state = defaultState) => {
  return state;
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
};

render();