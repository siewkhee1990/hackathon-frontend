import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Col, Row } from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import vmslogo from '../,,/../../src/vmslogo.png'; // the ../ is to change the directory!

export default function Main() {
  return (
    <div >

      <Image src={vmslogo} style={{ height: '', width: '720px' }} fluid />
      <br></br>
      <h4 style={{ display: 'flex', justifyContent: 'center' }}>Welcome to Vaccination Management System! </h4>
      <br></br>
      <Container fluid >
        <Row className="m-3">
          <Col>
            <Link to="/patient" style={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="primary" className="mx-2" >
                Proceed as Patient
        </Button>
            </Link>
          </Col>

          <Col>
            <Link to="/gp" style={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="primary" className="mx-2" >
                Proceed as GP
        </Button>
            </Link>
          </Col>
        </Row>
      </Container>

    </div>
  );
}

