import * as React from "react";
import "./App.css";
const App = () => {
  return (
    <div className="register">
      <div className="rectangle">
        <span className="welcome">Welcome!</span>
        <input
          className="email"
          placeholder="myemail@example.com"
          type="text"
        />
        <input className="nickname" placeholder="mycool_nickname" type="text" />
        <input
          className="password"
          placeholder="Its_a_strong_password_1[]"
          type="text"
        />
        <span className="already-have-an-account">
          Already have an account?
        </span>
        <button className="rectangle-4">
          <span className="sign-up">Sign up</span>
        </button>
        <span className="our-contacts">Our contacts</span>
      </div>
    </div>
  );
};
export default App;