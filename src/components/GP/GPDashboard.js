import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_URL_APPOINTMENTS } from "../Constant";
import { Button, Tabs, Tab } from "react-bootstrap";
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
        .get(`${BACKEND_URL_APPOINTMENTS}/gpid/${thisUser.gpid}`)
        .then((response) => {
          setAppointments(response.data);
        })
        .catch((err) => {
          props.setToastError(true);
          if (!err.response) {
            console.log(err);
            props.setErrorMessage(err.message);
          } else if (!err.response.data) {
            console.log(err.response);
            props.setErrorMessage(err.response.message);
          } else {
            props.setErrorMessage(err.response.data.message);
          }
        });
    }
  }, [thisUser, update]);

  const toggleUpdate = () => {
    setUpdate(!update);
  };

  const deleteAppointment = (id, info) => {
    axios
      .delete(`${BACKEND_URL_APPOINTMENTS}/id/${id}`)
      .then((response) => {
        console.log(response);
        props.setToastSuccess(true);
        props.setSuccessMessage(response.data.message);
        setUpdate(!update);
      })
      .catch((err) => {
        props.setToastError(true);
        if (!err.response) {
          console.log(err);
          props.setErrorMessage(err.message);
        } else if (!err.response.data) {
          console.log(err.response);
          props.setErrorMessage(err.response.message);
        } else {
          props.setErrorMessage(err.response.data.message);
        }
      });
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
        .put(`${BACKEND_URL_APPOINTMENTS}/id/${id}/changeDate`, data)
        .then((response) => {
          props.setToastSuccess(true);
          props.setSuccessMessage(response.data.message);
          setEdit(null);
          setUpdate(!update);
        })
        .catch((err) => {
          props.setToastError(true);
          if (!err.response) {
            console.log(err);
            props.setErrorMessage(err.message);
          } else if (!err.response.data) {
            console.log(err.response);
            props.setErrorMessage(err.response.message);
          } else {
            props.setErrorMessage(err.response.data.message);
          }
        });
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
          logout(event);
        }}
      >
        Logout
      </Button>
      <Tabs defaultActiveKey="appointments" id="uncontrolled-tab-example">
        {thisUser && (
          <Tab eventKey="gpinfo" title="GP Info">
            <h1 className="m-5">My Clinic's Info</h1>
            <div className="mx-5 text-left">
              <h2>Name: {thisUser.clinicName}</h2>
              <h4>Address: {thisUser.address}</h4>
              <h4>E-mail: {thisUser.email}</h4>
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
          <CheckingIn
            toggleUpdate={toggleUpdate}
            setToastSuccess={props.setToastSuccess}
            setToastError={props.setToastError}
            setSuccessMessage={props.setSuccessMessage}
            setErrorMessage={props.setErrorMessage}
          />
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
