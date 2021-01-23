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
        .put(`${BACKEND_URL_APPOINTMENTS}/${id}/status/completed`)
        .then((response) => {
          console.log(response);
          props.setUpdate(!props.update);
        });
    }
  };

  const fetchData = (event) => {
    event.preventDefault();
    if (!NRIC) {
      alert("Please enter NRIC to use this feature!");
    } else {
      axios.get(`${BACKEND_URL_PATIENTS}/fetch/${NRIC}`).then((response) => {
        console.log(response);
        let data = { email: NRIC + response.data.email };
        axios
          .post(`${BACKEND_URL_APPOINTMENTS}/email`, data)
          .then((response) => {
            console.log(response);
            setAppointment(response.data[0]);
          })
          .catch((err) => {
            if (!err.response.data.message) {
              console.log(err.response);
            } else {
              alert(err.response.data.message);
            }
          });
      });
    }
  };
  return (
    <>
      <Form onSubmit={(event) => checkIn(event)} className="m-3">
        <p>
          <h2>Key in</h2>
        </p>
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
        <p>
          <h2>-------------------- Or --------------------</h2>
        </p>
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
