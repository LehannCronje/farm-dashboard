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
import { GetCrops } from "Services/CropService";

class CropReportPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      dropDownValue: "Employees",
      dropdownFarmOpen: false,
      dropdownCropOpen: false,
      selectedCrop: "",
      selectedFarm: "",
      farms: [],
      crops: [],
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.eventHandler = this.eventHandler.bind(this);
    this.toggleFarmDropdown = this.toggleFarmDropdown.bind(this);
    this.toggleCropDropdown = this.toggleCropDropdown.bind(this);
    this.InitializeFarms = this.InitializeFarms.bind(this);
    this.InitializeCrops = this.InitializeCrops.bind(this);
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
    var data = this.state.selectedCrop.id;

    this.props.postMethod(data);
    this.handleShow();
  }

  toggleFarmDropdown() {
    this.setState({
      dropdownFarmOpen: !this.state.dropdownFarmOpen,
    });
  }

  toggleCropDropdown() {
    this.setState({
      dropdownCropOpen: !this.state.dropdownCropOpen,
    });
  }

  handleFarmDropdown(e) {
    this.setState(
      {
        selectedFarm: e,
        selectedCrop: "",
      },
      () => {
        this.InitializeCrops();
      }
    );
  }

  handleCropDropdown(e) {
    this.setState({
      selectedCrop: e,
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

  async InitializeCrops() {
    this.setState({
      crops: await GetCrops(this.state.selectedFarm.id),
    });
  }

  render() {
    return (
      <>
        <Button variant="btn button-create" onClick={this.handleShow}>
          Generate Crop Report
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
            <div className="col-12">
              <div className="row">
                <div className="col-5">
                  <Dropdown
                    key="CropDropDown"
                    isOpen={this.state.dropdownCropOpen}
                    toggle={this.toggleCropDropdown}
                  >
                    <DropdownToggle caret>Choose Crop</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem header>Select a Crop</DropdownItem>

                      {this.state.crops.map((crop, key) => (
                        <DropdownItem
                          key={key}
                          onClick={() => this.handleCropDropdown(crop)}
                        >
                          {crop.name}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </div>
                <div className="col-6 d-flex align-items-center">
                  {this.state.selectedCrop ? (
                    <li key="selectedEmp" className="list-group-item w-100">
                      {this.state.selectedCrop.name}
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
              Create Crop Report
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default CropReportPopup;
