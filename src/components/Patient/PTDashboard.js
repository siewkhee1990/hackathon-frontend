import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Table,
  Nav,
  Modal,
  Navbar,
  FormControl,
  Container,
  Row,
  Col,
  Accordion,
  Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Appointments from "../GP/Tabs/Appointments";
import { BACKEND_URL_APPOINTMENTS } from "../Constant";

export default function PTDashboard(props) {
  // const [thisUser, setThisUser] = useState(true);
  // const [patients, setPatients] = useState([]);
  // const [edit, setEdit] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("ptoken"));
    if (!token) {
      alert("Please login to use the system!");
      props.history.push("/patient");
    } else {
      axios
        .get(`${BACKEND_URL_APPOINTMENTS}/pid/${token.pid}`)
        .then((response) => {
          console.log(response);
          setAppointments(response.data);
        })
        .catch((error) => {
          if (!error.response) {
            console.log(error);
          } else if (!error.response.data) {
            console.log(error.response);
          } else {
            alert(error.response.data.message);
          }
        });
    }
  }, []);

  const deleteAppointment = (id, info) => {
    console.log(id);
    console.log(info);
  };

  const checkIn = (event) => {
    event.preventDefault();
  };

  const logout = (event) => {
    event.preventDefault();
    localStorage.removeItem("ptoken");
    props.history.push("/patient");
  };

  const [modalShow, setModalShow] = React.useState(false);

  //Patient Dashboard
  return (
    <div className="App mt-5">
      {/* Navigation Bar */}
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">My Profile</Navbar.Brand>

        <Nav className="mr-auto">
          <Link to="/patient/appointment">
            <Nav.Link href="#myAppointments">My Appointments</Nav.Link>
          </Link>
          <Link to="">
            <Nav.Link href="#logout">logout</Nav.Link>
          </Link>
        </Nav>

        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-light">Search</Button>
        </Form>
      </Navbar>

      {/* Creating continers for the contents */}

      <Container fluid>
        {/* 1st row */}
        <Row className="m-3">
          <Col>
            <Card border="success" style={{ width: "Auto" }}>
              <Card.Header bg="success" text="white">Upcoming Appointments</Card.Header>
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Date</th>
                      <th>Vacine Type</th>
                      <th>GP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((element) => {
                      return (
                        <tr key={element.aid} id={element.aid}>
                          <td>{element.aid}</td>

                          <td>{element.date}</td>

                          <td>{element.vaccineType}</td>

                          <td>{element.clinicName}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* 2nd row - Health checkup */}
        <Row className="m-3">
          <Col>
            <Card border="warning" style={{ width: "Auto" }}>
              <Card.Header bg="warning">Health Checkup!</Card.Header>

              <Card.Body>
                <Card.Text>Update your daily progress!</Card.Text>

                <Button variant="warning" onClick={() => setModalShow(true)}>
                  Start
                </Button>

                <HealthCheckUpModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card border="danger" style={{ width: "Auto" }}>
              <Card.Header bg="danger" text="white">Emergency Hotlines!</Card.Header>

              <Card.Body>
                <Card.Text>Reach out to an officer!</Card.Text>
                <Button variant="danger">Call</Button>{" "}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* 3rd Row */}
        <Row className="m-3">
          <Col>
            <Card border="info" style={{ width: "Auto" }}>
              <Card.Header bg="info" text="white">Useful Information</Card.Header>
              <Card.Body className="m-2">
                <Accordion className="m-1">
                  <Card>
                    <Card.Header bg="info" text="white">
                      <Accordion.Toggle as={Button} text="white" eventKey="0">
                        Vaccination side effects!
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <li>Vommitting</li>
                        <li>Nausea</li>
                        <li>Pain</li>
                        <li>Breathlessness</li>
                        <li>Panic</li>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>

                {/* <Accordion className="m-1">
                                    <Card>

                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                Good hygeine practices!
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                                <li>Vommitting</li>
                                                <li>Nausea</li>
                                                <li>Pain</li>
                                                <li>Breathlessness</li>
                                                <li>Panic</li>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>

                                </Accordion> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

//Helth Checkup Modal!
function HealthCheckUpModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Vaccination Monitoring Procedure
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Please provide the required information!</p>

        {/* Health Checup Form    */}
        <Form>
          <fieldset>
            {/* Pain */}
            <Form.Group>
              {["checkbox"].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                  <Form.Text>
                    Are you experiencing pain anywhere in your body?
                  </Form.Text>
                  <Form.Check
                    inline
                    label="Yes"
                    type={type}
                    id={`inline-${type}-1`}
                  />
                  <Form.Check
                    inline
                    label="No"
                    type={type}
                    id={`inline-${type}-2`}
                  />
                </div>
              ))}
            </Form.Group>

            {/* Fever */}
            <Form.Group>
              {["checkbox"].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                  <Form.Text>Are you having headaches/fever/chills?</Form.Text>
                  <Form.Check
                    inline
                    label="Not at all"
                    type={type}
                    id={`inline-${type}-1`}
                  />
                  <Form.Check
                    inline
                    label="Bearable"
                    type={type}
                    id={`inline-${type}-2`}
                  />
                  <Form.Check
                    inline
                    label="Extreme"
                    type={type}
                    id={`inline-${type}-2`}
                  />
                </div>
              ))}
            </Form.Group>

            {/* Rashes?                 */}
            <Form.Group>
              {["checkbox"].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                  <Form.Text>
                    Are there any Signs of redness or rashes on your skin?
                  </Form.Text>
                  <Form.Check
                    inline
                    label="Yes"
                    type={type}
                    id={`inline-${type}-1`}
                  />
                  <Form.Check
                    inline
                    label="No"
                    type={type}
                    id={`inline-${type}-2`}
                  />
                </div>
              ))}
            </Form.Group>

            {/* Exhausted         */}
            <Form.Group>
              {["checkbox"].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                  <Form.Text>Are you feeling tired or exhausted?</Form.Text>
                  <Form.Check
                    inline
                    label="Not at all"
                    type={type}
                    id={`inline-${type}-1`}
                  />
                  <Form.Check
                    inline
                    label="A little"
                    type={type}
                    id={`inline-${type}-2`}
                  />
                  <Form.Check
                    inline
                    label="Exhausted"
                    type={type}
                    id={`inline-${type}-2`}
                  />
                </div>
              ))}
            </Form.Group>

            {/* Nausea?         */}
            <Form.Group>
              {["checkbox"].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                  <Form.Text> Any feeling of sickness or nausea?</Form.Text>
                  <Form.Check
                    inline
                    label="Not at all"
                    type={type}
                    id={`inline-${type}-1`}
                  />
                  <Form.Check
                    inline
                    label="A little"
                    type={type}
                    id={`inline-${type}-2`}
                  />
                  <Form.Check
                    inline
                    label="I need assistance!"
                    type={type}
                    id={`inline-${type}-2`}
                  />
                </div>
              ))}
            </Form.Group>

            <Form.Group>
              {["checkbox"].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                  <Form.Text>Sudden loss or gain of weight?</Form.Text>
                  <Form.Check
                    inline
                    label="Yes"
                    type={type}
                    id={`inline-${type}-1`}
                  />
                  <Form.Check
                    inline
                    label="No"
                    type={type}
                    id={`inline-${type}-2`}
                  />
                </div>
              ))}
            </Form.Group>
          </fieldset>

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit" onClick={props.onHide}>
                Submit
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
