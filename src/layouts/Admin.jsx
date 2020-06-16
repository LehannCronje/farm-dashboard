import React from "react";
import routes from "../routes/routes.js";
import { Route, Switch } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import Navbar from "components/Navbars/Navbar.jsx";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      farmId: 1,
    };
    this.mainPanel = React.createRef();
    this.stateHandler.bind(this);
  }

  stateHandler(id) {
    this.setState({
      farmId: id,
    });
  }

  render() {
    return (
      <div className="wrapper">
        <Sidebar {...this.props} routes={routes} />
        <div className="main-panel" ref={this.mainPanel}>
          <Navbar {...this.props} farmId={this.state.farmId} />
          <Switch>
            {routes.map((prop, key) => {
              return (
                <Route
                  exact
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={key}
                />
              );
            })}
          </Switch>
        </div>
      </div>
    );
  }
}

export default Dashboard;
