import {Dispatcher, Store} from './flux';

const controlPanelDispatcher = new Dispatcher();

const UPDATE_USERNAME = `UPDATE_USERNAME`;
const UPDATE_FONT_SIZE_PREFERENCE = `UPDATE_FONT_SIZE_PREFERENCE`;

const userNameUpdatedAction = (name) => {
  return {
    type : UPDATE_USERNAME,
    value : name
  }
};

const fontSizePreferenceUpdatedAction = (size) => {
  return {
    type: UPDATE_FONT_SIZE_PREFERENCE,
    value: size
  }
};

document.getElementById(`userNameInput`).addEventListener(`input`,({target}) => {
  const name = target.value;
  console.log('Control panel: called dispatch with name: ',name);
  controlPanelDispatcher.dispatch(userNameUpdatedAction(name));
});

document.forms.fontSizeForm.fontSize.forEach(elements => {
  elements.addEventListener(`change`, ({target}) => {
    // const size = target.value;

    // console.log('Control panel: called dispatch with font: ',size);
    controlPanelDispatcher.dispatch(fontSizePreferenceUpdatedAction(target.value));
  });
});



class UserPrefsStore extends Store {
  getInitialState() {
    return localStorage[`preferences`] ? JSON.parse(localStorage[`preferences`]) : {
      userName: "Steve",
      fontSize: "small"
    }
  }
  // registers this method to be called by dispatch
  __onDispatch(action) {
    console.log('UserPrefsStore: received dispatch with: ',action);
    switch(action.type) {
      case UPDATE_USERNAME:
        this.__state.userName = action.value;
        this.__emitChange();
        break;
      case UPDATE_FONT_SIZE_PREFERENCE: 
        this.__state.fontSize = action.value;
        this.__emitChange()
        break;
    }
    
  }

  getUserPreferences() {
    return this.__state;
  }
}

const userPrefsStore = new UserPrefsStore(controlPanelDispatcher);

userPrefsStore.addListener((state) => {
  console.info('UserPrefsStore Listener: emitter called with state: ', state);
  render(state);
  localStorage[`preferences`] = JSON.stringify(state);
});

const render = ({userName, fontSize}) => {
  document.getElementById("userName").innerText = userName;
  document.getElementsByClassName("container")[0].style.fontSize = fontSize === "small" ? "16px" : "32px" ;
  document.forms.fontSizeForm.fontSize.value = fontSize;
};

render(userPrefsStore.getUserPreferences());