import { action, makeObservable, observable } from 'mobx';

class UIStore {
  sidebarState = false;
  userLoggedIn = false;

  constructor() {
    makeObservable(this, {
      sidebarState: observable,
      userLoggedIn: observable,
      toggleSidebarState: action,
      userLogOut: action,
      userLogIn: action,
    });
  }

  toggleSidebarState = () => {
    this.sidebarState = !this.sidebarState;
  };

  userLogOut = () => {
    this.userLoggedIn = false;
  };

  userLogIn = () => {
    this.userLoggedIn = true;
    console.log('user logged in');
  };
}

export default UIStore;
