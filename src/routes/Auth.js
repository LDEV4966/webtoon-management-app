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
      <span className="app-title">Webtoon Management App</span>
      <form onSubmit={onSubmit} className="login-form">
        <input
          className="login-form__email"
          onChange={onChange}
          value={email}
          name="email"
          type="text"
          placeholder="email"
          required
        />
        <input
          className="login-form__password"
          onChange={onChange}
          value={password}
          name="password"
          type="password"
          placeholder="password"
          required
        />

        <input
          className="login-form__submit-btn"
          type="submit"
          value={newAccount ? "Create Account" : "Sign In"}
        />
        {error && <span className="error-code">{error}</span>}
      </form>
      <span onClick={toggleNewAccount} className="login-form__btn-change">
        <button className="login-form__submit-btn">
          {newAccount ? "Sign In" : "Create Account"}
        </button>
      </span>
      <button
        onClick={socialLogin}
        className="login-form__social-login"
        name="google"
      >
        Continue with Google
      </button>
      {socialLoginError && (
        <span className="error-code">{socialLoginError}</span>
      )}
    </div>
  );
};

export default Auth;
