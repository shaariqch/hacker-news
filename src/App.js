import React from "react";
import "./App.css";
import Top from "./components/Top";
import User from "./components/User";
import Comments from "./components/Comments";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import New from "./components/New";
import Nav from "./components/Nav";
import { ThemeProvider } from "./contexts/theme";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: "light",
      toggleTheme: () => {
        this.setState(({ theme }) => ({
          theme: theme === "light" ? "dark" : "light"
        }));
      }
    };
  }
  render() {
    return (
      <ThemeProvider value={this.state}>
        <Router>
          <div className={this.state.theme}>
            <div className="container">
              <Nav />
              <Switch>
                <Route exact path="/" component={Top} />
                <Route exact path="/new" component={New} />
                <Route path="/user" component={User} />
                <Route path="/post" component={Comments} />
              </Switch>
            </div>
          </div>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
