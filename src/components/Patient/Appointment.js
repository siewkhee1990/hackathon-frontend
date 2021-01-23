import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BACKEND_URL_APPOINTMENTS, BACKEND_URL_GPS } from "../Constant";

export default function Appointment(props) {
  const [vaccineType, setVaccineType] = useState("Covid-19");
  const [date, setDate] = useState("");
  const [gps, setGps] = useState([]);
  const [gpid, setGpid] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("ptoken");
    if (!token) {
      alert("Please login to make an appointment!");
      props.history.push("/patient");
    } else {
      axios
        .get(`${BACKEND_URL_GPS}`)
        .then((response) => {
          setGps(response.data);
        })
        .catch((err) => {
          if (!err.response) {
            console.log(err);
          } else if (!err.response.data) {
            console.log(err.response);
          } else {
            alert(err.response.data.message);
          }
        });
    }
  }, []);

  const createAppointment = (event) => {
    event.preventDefault();
    if (!date || !vaccineType || !gpid) {
      alert("Please fill in required field!");
    } else {
      let info = JSON.parse(localStorage.getItem("ptoken"));
      let data = {
        pid: info.pid,
        name: info.name,
        phoneNumber: info.phoneNumber,
        vaccineType: vaccineType,
        date: date,
        gpid: gpid,
      };
      axios
        .post(`${BACKEND_URL_APPOINTMENTS}/create`, data)
        .then((response) => {
          console.log(response);
          alert(response.data.message);
          props.history.push("/patient/dashboard");
        })
        .catch((err) => {
          if (!err.response) {
            console.log(err);
          } else if (!err.response.data) {
            console.log(err.response);
          } else {
            alert(err.response.data.message);
          }
        });
    }
  };

  return (
    <div>
      <div>
        <h2>Book New Appointment</h2>
        <Form onSubmit={(event) => createAppointment(event)} className="m-3">
          <Form.Group controlId="vaccination">
            <Form.Label>Vaccination Type</Form.Label>
            <Form.Control
              as="select"
              value={vaccineType}
              readOnly
              onChange={(e) => setVaccineType(e.target.value)}
            >
              <option>Covid-19</option>
              <option>Influenza</option>
              <option>Hepatitis</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="date">
            <Form.Label>Appointment Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Select date..."
              format="YYYY-Mmm-DD"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="generalpractitioner">
            <Form.Label>GP</Form.Label>
            <Form.Control
              as="select"
              defaultValue="Choose..."
              value={gpid}
              onChange={(e) => setGpid(e.target.value)}
            >
              <option>Choose...</option>
              {gps.map((element) => {
                return (
                  <option key={element.gpid} value={element.gpid}>
                    {element.clinicName}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">
            Create
          </Button>
        </Form>
      </div>
    </div>
  );
}
