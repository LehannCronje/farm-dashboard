import React from "react";

import { Table } from "reactstrap";
import Routes from "routes/routes.js";
import Popup from "components/Popup/popup.jsx";
import { Link } from "react-router-dom";
import { GetFarms, PostFarm } from "Services/FarmService";

class Farm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      farms: [],
      formData: {
        name: "",
      },
    };
    this.InitialiseFarms = this.InitialiseFarms.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }

  componentDidMount() {
    this.InitialiseFarms();
  }

  async InitialiseFarms() {
    this.setState({
      farms: await GetFarms(),
    });
  }

  handlePost(data) {
    PostFarm(data).then(() => {
      this.InitialiseFarms();
    });
  }

  render() {
    return (
      <div className="content box-component-wrapper">
        <div className="col-12">
          <div className="row">
            <div className="col-4">
              <Popup
                postMethod={this.handlePost}
                data={this.state.formData}
                title="Create New Farm"
              />
            </div>
            <div className="col-4 d-flex justify-content-center align-items-center">
              <h3 className="component-header">Farms</h3>
            </div>
          </div>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {this.state.farms.map((farm) => (
              <tr key={farm.id}>
                <td>{farm.id}</td>
                <td>
                  <Link
                    className="link"
                    to={{
                      pathname: Routes[2].layout + "/farm/",
                      state: { farmId: farm.id },
                    }}
                  >
                    {farm.name}
                  </Link>
                </td>
                {/* <td>
                  <button
                    className="btn"
                    onClick={() => this.deleteHandler(farm.id)}
                  >
                    Delete
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Farm;
