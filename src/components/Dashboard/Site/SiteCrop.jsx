import React from "react";
import { Table } from "reactstrap";
import Popup from "components/Popup/SiteCropPopup";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { UpdateSite } from "Services/SiteService";
import { GetSiteCrops } from "Services/SiteCropService";
import { GetCrops } from "Services/CropService";

class SiteCrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      siteName: this.props.siteName,
      siteId: this.props.siteId,
      siteCrops: [],
      formData: {
        farmId: this.props.farmId,
        siteId: this.props.farmSiteId,
        dropdown: [],
      },
    };

    this.PostHandler = this.PostHandler.bind(this);
  }

  componentDidMount() {
    this.InitializeSiteCrops();
    this.InitializeCrops();
  }

  async InitializeCrops() {
    let newFormData = this.state.formData;
    newFormData.dropdown = await GetCrops();
    this.setState({ formData: newFormData });
  }

  async InitializeSiteCrops() {
    this.setState({
      siteCrops: await GetSiteCrops(),
    });
  }

  PostHandler(data) {
    UpdateSite(data).then(() => {
      this.InitializeSiteCrops();
    });
  }

  render() {
    return (
      <div className="content box-component-wrapper col-lg-10">
        <div className="col-12">
          <div className="row">
            <div className="col-4">
              <Popup postMethod={this.PostHandler} data={this.state.formData} />
            </div>
            <div className="col-4 d-flex justify-content-center align-items-center">
              <h3 className="component-header">Crops</h3>
            </div>
          </div>
        </div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {this.state.siteCrops.map((siteCrops) => (
              <tr key={siteCrops.id}>
                <td>{siteCrops.id}</td>
                <td>{siteCrops.name}</td>
                {/* <td>
                  <button
                    className="btn"
                    onClick={() => this.deleteHandler(siteCrops.id)}
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

const mapStateToProps = (state) => {
  return {
    farmId: state.SaveFarmStateReducer.farmState.farmId,
    siteId: state.SaveFarmStateReducer.farmState.siteId,
    farmSiteId: state.SaveFarmStateReducer.farmState.farmSiteId,
  };
};

export default connect(mapStateToProps, null)(withRouter(SiteCrop));
