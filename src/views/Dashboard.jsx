import React from "react";
import { createBrowserHistory } from "history";
import { Route, Switch, Link, Router, Redirect } from "react-router-dom";

import Farm from "components/Dashboard/Farm/Farm";
const hist = createBrowserHistory();

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    return (
      <div className="content">
        <Farm />
      </div>
    );
  }
}

export default Dashboard;
