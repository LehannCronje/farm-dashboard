import React from "react";
import { Table } from "reactstrap";
import EmployeePopup from "components/Popup/EmployeePopup";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getEmployees, postEmployees } from "Services/EmployeeService";
import { deleteEmployee } from "Services/EmployeeService";
import OptionsPopup from "components/Popup/OptionsPopup";

class Employee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: "",
        email: "",
        farmId: this.props.farmId,
        dropdown: [{ type: "MANAGER" }, { type: "WORKER" }],
      },
      employees: [],
    };
    this.postHandler = this.postHandler.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.InitializeEmployees();
  }

  async InitializeEmployees() {
    this.setState({
      employees: await getEmployees(),
    });
  }

  postHandler(data) {
    postEmployees(data).then(() => {
      this.InitializeEmployees();
    });
  }

  handleDelete(empId) {
    deleteEmployee(empId).then(() => {
      this.InitializeEmployees();
    });
  }

  render() {
    return (
      <div className="content box-component-wrapper col-lg-11">
        <div className="col-12">
          <div className="row">
            <div className="col-4">
              <EmployeePopup
                postMethod={this.postHandler}
                data={this.state.formData}
              />
            </div>
            <div className="col-4 d-flex justify-content-center align-items-center">
              <h3 className="component-header">Employees</h3>
            </div>
          </div>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.type}</td>
                <td>{employee.email}</td>
                <td>
                  <OptionsPopup
                    itemId={employee.id}
                    handleDelete={this.handleDelete}
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

const mapStateToProps = (state) => {
  return { farmId: state.SaveFarmStateReducer.farmState.farmId };
};

export default connect(mapStateToProps, null)(withRouter(Employee));
