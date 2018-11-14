import {Dispatcher} from './flux';

const controlPanelDispatcher = new Dispatcher();

document.getElementById('userNameInput').addEventListener(`input`,({target}) => {
  const name = target.value;
  console.log('Dispatching...',name);
  controlPanelDispatcher.dispatch(`TODO__NAMEINPUT_ACTION`);
});

document.forms.fontSizeForm.fontSize.forEach(elements => {
  elements.addEventListener(`change`, ({target}) => {
    controlPanelDispatcher.dispatch(`TODO__FONTUPDATE_ACTION`);
  });
});

controlPanelDispatcher.register(action => {
  console.log('Receiving action...',action);
});
