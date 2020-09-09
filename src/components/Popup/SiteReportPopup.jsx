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

class SiteReportPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      dropDownValue: "Employees",
      dropdownFarmOpen: false,
      dropdownSiteOpen: false,
      selectedSite: "",
      selectedFarm: "",
      farms: [],
      sites: [],
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.eventHandler = this.eventHandler.bind(this);
    this.toggleFarmDropdown = this.toggleFarmDropdown.bind(this);
    this.toggleSiteDropdown = this.toggleSiteDropdown.bind(this);
    this.InitializeFarms = this.InitializeFarms.bind(this);
    this.InitializeSites = this.InitializeSites.bind(this);
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
    var data = this.state.selectedSite.id;

    this.props.postMethod(data);
    this.handleShow();
  }

  toggleFarmDropdown() {
    this.setState({
      dropdownFarmOpen: !this.state.dropdownFarmOpen,
    });
  }

  toggleSiteDropdown() {
    this.setState({
      dropdownSiteOpen: !this.state.dropdownSiteOpen,
    });
  }

  handleFarmDropdown(e) {
    this.setState(
      {
        selectedFarm: e,
        selectedSite: "",
      },
      () => {
        this.InitializeSites();
      }
    );
  }

  handleSiteDropdown(e) {
    this.setState({
      selectedSite: e,
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

  async InitializeSites() {
    this.setState({
      sites: await GetSites(this.state.selectedFarm.id),
    });
  }

  render() {
    return (
      <>
        <Button variant="btn button-create" onClick={this.handleShow}>
          Generate Site Report
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
                    key="SiteDropDown"
                    isOpen={this.state.dropdownSiteOpen}
                    toggle={this.toggleSiteDropdown}
                  >
                    <DropdownToggle caret>Choose Site</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem header>Select a Site</DropdownItem>

                      {this.state.sites.map((site, key) => (
                        <DropdownItem
                          key={key}
                          onClick={() => this.handleSiteDropdown(site)}
                        >
                          {site.name}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </div>
                <div className="col-6 d-flex align-items-center">
                  {this.state.selectedSite ? (
                    <li key="selectedEmp" className="list-group-item w-100">
                      {this.state.selectedSite.name}
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
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default SiteReportPopup;
