import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";

import PerfectScrollbar from "perfect-scrollbar";

var ps;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
    this.sidebar = React.createRef();
  }

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }

  render() {
    return (
      <div className="sidebar">
        <div className="sidebar-wrapper" ref={this.sidebar}>
          <div className="logo">
            <span className="simple-text text-center">Lehann template</span>
          </div>
          <Nav>
            {this.props.routes.map((prop, key) => {
              if (prop.sidebar) {
                return (
                  <li className={this.activeRoute(prop.path)} key={key}>
                    <NavLink
                      to={prop.layout + prop.path}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className={prop.icon} />
                      <p>{prop.name}</p>
                    </NavLink>
                  </li>
                );
              }
            })}
          </Nav>
        </div>
      </div>
    );
  }
}

export default Sidebar;
