import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL_PATIENTS } from "./Constant";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = (event) => {
    event.preventDefault();
    if (!email || !password) {
      alert("Please key in required field!");
    }
    let data = {
      email: email,
      password: password,
    };
    axios.post(`${BACKEND_URL_PATIENTS}/login`, data).then((response) => {
      console.log(response);
    });
  };

  return (
    <div>
      <form onSubmit={(event) => submitLogin(event)}>
        <div class="form-group">
          <label for="email">Email address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="Your E-Mail here..."
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Your password here..."
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Sign in
        </button>
      </form>
    </div>
  );
}
