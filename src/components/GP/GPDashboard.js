import React, { useState } from "react";
import { Button, Form, Tabs, Tab, Table } from "react-bootstrap";

export default function GPDashboard() {
  const [thisUser, setThisUser] = useState(true);
  const [patients, setPatients] = useState([]);
  const [edit, setEdit] = useState(null);

  const deleteAppointment = (id, info) => {
    console.log(id);
    console.log(info);
  };

  const checkIn = (event) => {
    event.preventDefault();
  };

  const logout = (event) => {
    event.preventDefault();
  };

  return (
    <div className="App mt-5">
      <h2>GP Dashboard</h2>
      <Tabs defaultActiveKey="appointments" id="uncontrolled-tab-example">
        <Tab eventKey="appointments" title="Appointments">
          <h1 className="m-5">Appointments</h1>
          <div className="mx-5">
            <Table striped bordered hover variant="outlined-light">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Patient Name</th>
                  <th>Appointment Date</th>
                  <th>Vaccive Type</th>
                  <th>Next Appointment</th>
                  <th>Edit Appt.</th>
                  <th>Delete Appt.</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((element, index) => {
                  if (element.addedBy === thisUser) {
                    return (
                      <tr key={index + 1}>
                        <td>{index + 1}</td>
                        <td>{element.firstName + " " + element.lastName}</td>
                        <td>{element.date}</td>
                        <td>{element.vaccintType}</td>
                        <td>
                          <button>Schedule</button>
                        </td>
                        <td>{element.language}</td>
                        <td>
                          <Button
                            variant="outline-warning"
                            onClick={() => setEdit(element)}
                          >
                            Edit
                          </Button>
                        </td>
                        <td>
                          <Button
                            variant="outline-danger"
                            onClick={() =>
                              deleteAppointment(element.id, element)
                            }
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </Table>
          </div>
        </Tab>

        <Tab eventKey="checkin" title="Check Patient In">
          <Form onSubmit={(event) => checkIn(event)} className="m-3">
            <Form.Group controlId="login">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email address"
                // value={email}
                // onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                // value={password}
                // onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="m-5">
              Scan QR Code
            </Button>
          </Form>
        </Tab>
        {/* Appointments */}
        {/* user scan in */}
        {/* Scan Appointment check-in */}
      </Tabs>
    </div>
  );
}
