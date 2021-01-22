import React, { useState } from "react";
import { Button, Form, Tabs, Tab, Table, Nav } from "react-bootstrap";

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

            <nav class="navbar navbar-inverse visible-xs">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" href="#">My Profile</a>
                    </div>
                    <div class="collapse navbar-collapse" id="myNavbar">
                        <ul class="nav navbar-nav">
                            <li class="active"><a href="#">Dashboard</a></li>
                            <li><a href="#">My Info</a></li>
                            <li><a href="#">Medical History</a></li>
                            <li><a href="#">Logout</a></li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div class="container-fluid">
                <div class="row content">
                    <div class="col-sm-3 sidenav hidden-xs">
                        <h2>Profile Picture</h2>
                        <ul class="nav nav-pills nav-stacked">
                            <li class="active"><a href="#section1">Dashboard</a></li>
                            <li><a href="#section2">My Info</a></li>
                            <li><a href="#section3">Chekup History</a></li>
                            <li><a href="#section3">Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>


            <div class="col-sm-9">
                <div class="well">
                    <h4>Upcoming Appointments</h4>
                    <p>COVID-19 Vaccination: 21 MAR 2021</p>

                </div>

                <div class="row">
                    <div class="col-sm-5">
                        <div class="well">
                            <h4>Checkup</h4>
                            <button type="button" class="icon-bar">
                                Start
              </button>
                        </div>
                    </div>

                    <div class="col-sm-5">
                        <div class="well">
                            <h4>Emergency</h4>
                            <button type="button" class="icon-bar">
                                Call
              </button>
                        </div>
                    </div>


                    <div class="col-sm-10">
                        <div class="well">
                            <h4>Common Symptoms</h4>
                            <p>1. Headache</p>
                            <p>2. Vomitting</p>
                            <p>3. Nausea</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
