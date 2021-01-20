import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitLogin = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Confirm password and password not matched!");
    } else if (!email || !password || !confirmPassword) {
      alert("Please key in required field!");
    }
    let data = {
      email: email,
      password: password,
    };
    console.log(data);
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

        <div class="form-group">
          <label for="password">Confirm Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Re-enter your password here..."
            required
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Sign in
        </button>
      </form>
    </div>
  );
}
