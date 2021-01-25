import React from "react";
import { Button, Table } from "react-bootstrap";

export default function Appointments(props) {
  return (
    <>
      <Table striped bordered hover variant="outlined-light">
        <thead>
          <tr>
            <th>S/N</th>
            <th>Appt. ID</th>
            <th>Patient Name</th>
            <th>Appointment Date</th>
            <th>Vaccive Type</th>
            <th>Status</th>
            <th>Next Appointment</th>
            <th>Edit Appt.</th>
            <th>Delete Appt.</th>
          </tr>
        </thead>
        <tbody>
          {props.appointments &&
            props.appointments.map((element, index) => {
              return (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td>{element.aid}</td>
                  <td>{element.name}</td>
                  <td>{element.date}</td>
                  <td>{element.vaccineType}</td>
                  <td>{element.status}</td>
                  <td>
                    <Button
                      variant={
                        element.status === "completed"
                          ? "outline-success"
                          : "outline-secondary"
                      }
                      disabled={element.status !== "completed"}
                    >
                      Schedule
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant={
                        element.status === "pending"
                          ? "outline-warning"
                          : "outline-secondary"
                      }
                      onClick={() => props.setEdit(element)}
                      disabled={element.status === "completed"}
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant={
                        element.status === "pending"
                          ? "outline-danger"
                          : "outline-secondary"
                      }
                      onClick={() =>
                        props.deleteAppointment(element.aid, element)
                      }
                      disabled={element.status === "completed"}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
}
