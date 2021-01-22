import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL_PATIENTS } from "../Constant";
import { Button, Form } from "react-bootstrap";

export default function PatientLogin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    let info = JSON.parse(localStorage.getItem("ptoken"));
    console.log(info);
    console.log(!info);
    if (info) {
      console.log(info.pid);
    }
  }, []);

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
      // localStorage.setItem("ptoken", response.data.ptoken);
      localStorage.setItem("ptoken", JSON.stringify(response.data.ptoken));
      props.history.push("/patient/dashboard");
    });
  };

  return (
    <div>
      <h1>Patient Portal</h1>
      <Form onSubmit={(event) => submitLogin(event)} className="m-3">
        <Form.Group controlId="login">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Sign in
        </Button>
      </Form>
    </div>
  );
}
