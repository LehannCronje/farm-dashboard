import React from "react";

import { isCompositeComponent } from "react-dom/test-utils";
import { userAuth } from "Services/UserService";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  change(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  async submit(e) {
    e.preventDefault();
    let data = {
      username: this.state.username,
      password: this.state.password,
    };
    console.log(userAuth(data));
    if (await userAuth(data)) {
      this.props.history.push("/admin/dashboard");
    }
  }

  render() {
    return (
      <div className="fluid-container login-wrapper justify-content-center align-items-center d-flex">
        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-10 col-12 box-component-wrapper login-box-component-wrapper">
          {this.state.error ? <p>Incorrect Username or password</p> : ""}
          <form onSubmit={(e) => this.submit(e)}>
            <label className="login-label">Username</label>
            <input
              className="form-control login-input"
              type="text"
              name="username"
              onChange={(e) => this.change(e)}
              value={this.state.username}
            />
            <label className="login-label">Password</label>
            <input
              className="form-control login-input"
              type="text"
              name="password"
              onChange={(e) => this.change(e)}
              value={this.state.password}
            />
            <input className="btn button-action" type="submit" value="Login" />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
