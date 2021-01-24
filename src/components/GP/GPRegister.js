import { useState } from "react";
import axios from "axios";
import { BACKEND_URL_GPS } from "../Constant";
import { Button, Form } from "react-bootstrap";

function GPRegister(props) {
  const [clinicName, setClinicName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adminCode, setAdminCode] = useState("");

  const register = (event) => {
    event.preventDefault();
    if (
      !clinicName ||
      !address ||
      !email ||
      !password ||
      !confirmPassword ||
      !adminCode
    ) {
      props.setToastError(true);
      props.setErrorMessage("Please fill in required field!");
    } else if (password === confirmPassword) {
      axios
        .post(`${BACKEND_URL_GPS}/create`, {
          clinicName: clinicName,
          address: address,
          email: email,
          password: password,
          adminCode: adminCode,
        })
        .then((res) => {
          props.setToastSuccess(true);
          props.setSuccessMessage(res.data.message);
          props.history.push("/gp");
        })
        .catch((error) => {
          props.setToastError(true);
          if (!error.response) {
            console.log(error);
            props.setErrorMessage(error.message);
          } else if (!error.response.data) {
            console.log(error.response);
            props.setErrorMessage(error.response.message);
          } else {
            props.setErrorMessage(error.response.data.message);
          }
        });
    } else {
      props.setToastError(true);
      props.setErrorMessage("Confirm password and password not matched!");
    }
  };

  return (
    <div>
      <h1>GP Register</h1>
      <Form onSubmit={(event) => register(event)} className="m-3">
        <Form.Group controlId="clinicname">
          <Form.Label>Clinic Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Clinic's name"
            required
            value={clinicName}
            onChange={(event) => setClinicName(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="address"
            placeholder="last name"
            required
            value={address}
            onChange={(event) => setAddress(event.target.value)}
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
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="admincode">
          <Form.Label>Admin Code</Form.Label>
          <Form.Control
            type="password"
            placeholder="Admin code"
            required
            value={adminCode}
            onChange={(event) => setAdminCode(event.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>
    </div>
  );
}

export default GPRegister;
