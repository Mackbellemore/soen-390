export default function Login() {
  return (
    <div className="login-block">
      <div className="login-block__label">Log in</div>
      <div className="login-block__login">
        <form>
          <div className="login-block__login__input">
            <div className="login-block__login__input__icon username"></div>
            <div className="login-block__login__input__block">
              <div className="login-block__login__input__block__label">Your Email</div>
              <input
                className="login-block__login__input__block__input username"
                type="text"
                value="example@example.com"
              ></input>
            </div>
          </div>
          <div className="login-block__login__input">
            <div className="login-block__login__input__icon password"></div>
            <div className="login-block__login__input__block">
              <div className="login-block__login__input__block__label">Password</div>
              <input
                className="login-block__login__input__block__input password"
                type="password"
                value="password"
              ></input>
            </div>
          </div>
          <button className="login-block__login__button button">Login</button>
          <a className="login-block__login__forgotuser">Forgot Password</a>
        </form>
      </div>
      <div className="line"></div>
      <div className="login-block__signup">
        <div className="login-block__signup__newuser">New user?</div>
        <button className="login-block__signup__button button">Request an account</button>
      </div>
    </div>
  );
}
