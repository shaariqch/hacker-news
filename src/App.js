import React from "react";
import "./App.css";
import Top from "./components/Top";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route exact path="/" component={Top} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
