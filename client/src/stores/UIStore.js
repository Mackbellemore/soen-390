import { action, makeObservable, observable } from 'mobx';

class UIStore {
  sidebarState = false;

  constructor() {
    makeObservable(this, {
      sidebarState: observable,
      toggleSidebarState: action,
      closeSidebar: action,
      openSidebar: action,
    });
  }

  toggleSidebarState = () => {
    this.sidebarState = !this.sidebarState;
  };

  closeSidebar = () => {
    this.sidebarState = false;
  };

  openSidebar = () => {
    this.sidebarState = true;
  };
}

export default UIStore;
