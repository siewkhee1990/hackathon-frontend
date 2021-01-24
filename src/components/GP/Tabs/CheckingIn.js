import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_URL_APPOINTMENTS, BACKEND_URL_PATIENTS } from "../../Constant";
import { Button, Form } from "react-bootstrap";

export default function CheckingIn(props) {
  const [appointment, setAppointment] = useState("");
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [NRIC, setNRIC] = useState("");

  useEffect(() => {
    setID(appointment.aid);
    setName(appointment.name);
    setAppointmentDate(appointment.date);
  }, [appointment]);

  const checkIn = (event) => {
    event.preventDefault();
    if (!id || !name || !appointmentDate) {
      alert("Please enter required field!");
    } else {
      axios
        .put(`${BACKEND_URL_APPOINTMENTS}/id/${id}/status/completed`)
        .then((response) => {
          console.log(response);
          props.setToastSuccess(true);
          props.setSuccessMessage(response.data.message);
          setNRIC("");
          setID("");
          setName("");
          setAppointmentDate("");
          setAppointment("");
          props.toggleUpdate();
        })
        .catch((err) => {
          props.setToastError(true);
          if (!err.response) {
            console.log(err);
            props.setErrorMessage(err);
          } else if (!err.response.data) {
            console.log(err.response);
            props.setErrorMessage(err.response);
          } else {
            props.setErrorMessage(err.response.data.message);
          }
        });
    }
  };

  const fetchData = (event) => {
    event.preventDefault();
    let { gpid } = JSON.parse(localStorage.getItem("gptoken"));
    if (!NRIC) {
      props.setToastError(true);
      props.setErrorMessage("Please enter NRIC to use this feature!");
    } else {
      axios.get(`${BACKEND_URL_PATIENTS}/fetch/${NRIC}`).then((response) => {
        console.log(response);
        axios
          .get(
            `${BACKEND_URL_APPOINTMENTS}/gpid/${gpid}/email/${response.data.email}`
          )
          .then((response) => {
            console.log(response);
            if (response.data.length === 1) {
              setAppointment(response.data[0]);
              props.setToastSuccess(true);
              props.setSuccessMessage("Appointment found!");
            }
          })
          .catch((err) => {
            props.setToastError(true);
            if (!err.response) {
              console.log(err);
              props.setErrorMessage(err);
            } else if (!err.response.data) {
              console.log(err.response);
              props.setErrorMessage(err.response);
            } else {
              props.setErrorMessage(err.response.data.message);
            }
          });
      });
    }
  };
  return (
    <>
      <Form onSubmit={(event) => checkIn(event)} className="m-3">
        <h2>Key in</h2>
        <Form.Group controlId="nric">
          <Form.Label>NRIC / FIN</Form.Label>
          <Form.Control
            type="text"
            placeholder="Type in NRIC / FIN to fill in data."
            value={NRIC}
            onChange={(event) => setNRIC(event.target.value)}
          />
          <Button
            className="my-3"
            variant="outline-primary"
            onClick={(event) => fetchData(event)}
          >
            fetch info
          </Button>
        </Form.Group>
        <h2>-------------------- Or --------------------</h2>
        <Form.Group controlId="id">
          <Form.Label>Appointment ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter appointment ID"
            value={id}
            required
            onChange={(event) => setID(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="patientname">
          <Form.Label>Patient's Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter patient's name"
            value={name}
            required
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="vaccinetype">
          <Form.Label>Vaccination Type</Form.Label>
          <Form.Control type="text" value="Covid-19" readOnly />
        </Form.Group>

        <Form.Group controlId="date">
          <Form.Label>Appointment Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter date of appointment"
            value={appointmentDate}
            required
            onChange={(event) => setAppointmentDate(event.target.value)}
          />
        </Form.Group>

        <Button
          variant="outline-primary"
          type="submit"
          className="m-5"
          disabled={!id || !name || !appointmentDate ? true : false}
        >
          Check-In
        </Button>

        {/* <Button variant="outline-primary" type="submit" className="m-5">
              Scan QR Code
            </Button> */}
      </Form>
    </>
  );
}
