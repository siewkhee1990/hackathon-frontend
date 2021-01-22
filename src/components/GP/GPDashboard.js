import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_URL_APPOINTMENTS } from "../Constant";
import { Button, Form, Tabs, Tab, Table } from "react-bootstrap";
import CheckingIn from "./Tabs/CheckingIn";
import Appointments from "./Tabs/Appointments";
import Edit from "./Tabs/Edit";

export default function GPDashboard(props) {
  const [appointments, setAppointments] = useState([]);
  const [thisUser, setThisUser] = useState(null);
  const [newAppointmentDate, setNewAppointmentDate] = useState("");
  // const [patients, setPatients] = useState([]);
  const [edit, setEdit] = useState(null);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    let info = JSON.parse(localStorage.getItem("gptoken"));
    if (!info) {
      alert("Please login to use this page!");
      props.history.push("/gp");
    } else {
      setThisUser(info);
    }
  }, []);

  useEffect(() => {
    if (thisUser) {
      axios
        .get(`${BACKEND_URL_APPOINTMENTS}/${thisUser.gpid}`)
        .then((response) => {
          console.log(response);
          setAppointments(response.data);
        });
    }
  }, [thisUser, update]);

  const deleteAppointment = (id, info) => {
    console.log(id);
    console.log(info);
  };

  const check = (event) => {
    event.preventDefault();
    console.log(thisUser);
  };

  const updateAppointment = (event, id) => {
    event.preventDefault();
    if (!newAppointmentDate) {
      alert("Pleasee enter a date!");
    } else {
      let data = {
        date: newAppointmentDate,
      };
      axios
        .put(`${BACKEND_URL_APPOINTMENTS}/${id}/changeDate`, data)
        .then((response) => {
          alert(response.data.message);
          setEdit(null);
          setUpdate(!update);
        })
        .catch((err) => console.log(err));
    }
  };

  const logout = (event) => {
    event.preventDefault();
    localStorage.removeItem("gptoken");
    props.history.push("/");
  };

  return (
    <div className="App mt-5">
      <h2>GP Dashboard</h2>
      <Button
        variant="outline-danger"
        onClick={(event) => {
          check(event);
        }}
      >
        Check
      </Button>
      <Tabs defaultActiveKey="appointments" id="uncontrolled-tab-example">
        {thisUser && (
          <Tab eventKey="gpinfo" title="GP Info">
            <h1 className="m-5">My Clinic's Info</h1>
            <div className="mx-5 text-left">
              <p>
                <h2>Name: {thisUser.clinicName}</h2>
              </p>
              <p>
                <h4>Address: {thisUser.address}</h4>
              </p>
              <p>
                <h4>E-mail: {thisUser.email}</h4>
              </p>
            </div>
          </Tab>
        )}

        <Tab eventKey="appointments" title="Appointments">
          <h1 className="m-5">Appointments</h1>
          <div className="mx-5">
            <Appointments
              appointments={appointments}
              setEdit={setEdit}
              deleteAppointment={deleteAppointment}
            />
          </div>
        </Tab>

        <Tab eventKey="checkin" title="Check Patient In">
          <CheckingIn update={update} setUpdate={setUpdate} />
        </Tab>

        {edit && thisUser && (
          <Tab
            eventKey="edit"
            title={
              "Edit Appointment: S/N " +
              (appointments
                .map(function (e) {
                  return e.aid;
                })
                .indexOf(edit.aid) +
                1)
            }
          >
            <Edit
              edit={edit}
              newAppointmentDate={newAppointmentDate}
              setNewAppointmentDate={setNewAppointmentDate}
              setEdit={setEdit}
              updateAppointment={updateAppointment}
            />
          </Tab>
        )}
        {/* Appointments */}
        {/* user scan in */}
        {/* Scan Appointment check-in */}
      </Tabs>
    </div>
  );
}
