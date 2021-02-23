import Cookie from 'mobx-cookie';
import { makeObservable, observable, action, computed } from 'mobx';

class UserStore {
  username = '';
  email = '';
  role = '';
  loggedIn = false;
  hasLoggedOut = new Cookie('hasLoggedOut');

  constructor() {
    makeObservable(this, {
      username: observable,
      email: observable,
      role: observable,
      loggedIn: observable,
      hasLoggedOut: observable,
      setUsername: action,
      setEmail: action,
      setRole: action,
      logOut: action,
      logIn: action,
      getHasLoggedOut: computed,
    });
  }

  /**
   * @param {string} username
   */
  setUsername = (username) => {
    this.username = username;
  };

  /**
   * @param {string} email
   */
  setEmail = (email) => {
    this.email = email;
  };

  /**
   * @param {string} role
   */
  setRole = (role) => {
    this.role = role;
  };

  logOut = () => {
    this.username = '';
    this.email = '';
    this.role = '';
    this.loggedIn = false;
    this.hasLoggedOut.set(true);
  };

  logIn = () => {
    this.loggedIn = true;
    this.hasLoggedOut.remove();
  };

  get getHasLoggedOut() {
    return this.hasLoggedOut.value;
  }
}

export default UserStore;
