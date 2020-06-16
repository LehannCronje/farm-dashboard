import React from "react";
import { getJwt } from "Utils/JwtUtil";
import { withRouter, Redirect } from "react-router-dom";
import { saveUserDetails } from "Services/Redux/actions/SignInUser";
import { useSelector, connect } from "react-redux";
import { checkUser } from "Services/UserService";

class AuthenticatedComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
    };
  }

  async componentDidMount() {
    const jwt = getJwt();

    if (!jwt) {
      this.props.history.push("/login");
    } else {
      if (!(await checkUser())) {
        localStorage.removeItem("jwt-token");
        this.props.history.push("/login");
      }
    }
  }

  render() {
    if (Object.keys(this.props.currentUser).length === 0) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    }
    return <div>{this.props.children}</div>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveUserDetails: (userObject) => dispatch(saveUserDetails(userObject)),
  };
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.signInReducer.currentUser,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AuthenticatedComponent));
