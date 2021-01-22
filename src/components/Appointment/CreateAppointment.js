import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BACKEND_URL_APPOINTMENTS } from "../Constant";

export default function CreateAppointment() {
  const [vaccination, setVaccination] = useState("Covid-19");
  const [date, setDate] = useState("");

  const createAppointment = (event) => {
    event.preventDefault();
    if (!date || !vaccination) {
      alert("Please fill in required field!");
    } else {
      let data = {
        vaccination: vaccination,
        date: new Date(date),
      };
      axios
        .post(`${BACKEND_URL_APPOINTMENTS}/create`, data)
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <div>
        <h2>Create Appointment</h2>
        <Form onSubmit={(event) => createAppointment(event)} className="m-3">
          <Form.Group controlId="genre">
            <Form.Label>Vaccine</Form.Label>
            <Form.Control
              as="select"
              value={vaccination}
              readOnly
              onChange={(e) => setVaccination(e.target.value)}
            >
              <option>Covid-19</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="genre">
            <Form.Label>Vaccination Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Select date..."
              format="YYYY-Mmm-DD"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Create
          </Button>
        </Form>
      </div>
    </div>
  );
}
