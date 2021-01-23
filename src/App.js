import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
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

function App() {
  return (
    <div className="w-75 mt-5 mx-auto">
      <Testing />
      <Switch>
        <Route exact path="/" components={Main} />
        <Route path="/patient/register" components={PatientRegister} />
        <Route path="/patient/dashboard" components={PTDashboard} />
        <Route path="/patient/appointment" components={Appointment} />
        <Route path="/gp/register" components={GPRegister} />
        <Route path="/gp/dashboard" component={GPDashboard} />
        <Route path="/patient" component={PatientLogin} />
        <Route path="/gp" component={GPLogin} />
        {/* <Testing /> */}
      </Switch>
    </div>
  );
}

export default App;
