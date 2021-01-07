import { authService, firebaseInstance } from "fbase";
import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const [socialLoginError, setSocialLoginError] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (newAccount) {
        await authService.createUserWithEmailAndPassword(email, password);
      } else {
        await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const onChange = (event) => {
    const {
      target: { value, name },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };
  const socialLogin = async () => {
    const provider = new firebaseInstance.auth.GoogleAuthProvider();
    try {
      await authService.signInWithPopup(provider);
    } catch (error) {
      setSocialLoginError(error.message);
    }
  };
  const toggleNewAccount = () => setNewAccount((prev) => !prev);
  return (
    <div id="auth-mainscreen">
      <span className="app-title">WEBTOON MANAGER</span>
      <form onSubmit={onSubmit} className="login-form">
        <div>
          <div className="login-form__account">
            <span>Email </span>
            <input
              className="login-form__account-input"
              onChange={onChange}
              value={email}
              name="email"
              type="text"
              placeholder="email"
              required
            />
          </div>
          <div className="login-form__account">
            <span>Password </span>
            <input
              className="login-form__account-input"
              onChange={onChange}
              value={password}
              name="password"
              type="password"
              placeholder="password"
              required
            />
          </div>
        </div>
        <div>
          <input
            className="login-form__submit-btn"
            type="submit"
            value={newAccount ? "Create Account" : "Sign In"}
          />
        </div>
      </form>
      {error && <span className="error-code">"{error}"</span>}
      {socialLoginError && (
        <span className="error-code">"{socialLoginError}"</span>
      )}
      <div className="other-login">
        <span onClick={toggleNewAccount} className="other-login-btn">
          <button>{newAccount ? "Sign In" : "Create Account"}</button>
        </span>
        <span className="other-login-btn social-login-btn">
          <button onClick={socialLogin} name="google">
            Continue with Google
          </button>
        </span>
      </div>
    </div>
  );
};

export default Auth;
