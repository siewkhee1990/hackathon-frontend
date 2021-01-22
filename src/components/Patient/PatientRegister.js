import { useState } from "react";
import axios from "axios";
import { BACKEND_URL_PATIENTS } from "../Constant";
import { Button, Form } from "react-bootstrap";

function PatientRegister() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [NRIC, setNRIC] = useState("");

  const fetchData = (event) => {
    event.preventDefault();
    axios.get(`${BACKEND_URL_PATIENTS}/fetch/${NRIC}`).then((response) => {
      console.log(response);
    });
  };

  const register = (event) => {
    event.preventDefault();
    if (password === confirmpassword) {
      axios
        .post(`${BACKEND_URL_PATIENTS}/register`, {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
          confirmpassword: confirmpassword,
          phonenumber: phonenumber,
        })
        .then((res) => {
          console.log(res.data);
          alert("Registeration successful");
        })
        .catch((error) => {
          console.log(error.response);
        });
    } else {
      alert("Confirm password and password not matched!");
    }
  };

  return (
    <div>
      <h1>Patient Register</h1>
      <Form.Group controlId="nric">
        <Form.Label>Key in NRIC / FIN</Form.Label>
        <Form.Control
          type="text"
          placeholder="Type in NRIC / FIN to fill in data."
          value={NRIC}
          onChange={(event) => setNRIC(event.target.value)}
        />
        <Button onClick={(event) => fetchData(event)}>fetch info</Button>
      </Form.Group>

      <Form onSubmit={(event) => register(event)} className="m-3">
        <Form.Group controlId="firstname">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="first name"
            required
            value={firstname}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="lastname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="last name"
            required
            value={lastname}
            onChange={(event) => setLastName(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password(8 characters)"
            required
            minLength="8"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="confirmpassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="confirm password"
            required
            minLength="8"
            value={password}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="phonenumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="phone"
            placeholder="phone number"
            pattern="^[8-9][0-9]{7}$"
            required
            value={phonenumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>
    </div>
  );
}

export default PatientRegister;
