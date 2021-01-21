import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import Testing from "./components/Testing";
import Main from "./components/Main";
import PatientLogin from "./components/Patient/PatientLogin";
import GPLogin from "./components/GP/GPLogin";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/patient" component={PatientLogin} />
        <Route path="/gp" component={GPLogin} />
        {/* <Testing /> */}
      </Switch>
    </>
  );
}

export default App;
