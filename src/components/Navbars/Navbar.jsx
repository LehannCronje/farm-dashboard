import React from "react";
import { Navbar, Container, NavbarBrand, NavLink, Nav } from "reactstrap";
import { Route, Switch, Link } from "react-router-dom";
import routes from "routes/routes.js";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      color: "transparent",
    };
    this.sidebarToggle = React.createRef();
    this.handleLogout = this.handleLogout.bind(this);
  }

  toggle() {
    if (this.state.isOpen) {
      this.setState({
        color: "transparent",
      });
    } else {
      this.setState({
        color: "dark",
      });
    }
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  getBrand() {
    let brandName = "Default Brand";
    let elements = [];
    routes.map((prop, key) => {
      console.log(prop.name);
      console.log(prop.layout + prop.path);
      console.log(window.location.href);
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        elements.push(
          <Link
            className="navbar-link"
            to={{
              pathname: prop.layout + prop.path,
            }}
          >
            {prop.name}
          </Link>
        );
      }
      return null;
    });

    return elements;
  }

  openSidebar() {
    document.documentElement.classList.toggle("nav-open");
    this.sidebarToggle.current.classList.toggle("toggled");
  }

  handleLogout() {
    localStorage.clear();
    this.props.history.push("/login");
  }

  render() {
    return (
      <div>
        <Navbar
          color={this.state.color}
          className={"navbar-absolute fixed-top navbar-transparent "}
        >
          <Container fluid>
            <div className="navbar-wrapper">
              <div className="navbar-toggle">
                <button
                  type="button"
                  ref={this.sidebarToggle}
                  className="navbar-toggler"
                  onClick={() => this.openSidebar()}
                >
                  <span className="navbar-toggler-bar bar1" />
                  <span className="navbar-toggler-bar bar2" />
                  <span className="navbar-toggler-bar bar3" />
                </button>
              </div>
              {this.getBrand()}
            </div>
            <button className="btn button-action" onClick={this.handleLogout}>
              Logout
            </button>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default Header;
