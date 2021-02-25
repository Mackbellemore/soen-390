import { action, makeObservable, observable } from 'mobx';

// The class is responsible to track of the state of UI
class UIStore {
  sidebarState = false;

  constructor() {
    makeObservable(this, {
      sidebarState: observable,
      toggleSidebarState: action,
    });
  }

  toggleSidebarState = () => {
    this.sidebarState = !this.sidebarState;
  };
}

export default UIStore;
