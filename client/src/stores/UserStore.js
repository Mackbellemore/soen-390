import { makeObservable, observable, action } from 'mobx';

class UserStore {
  username = '';
  email = '';
  role = '';

  constructor() {
    makeObservable(this, {
      username: observable,
      email: observable,
      role: observable,
      setUsername: action,
      setEmail: action,
      setRole: action,
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
}

export default UserStore;
