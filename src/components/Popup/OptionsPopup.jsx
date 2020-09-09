import React from "react";
import "./popup.css";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

class OptionsPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggleDropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  render() {
    return (
      <Dropdown
        className="options-dropdown d-inline-block w-100 h-100 d-flex justify-content-center"
        key="options"
        isOpen={this.state.dropdownOpen}
        toggle={this.toggleDropdown}
        direction="left"
      >
        <DropdownToggle tag="span" data-toggle="dropdown">
          <div className="test"></div>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Options</DropdownItem>

          <DropdownItem
            onClick={() => this.props.handleDelete(this.props.itemId)}
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default OptionsPopup;
