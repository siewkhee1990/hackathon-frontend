import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import Testing from "./components/Testing";
import Main from "./components/Main";
import PatientLogin from "./components/Patient/PatientLogin";
import PatientRegister from "./components/Patient/PatientRegister";
import GPLogin from "./components/GP/GPLogin";
import GPDashboard from "./components/GP/GPDashboard";

function App() {
  return (
    <div className="w-75 mt-5 mx-auto">
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/patient/register" component={PatientRegister} />
        <Route path="/patient/dashboard" component={GPDashboard} />
        <Route path="/patient" component={PatientLogin} />
        <Route path="/gp" component={GPLogin} />
        {/* <Testing /> */}
      </Switch>
    </div>
  );
}

export default App;
