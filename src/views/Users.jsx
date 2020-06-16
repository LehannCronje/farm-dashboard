import React from "react";
import UserComponent from "components/User/UserComponent";

class User extends React.Component {
  render() {
    return (
      <div className="content">
        <UserComponent />
      </div>
    );
  }
}

export default User;
