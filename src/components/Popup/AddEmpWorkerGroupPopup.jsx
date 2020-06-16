import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./popup.css";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { GetFarms } from "Services/FarmService";
import { GetSites } from "Services/SiteService";
import { getEmployees } from "Services/EmployeeService";
import { getWorkerGroupRoles } from "Services/WorkerGroupRoleService";

class AddEmpWorkerGroupPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      dropDownValue: "Employees",
      dropdownEmployeeOpen: false,
      dropdownRoleOpen: false,
      employeeId: "",
      roleId: "",
      employees: [],
      roles: [],
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.eventHandler = this.eventHandler.bind(this);
    this.toggleEmployeeDropdown = this.toggleEmployeeDropdown.bind(this);
    this.toggleRoleDropdown = this.toggleRoleDropdown.bind(this);
    this.initializeEmployees = this.initializeEmployees.bind(this);
    this.initializeRoles = this.initializeRoles.bind(this);
  }

  handleShow() {
    this.setState({ show: !this.state.show });
  }
  handleChange(e) {
    let tempData = { ...this.state.formData };
    let inputName = e.target.name;
    tempData[inputName] = e.target.value;
    this.setState({
      formData: tempData,
    });
  }
  eventHandler() {
    var data = {
      workerGroupId: this.props.workerGroupId,
      employeeRoleId: this.state.roleId,
      employeeId: this.state.employeeId,
    };
    this.props.postMethod(data);
    this.handleShow();
  }

  toggleEmployeeDropdown() {
    this.setState({
      dropdownEmployeeOpen: !this.state.dropdownEmployeeOpen,
    });
  }

  toggleRoleDropdown() {
    this.setState({
      dropdownRoleOpen: !this.state.dropdownRoleOpen,
    });
  }

  handleEmployeeDropdown(e) {
    this.setState({
      employeeId: e.id,
    });
  }

  handleRoleDropdown(e) {
    this.setState({
      roleId: e.id,
    });
  }

  componentDidMount() {
    this.initializeEmployees();
    this.initializeRoles();
  }

  async initializeEmployees() {
    this.setState({
      employees: await getEmployees(),
    });
  }

  async initializeRoles() {
    this.setState({
      roles: await getWorkerGroupRoles(),
    });
  }
  render() {
    return (
      <>
        <Button variant="btn button-action" onClick={this.handleShow}>
          Add Employee
        </Button>

        <Modal show={this.state.show} onHide={this.handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Dropdown
              key="farmDropdown"
              isOpen={this.state.dropdownEmployeeOpen}
              toggle={this.toggleEmployeeDropdown}
            >
              <DropdownToggle caret>Choose Employee</DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Select a Employee</DropdownItem>

                {this.state.employees.map((employee, key) => (
                  <DropdownItem
                    key={key}
                    onClick={() => this.handleEmployeeDropdown(employee)}
                  >
                    {employee.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown
              key="SiteDropDown"
              isOpen={this.state.dropdownRoleOpen}
              toggle={this.toggleRoleDropdown}
            >
              <DropdownToggle caret>Choose Role</DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Select a Role</DropdownItem>

                {this.state.roles.map((role, key) => (
                  <DropdownItem
                    key={key}
                    onClick={() => this.handleRoleDropdown(role)}
                  >
                    {role.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </Modal.Body>
          <Modal.Footer>
            <Button className="button-action" onClick={this.eventHandler}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default AddEmpWorkerGroupPopup;
