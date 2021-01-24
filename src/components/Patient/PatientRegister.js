import { useState } from "react";
import axios from "axios";
import { BACKEND_URL_PATIENTS } from "../Constant";
import { Button, Form } from "react-bootstrap";

function PatientRegister(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [NRIC, setNRIC] = useState("");

  const fetchData = (event) => {
    event.preventDefault();
    if (NRIC !== "") {
      axios
        .get(`${BACKEND_URL_PATIENTS}/fetch/${NRIC}`)
        .then((response) => {
          setName(response.data.name);
          setEmail(response.data.email);
          setPhoneNumber(response.data.phoneNumber);
          props.setToastSuccess(true);
          props.setSuccessMessage(`Your information has been successfully fetched.
        Please ensure that all the details are correct before 
        proceeding with the registration.`);
        })
        .catch((error) => {
          props.setToastError(true);
          if (!error.response) {
            console.log(error);
            props.setErrorMessage(error);
          } else if (!error.response.data) {
            console.log(error.response);
            props.setErrorMessage(error.message);
          } else {
            props.setErrorMessage(error.response.data.message);
          }
        });
    } else {
      props.setToastError(true);
      props.setErrorMessage("Please enter your NRIC/FIN.");
    }
  };

  const register = (event) => {
    event.preventDefault();
    if (!name || !email || !password) {
      props.setToastError(true);
      props.setErrorMessage("Please fill in required fields!");
    } else if (password.length < 8) {
      props.setToastError(true);
      props.setErrorMessage(
        "Please enter at least 8 characters in password field!"
      );
    } else if (password !== confirmPassword) {
      props.setToastError(true);
      props.setErrorMessage("Confirm password not match!");
    } else {
      axios
        .post(`${BACKEND_URL_PATIENTS}/create`, {
          name: name,
          email: email,
          password: password,
          phoneNumber: phoneNumber,
        })
        .then((res) => {
          props.setToastSuccess(true);
          console.log(res.data);
          props.setSuccessMessage("Registeration successful");
          props.history.push("/patient");
        })
        .catch((error) => {
          props.setToastError(true);
          if (!error.response) {
            props.setErrorMessage(error);
          } else if (!error.response.data) {
            props.setErrorMessage(error.response);
          } else {
            props.setErrorMessage(error.response.data.message);
          }
        });
    }
  };

  return (
    <div>
      <h1>Patient Register</h1>
      <Form>
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

        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="name"
            required
            defaultValue={name}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="email"
            required
            defaultValue={email}
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

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="confirm password"
            required
            minLength="8"
            value={confirmPassword}
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
            defaultValue={phoneNumber}
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          onClick={(event) => register(event)}
        >
          Register
        </Button>
      </Form>
    </div>
  );
}

export default PatientRegister;
