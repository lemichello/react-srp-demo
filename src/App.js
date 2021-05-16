import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Login } from "./Login";
import logo from "./logo.svg";
import { Signup } from "./Signup";

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/me">Me</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>

        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
