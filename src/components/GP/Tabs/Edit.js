import React from "react";
import { Button, Form } from "react-bootstrap";

export default function Edit(props) {
  return (
    <>
      <Form
        className="m-3"
        onSubmit={(event) => {
          props.updateAppointment(event, props.edit.aid);
        }}
      >
        <Form.Group controlId="patientname">
          <Form.Label>Patient's Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter patient's name"
            value={props.edit.name}
            readOnly
          />
        </Form.Group>

        <Form.Group controlId="vaccinetype">
          <Form.Label>Vaccination Type</Form.Label>
          <Form.Control type="text" value="Covid-19" readOnly />
        </Form.Group>

        <Form.Group controlId="oridate">
          <Form.Label>Original Appointment Date</Form.Label>
          <Form.Control type="date" value={props.edit.date} readOnly />
        </Form.Group>

        <Form.Group controlId="newdate">
          <Form.Label>New Appointment Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter date of appointment"
            value={props.newAppointmentDate}
            onChange={(event) =>
              props.setNewAppointmentDate(event.target.value)
            }
          />
        </Form.Group>

        <Button variant="outline-primary" type="submit" className="m-5">
          Update
        </Button>

        <Button
          variant="outline-danger"
          type="button"
          className="m-5"
          onClick={() => props.setEdit(null)}
        >
          Cancel
        </Button>
      </Form>
    </>
  );
}
