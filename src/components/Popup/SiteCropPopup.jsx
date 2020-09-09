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

class SiteCropPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      dropDownValue: "Crops",
      dropdownOpen: false,
      name: "",
      formData: this.props.data,
      cropIds: [],
      selectedCrops: [],
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.eventHandler = this.eventHandler.bind(this);
    this.generateForm = this.generateForm.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
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
    data.cropIds = this.state.cropIds;
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

  toggleDropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  handleDropdown(e) {
    let temparr = this.state.cropIds;
    let temparr2 = this.state.selectedCrops;
    temparr.push(e.id);
    temparr2.push(e);
    this.setState({
      cropIds: temparr,
      selectedCrops: temparr2,
    });
  }

  componentDidMount() {
    this.generateForm();
  }
  generateForm() {
    let form = [];

    for (let x in this.state.formData) {
      if (x === "uid" || x === "farmId" || x === "siteId") {
      } else {
        if (x === "dropdown") {
          form.push();
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

  render() {
    return (
      <>
        <Button variant="btn button-create" onClick={this.handleShow}>
          Add
        </Button>

        <Modal show={this.state.show} onHide={this.handleShow}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <this.generateForm />
            <p className=" m-0">Select Crop</p>
            <div className="col-12 worker-group-added-employees">
              <div className="row d-flex justify-content-center">
                <div className="col-12">
                  <Dropdown
                    className="d-inline-block w-100 h-100 d-flex justify-content-center"
                    key="empoyee-role"
                    isOpen={this.state.dropdownOpen}
                    toggle={this.toggleDropdown}
                  >
                    <DropdownToggle
                      className=" m-0 mb-2 employee-dropdown-button"
                      caret
                    >
                      Crops
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem header>Select Employee Role</DropdownItem>

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
                </div>
                <div className="col-10 d-flex align-items-center">
                  <div className="selected-employee-role d-inline-block w-100 m-0">
                    {this.state.selectedCrops.map((crop, i) => (
                      <li key={i} className="list-group-item w-100">
                        {crop.name}
                      </li>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="button-action" onClick={this.eventHandler}>
              Add Crop
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default SiteCropPopup;
