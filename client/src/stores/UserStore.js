import { makeObservable, observable, action } from 'mobx';

class UserStore {
  username = '';
  email = '';
  role = '';
  loggedIn = false;

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
    this.loggedIn = false;
  };

  logIn = () => {
    this.loggedIn = true;
  };
}

export default UserStore;
