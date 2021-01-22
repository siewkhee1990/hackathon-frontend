import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BACKEND_URL_APPOINTMENTS, BACKEND_URL_GPS } from "../Constant";

export default function Appointment() {
    const [vaccineType, setVaccineType] = useState("Covid-19");
    const [date, setDate] = useState("");
    const [nextAppointment, setNextAppointment] = useState("");
    const [status, setStatus] = useState("");
    const [remarks, setRemarks] = useState("");
    const [gps, setGps] = useState([]);
    const [gpid, setGpid] = useState("");

    useEffect(() => {
        axios.get(`${BACKEND_URL_GPS}`).then(response => { setGps(response.data) })

    }, [])


    const createAppointment = (event) => {
        event.preventDefault();
        if (!date || !vaccineType) {
            alert("Please fill in required field!");
        } else {
            let data = {
                vaccineType: vaccineType,
                date: date,
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
                            value={gps} onChange={e => setGps(e.target.value)}>
                            <option>Choose...</option>
                            {gps.map((element) => {
                                return (
                                    
                                    <option>{element.clinicName}</option>
                                )
                            })}
                            


                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Remarks</Form.Label>
                        <Form.Control as="textarea" rows={3}
                            value={remarks} onChange={e => setRemarks(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Create
                    </Button>
                </Form>
            </div>
        </div >
    );
}




