import { action, makeObservable, observable } from 'mobx';

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
