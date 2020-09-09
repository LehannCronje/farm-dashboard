import React from "react";
import axios from "axios";
import { Table } from "reactstrap";
import { connect } from "react-redux";
import Popup from "components/Popup/popup";
import routes from "routes/routes.js";
import { Link, withRouter } from "react-router-dom";
import { GetSites, PostSite } from "Services/SiteService";
import OptionsPopup from "components/Popup/OptionsPopup";
import { deleteSite } from "Services/SiteService";

class Site extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        siteName: "",
        farmId: props.farmId,
      },
      sites: [],
    };
    this.PostHandler = this.PostHandler.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    console.log(this.props);
  }

  componentDidMount() {
    this.InitialiseSites();
  }

  async InitialiseSites() {
    this.setState({
      sites: await GetSites(this.state.formData.farmId),
    });
  }

  async PostHandler(data) {
    PostSite(data).then(() => {
      this.InitialiseSites();
    });
  }

  handleDelete(siteId) {
    deleteSite(siteId).then(() => this.InitialiseSites());
  }

  render() {
    return (
      <div className="content box-component-wrapper site-component col-lg-5">
        <div className="col-12">
          <div className="row">
            <div className="col-4">
              <Popup
                postMethod={this.PostHandler}
                data={this.state.formData}
                title="Create New Site"
              />
            </div>
            <div className="col-4 d-flex justify-content-center align-items-center">
              <h3 className="component-header">Sites</h3>
            </div>
          </div>
        </div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th style={{ width: "10px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.sites.map((site) => (
              <tr key={site.id}>
                <td>{site.id}</td>
                <td>
                  <Link
                    className="link"
                    to={{
                      pathname: routes[3].layout + routes[3].path,
                      state: {
                        siteId: site.id,
                        siteName: site.name,
                        farmSiteId: site.farmSiteId,
                      },
                    }}
                  >
                    {site.name}
                  </Link>
                </td>
                <td>
                  <OptionsPopup
                    itemId={site.id}
                    handleDelete={this.handleDelete}
                  />
                </td>
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
  };
};

export default connect(mapStateToProps, null)(withRouter(Site));
