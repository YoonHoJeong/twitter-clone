import { firebaseInstance, authService } from "fbase";
import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const setState = {
    email: setEmail,
    password: setPassword,
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newAccount) {
        // create Account
        const data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
        console.log(data);
      } else {
        // login
        const data = await authService.signInWithEmailAndPassword(
          email,
          password
        );
        console.log(data);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    const setFunction = setState[name];

    setFunction(value);
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  const onSocialClick = async (e) => {
    let provider;
    const {
      target: { name: providerName },
    } = e;

    const onSocials = {
      github: () => {
        provider = new firebaseInstance.auth.GithubAuthProvider();
      },
      google: () => {
        provider = new firebaseInstance.auth.GoogleAuthProvider();
      },
    };

    onSocials[providerName]();

    const data = await firebaseInstance.auth().signInWithPopup(provider);
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Sign In"}
        />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </span>

      <div>
        <button name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Continue with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
