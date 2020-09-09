import UserPopup from "components/Popup/UserPopup";
import React from "react";
import { Table } from "reactstrap";
import { getUsers, addUser, deleteUser } from "Services/UserService";
import { getEmployees } from "Services/EmployeeService";
import OptionsPopup from "components/Popup/OptionsPopup";

class UserComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      formData: {
        username: "",
        password: "",
        dropdown: [],
      },
    };
    this.PostHandler = this.PostHandler.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.InitializeUsers();
    this.InitialiseEmployees();
  }

  async InitialiseEmployees() {
    let newFormData = this.state.formData;
    newFormData.dropdown = await getEmployees();
    this.setState({ formData: newFormData });
  }

  async InitializeUsers() {
    this.setState({
      users: await getUsers(),
    });
  }

  PostHandler(data) {
    addUser(data).then(() => {
      this.InitializeUsers();
    });
  }

  handleDelete(userId) {
    deleteUser(userId).then(() => {
      this.InitializeUsers();
    });
  }
  render() {
    return (
      <div className="content box-component-wrapper">
        <div className="col-12">
          <div className="row">
            <div className="col-4">
              <UserPopup
                postMethod={this.PostHandler}
                data={this.state.formData}
              />
            </div>
            <div className="col-4 d-flex justify-content-center align-items-center">
              <h3 className="component-header">Users</h3>
            </div>
            <div className="col-4 d-flex justify-content-end align-items-center">
              <button className="btn button-action">Action</button>
            </div>
          </div>
        </div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th style={{ width: "10px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>
                  <OptionsPopup
                    handleDelete={this.handleDelete}
                    itemId={user.id}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default UserComponent;
