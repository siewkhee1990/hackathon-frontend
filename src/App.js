import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Testing from "./components/Testing";
import Main from "./components/Main";
import PatientLogin from "./components/Patient/PatientLogin";
import PatientRegister from "./components/Patient/PatientRegister";
import PTDashboard from "./components/Patient/PTDashboard";
import Appointment from "./components/Patient/Appointment";
import GPLogin from "./components/GP/GPLogin";
import GPDashboard from "./components/GP/GPDashboard";
import GPRegister from "./components/GP/GPRegister";
import Notification from "./components/Notification";

function App() {
  const [toastSuccess, setToastSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [toastError, setToastError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setToastSuccess(false);
      setToastError(false);
      setSuccessMessage("");
      setErrorMessage("");
    }, 4000);
  }, [toastError, toastSuccess]);

  return (
    <div className="w-75 mt-5 mx-auto">
      <Notification
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "relative",
          minHeight: "200px",
        }}
        errorMessage={errorMessage}
        successMessage={successMessage}
        toastSuccess={toastSuccess}
        setToastSuccess={setToastSuccess}
        toastError={toastError}
        setToastError={setToastError}
      />
      <Testing />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route
          path="/patient/register"
          render={(props) => (
            <PatientRegister
              {...props}
              setToastSuccess={setToastSuccess}
              setToastError={setToastError}
              setSuccessMessage={setSuccessMessage}
              setErrorMessage={setErrorMessage}
            />
          )}
        />
        <Route
          path="/patient/dashboard"
          render={(props) => (
            <PTDashboard
              {...props}
              setToastSuccess={setToastSuccess}
              setToastError={setToastError}
              setSuccessMessage={setSuccessMessage}
              setErrorMessage={setErrorMessage}
            />
          )}
        />
        <Route
          path="/patient/appointment"
          render={(props) => (
            <Appointment
              {...props}
              setToastSuccess={setToastSuccess}
              setToastError={setToastError}
              setSuccessMessage={setSuccessMessage}
              setErrorMessage={setErrorMessage}
            />
          )}
        />
        <Route
          path="/gp/register"
          render={(props) => (
            <GPRegister
              {...props}
              setToastSuccess={setToastSuccess}
              setToastError={setToastError}
              setSuccessMessage={setSuccessMessage}
              setErrorMessage={setErrorMessage}
            />
          )}
        />
        <Route
          path="/gp/dashboard"
          render={(props) => (
            <GPDashboard
              {...props}
              setToastSuccess={setToastSuccess}
              setToastError={setToastError}
              setSuccessMessage={setSuccessMessage}
              setErrorMessage={setErrorMessage}
            />
          )}
        />
        <Route
          path="/patient"
          render={(props) => (
            <PatientLogin
              {...props}
              setToastError={setToastError}
              setErrorMessage={setErrorMessage}
            />
          )}
        />
        <Route
          path="/gp"
          render={(props) => (
            <GPLogin
              {...props}
              setToastError={setToastError}
              setErrorMessage={setErrorMessage}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
