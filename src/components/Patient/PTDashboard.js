//------------------------------------------- IMPORTS ----------------------------------------------------
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
import Image from 'react-bootstrap/Image'
import vmslogo from '../../../src/vmslogo.png'


export default function PTDashboard(props) {

  //--------------------------------------------- VARIABLES -----------------------------------------------
  const [toggle, setToggle] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);



  //--------------------------------------------- FUNCTIONS -----------------------------------------------

  //--- Retrieval Function ---
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

  //--- Appointment Deletion Function ---
  const deleteAppointment = (id, info) => {
    console.log(id);
    console.log(info);
  };

  //--- Patient Checkin Function ---
  const checkIn = (event) => {
    event.preventDefault();
  };

  //--- Logout Function ---
  const logout = (event) => {
    event.preventDefault();
    localStorage.removeItem("ptoken");
    props.history.push("/patient");
  };

  //--- Health Checkup Toggle Function ---
  const check = (event) => {
    event.preventDefault();
    console.log(toggle);
  }



  //--------------------------------------- PATIENT DASHBOARD DESIGN BEGINS NOW!!! ----------------------------------
  return (
    <div className="App mt-5">

      {/*---------------------------------- NAVIGATION BAR -----------------------------------------*/}
      <Navbar className="text-white" style={{ backgroundColor: "#1c1f54ff" }} variant="dark">
        <Navbar.Brand href="#home">My Dashboard</Navbar.Brand>

        <Nav className="mr-auto">
          <Link to="/patient/appointment">
            <Nav.Link href="#myAppointments">New Appointment</Nav.Link>
          </Link>
          <Link to="">
            <Nav.Link href="#logout">logout</Nav.Link>
          </Link>
        </Nav>

        <Image src={vmslogo} style={{ height: "50px" }} />

      </Navbar>


      {/* Creating the containers in Patient Dashboard */}

      <Container fluid>

        {/* ----------------------------------- UPCOMING APPOINTMENT ------------------------------- */}
        <Row className="m-3">
          <Col>
            <Card style={{ width: "Auto", border: " 1px solid #375efc" }}>
              <Card.Header className="text-white" style={{ backgroundColor: "#375efc" }} >Upcoming Appointments</Card.Header>
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
        

        {/* -------------------------------------- HEALTH CHECKUP -------------------------------------- */}
        <Row className="m-3">
          <Col>
            <Card border="warning" >
              <Card.Header className={!toggle ? "bg-warning" : "bg-success"} >Health Checkup!</Card.Header>

              <Card.Body>
                <Card.Text>Update your daily progress!</Card.Text>

                <Button variant={!toggle ? "warning" : "success"} onClick={() => setModalShow(true)}>
                  {!toggle ? "start" : "completed"}
                </Button>

                <HealthCheckUpModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  alter={(event) => {
                    event.preventDefault()
                    setToggle(!toggle)
                    setModalShow(false)
                  }}
                />
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card border="danger" style={{ width: "Auto" }}>
              <Card.Header className="bg-danger" text="white">Emergency Hotlines!</Card.Header>

              <Card.Body>
                <Card.Text>Reach out to an officer!</Card.Text>
                <Button variant="danger">Call</Button>{" "}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* ----------------------------USEFUL INFORMATION-------------------------*/}
        <Row className="m-3">
          <Col>
            <Card style={{ width: "Auto", border: " 1px solid #375efc" }}>
              <Card.Header className="text-white" style={{ backgroundColor: "#375efc" }} >Useful Information</Card.Header>
              <Card.Body className="m-2">
                <Accordion className="m-1">
                  <Card>
                    <Card.Header bg="info" text="white">
                      <Accordion.Toggle as={Link} text="white" eventKey="0">
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

              <Button type="submit" onClick={(event) => props.alter(event)}>
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

//------------------------------------------------REFERENCES--------------------------------------------------
// 1. Brand color: #1c1f54ff - Background, "#375efc" - Syringe, 




//FOR TESTING PURPOSES!!!

{/* THIS SEARCH BUTTON IS FOR TESTNG PURPOSES */ }
{/* <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-light" onClick={(event) => check(event)} >Search</Button>
        </Form> */}