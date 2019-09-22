import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import { ThemeProvider } from "./contexts/theme";
import Loading from "./components/Loading";

const Top = React.lazy(() => import("./components/Top"));
const New = React.lazy(() => import("./components/New"));
const User = React.lazy(() => import("./components/User"));
const Comments = React.lazy(() => import("./components/Comments"));

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
              <React.Suspense fallback={<Loading />}>
                <Switch>
                  <Route exact path="/" component={Top} />
                  <Route exact path="/new" component={New} />
                  <Route path="/user" component={User} />
                  <Route path="/post" component={Comments} />
                  <Route render={() => <h1>404</h1>} />
                </Switch>
              </React.Suspense>
            </div>
          </div>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
