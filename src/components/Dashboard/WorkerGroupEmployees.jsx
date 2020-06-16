import React from "react";
import { Table } from "reactstrap";
import { getWorkerGroupEmployees } from "Services/WorkerGroupService";
import Popup from "components/Popup/popup";
import UserPopup from "components/Popup/UserPopup";
import { getEmployees } from "Services/EmployeeService";
import { addWorkerGroupEmployee } from "Services/WorkerGroupService";
import { addUser } from "Services/UserService";
import AddEmpWorkerGroupPopup from "components/Popup/AddEmpWorkerGroupPopup";
class WorkerGroupEmployees extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
      formData: {
        workerGroupId: props.workerGroupId,
        dropdown: [],
      },
      userFormData: {
        username: "",
        password: "",
      },
    };
    this.PostHandler = this.PostHandler.bind(this);
    this.UserPostHandler = this.UserPostHandler.bind(this);
  }

  componentDidMount() {
    this.InitializeWorkerGroupEmployees();
    this.InitializeEmployees();
  }

  async InitializeWorkerGroupEmployees() {
    this.setState({
      employees: await getWorkerGroupEmployees(),
    });
  }

  async InitializeEmployees() {
    let newFormData = this.state.formData;
    newFormData.dropdown = await getEmployees();
    this.setState({ formData: newFormData });
  }

  PostHandler(data) {
    addWorkerGroupEmployee(data).then(() => {
      this.InitializeWorkerGroupEmployees();
    });
  }

  UserPostHandler(data) {
    addUser(data).then(() => {
      this.InitializeWorkerGroupEmployees();
    });
  }

  render() {
    return (
      <div className="content box-component-wrapper">
        <div className="col-12">
          <div className="row">
            <div className="col-4">
              <AddEmpWorkerGroupPopup
                postMethod={this.PostHandler}
                workerGroupId={this.state.formData.workerGroupId}
              />
            </div>
            <div className="col-4 d-flex justify-content-center align-items-center">
              <h3 className="component-header">GroupMembers</h3>
            </div>
          </div>
        </div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Has User</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {this.state.employees.map(
              (employee) => (
                console.log(employee),
                (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.role}</td>
                    <td>
                      {employee.hasUser ? (
                        "true"
                      ) : employee.role === "MEMBER" ? (
                        "Not needed"
                      ) : (
                        <UserPopup
                          postMethod={this.UserPostHandler}
                          farmEmpId={employee.id}
                          data={this.state.userFormData}
                        />
                      )}
                    </td>
                    {/* <td>
                      <button
                        className="btn"
                        onClick={() => this.deleteHandler(employee.id)}
                      >
                        Delete
                      </button>
                    </td> */}
                  </tr>
                )
              )
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default WorkerGroupEmployees;
