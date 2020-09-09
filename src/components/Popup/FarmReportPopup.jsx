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

class FarmReportPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      dropDownValue: "Employees",
      dropdownFarmOpen: false,
      dropdownCropOpen: false,

      selectedFarm: "",
      farms: [],
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.eventHandler = this.eventHandler.bind(this);
    this.toggleFarmDropdown = this.toggleFarmDropdown.bind(this);

    this.InitializeFarms = this.InitializeFarms.bind(this);
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
    var data = this.state.selectedFarm.id;
    console.log(data);
    this.props.postMethod(data);
    this.handleShow();
  }

  toggleFarmDropdown() {
    this.setState({
      dropdownFarmOpen: !this.state.dropdownFarmOpen,
    });
  }

  handleFarmDropdown(e) {
    this.setState({
      selectedFarm: e,
    });
  }

  componentDidMount() {
    this.InitializeFarms();
  }

  async InitializeFarms() {
    this.setState({
      farms: await GetFarms(),
    });
  }

  render() {
    return (
      <>
        <Button variant="btn button-create" onClick={this.handleShow}>
          Generate Farm Report
        </Button>

        <Modal show={this.state.show} onHide={this.handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="col-12">
              <div className="row">
                <div className="col-5">
                  <Dropdown
                    key="farmDropdown"
                    isOpen={this.state.dropdownFarmOpen}
                    toggle={this.toggleFarmDropdown}
                  >
                    <DropdownToggle caret>Choose Farm</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem header>Select a Farm</DropdownItem>

                      {this.state.farms.map((farm, key) => (
                        <DropdownItem
                          key={key}
                          onClick={() => this.handleFarmDropdown(farm)}
                        >
                          {farm.name}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </div>
                <div className="col-6 d-flex align-items-center">
                  {this.state.selectedFarm ? (
                    <li key="selectedEmp" className="list-group-item w-100">
                      {this.state.selectedFarm.name}
                    </li>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="button-action" onClick={this.eventHandler}>
              Generate Farm Report
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default FarmReportPopup;
