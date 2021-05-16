import { useContext, useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Login } from "./Login";
import { Me } from "./Me";
import { Signup } from "./Signup";
import UserContext from "./user-context";

function App() {
  const [user, setUser] = useState({ accessToken: null });

  return (
    <UserContext.Provider value={{ user, setUser }}>
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
            <Route exact path="/me">
              <Me />
            </Route>
          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
