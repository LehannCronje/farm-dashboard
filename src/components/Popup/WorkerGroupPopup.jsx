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

class WorkerGroupPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      dropDownValue: "Employees",
      dropdownOpenRole: false,
      dropdownOpenEmp: false,
      name: "",
      formData: this.props.data,
      farmEmployees: [],
      selectedFarmEmployee: "",
      selectedRole: "",
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.eventHandler = this.eventHandler.bind(this);
    this.generateForm = this.generateForm.bind(this);
    this.toggleDropdownEmployee = this.toggleDropdownEmployee.bind(this);
    this.toggleDropdownRole = this.toggleDropdownRole.bind(this);
    this.handleAddEmployee = this.handleAddEmployee.bind(this);
    this.generateDropdownForm = this.generateDropdownForm.bind(this);
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
    var data = {};

    for (let x in this.state.formData) {
      data[x] = this.state.formData[x];
    }
    data.farmEmployees = this.state.farmEmployees;
    this.props.postMethod(data);
    this.handleShow();
  }

  labelFormat(string) {
    let firstChar = string.charAt(0).toUpperCase();
    let newString =
      firstChar +
      string
        .slice(1)
        .replace(/([A-Z])/g, " $1")
        .trim();

    return newString;
  }

  toggleDropdownEmployee() {
    this.setState({
      dropdownOpenEmp: !this.state.dropdownOpenEmp,
    });
  }

  toggleDropdownRole() {
    this.setState({
      dropdownOpenRole: !this.state.dropdownOpenRole,
    });
  }

  handleDropdown(e) {
    this.setState({
      selectedFarmEmployee: e,
    });
  }

  handleRoleDropDown(role) {
    this.setState({
      selectedRole: role,
    });
  }

  handleAddEmployee() {
    let temp = this.state.farmEmployees;
    console.log(this.state.selectedFarmEmployee);
    let tempfarmEmp = {
      id: this.state.selectedFarmEmployee.id,
      name: this.state.selectedFarmEmployee.name,
      role: this.state.selectedRole,
    };
    temp.push(tempfarmEmp);
    this.setState(
      {
        farmEmployees: temp,
      },
      () => {
        console.log(this.state.farmEmployees);
      }
    );
  }

  componentDidMount() {}

  generateForm() {
    let form = [];

    for (let x in this.state.formData) {
      if (x === "uid" || x === "farmId" || x === "siteId") {
      } else {
        if (x === "dropdown") {
        } else {
          form.push(
            <label className="form-label" key={x}>
              {this.labelFormat(x)}
              <input
                type="text"
                value={this.state.formData[x]}
                name={x}
                onChange={this.handleChange}
              />
            </label>
          );
        }
      }
    }
    return form;
  }

  generateDropdownForm() {
    let form = [];

    for (let x in this.state.formData) {
      if (x === "uid" || x === "farmId" || x === "siteId") {
      } else {
        if (x === "dropdown") {
          form.push(
            <Dropdown
              className="worker-group-dropdown"
              key={"emp"}
              isOpen={this.state.dropdownOpenEmp}
              toggle={this.toggleDropdownEmployee}
            >
              <DropdownToggle caret>{this.state.dropDownValue}</DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Choose Employee</DropdownItem>

                {this.state.formData["dropdown"].map((employee, key) => (
                  <DropdownItem
                    key={key}
                    onClick={() => this.handleDropdown(employee)}
                  >
                    {employee.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          );

          form.push(
            <Dropdown
              className="worker-group-dropdown d-inline-block"
              key="role"
              isOpen={this.state.dropdownOpenRole}
              toggle={this.toggleDropdownRole}
            >
              <DropdownToggle caret>Roles</DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Choose Role</DropdownItem>

                <DropdownItem onClick={() => this.handleRoleDropDown("LEADER")}>
                  Leader
                </DropdownItem>
                <DropdownItem onClick={() => this.handleRoleDropDown("MEMBER")}>
                  Member
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          );
          form.push(
            <Button className="button-create" onClick={this.handleAddEmployee}>
              Add Employee
            </Button>
          );
        } else {
        }
      }
    }
    return form;
  }

  render() {
    return (
      <>
        <Button variant="btn button-create" onClick={this.handleShow}>
          Create
        </Button>

        <Modal show={this.state.show} onHide={this.handleShow}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <this.generateForm />
            <p className=" m-0">Add Employees To Worker Group</p>
            <div className="worker-group-added-employees ">
              <div className="col-12 d-flex align-items-center justify-content-center">
                <this.generateDropdownForm />
              </div>
              {this.state.farmEmployees.map((farmEmp, key) => {
                return (
                  <div className="col-12">
                    <div className="row d-flex align-items-center justify-content-center">
                      <div className="col-5 text-center list-group-item rounded-0">
                        {farmEmp.name}
                      </div>
                      <div className="col-5 text-center list-group-item rounded-0">
                        {farmEmp.role}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="button-action" onClick={this.eventHandler}>
              Create Worker Group
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default WorkerGroupPopup;
