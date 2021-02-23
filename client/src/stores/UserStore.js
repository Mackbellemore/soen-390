import { makeObservable, observable, action, computed } from 'mobx';
import Cookie from 'mobx-cookie';

class UserStore {
  username = new Cookie('username');
  email = new Cookie('email');
  role = new Cookie('role');
  loggedIn = false;
  hasLoggedOut = new Cookie('hasLoggedOut');

  constructor() {
    makeObservable(this, {
      username: observable,
      email: observable,
      role: observable,
      loggedIn: observable,
      setUsername: action,
      setEmail: action,
      setRole: action,
      logOut: action,
      logIn: action,
      getUsername: computed,
      getHasLoggedOut: computed,
    });
  }

  /**
   * @param {string} username
   */
  setUsername = (username) => {
    this.username.set(username);
  };

  /**
   * @param {string} email
   */
  setEmail = (email) => {
    this.email.set(email);
  };

  /**
   * @param {string} role
   */
  setRole = (role) => {
    this.role.set(role);
  };

  logOut = () => {
    this.loggedIn = false;
    this.hasLoggedOut.set(true);
  };

  logIn = () => {
    this.loggedIn = true;
    this.hasLoggedOut.remove();
  };

  get getUsername() {
    return this.username.value;
  }

  get getHasLoggedOut() {
    return this.hasLoggedOut.value;
  }
}

export default UserStore;
