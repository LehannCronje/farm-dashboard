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
    temparr.push(e.id);
    this.setState({
      cropIds: temparr,
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
          form.push(
            <Dropdown
              key={x}
              isOpen={this.state.dropdownOpen}
              toggle={this.toggleDropdown}
            >
              <DropdownToggle caret>{this.state.dropDownValue}</DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Choose Crop</DropdownItem>

                {this.state.formData[x].map((employee, key) => (
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
          <Modal.Header closeButton>
            <Modal.Title>Add Crop</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <this.generateForm />
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

export default SiteCropPopup;
