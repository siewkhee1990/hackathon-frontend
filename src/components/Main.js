import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Col, Row, Card } from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import vmslogo from '../,,/../../src/vmslogo.png'; // the ../ is to change the directory!

export default function Main() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center'}} >

      <Card style={{ width: '80%' }}>
        
        <div style={{ margin: 'auto', width: '50%' }}>
          <Card.Img variant="top" src={vmslogo} style={{ height: '100%', width: '100%', justifyContent: 'center' }} />
        </div>


        <Card.Body>

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

        </Card.Body>
      </Card>











{/* 
      <Image src={vmslogo} style={{ height: '100%', width: '100%' }} fluid />
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
      </Container> */}

    </div>
  );
}

