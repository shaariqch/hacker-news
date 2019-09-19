import React from "react";
import "./App.css";
import Top from "./components/Top";
import User from "./components/User";
import Comments from './components/Comments'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route exact path="/" component={Top} />
          <Route path="/user" component={User} />
          <Route path="/post" component={Comments} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
