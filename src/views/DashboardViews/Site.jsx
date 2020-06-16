import React from "react";
import SiteCrop from "components/Dashboard/Site/SiteCrop";
import { SaveFarmState } from "Services/Redux/actions/SaveFarmState";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TxnWorkLogComponent from "components/Dashboard/TxnWorkLogComponent";
class Site extends React.Component {
  constructor(props) {
    super(props);
    if (props.location.state !== undefined) {
      let siteObject = { siteId: props.location.state.siteId, key: "siteId" };
      let farmSiteObject = {
        farmSiteId: props.location.state.farmSiteId,
        key: "farmSiteId",
      };
      console.log(props);
      props.SaveFarmState(farmSiteObject);
      props.SaveFarmState(siteObject);
    }
    console.log(props);
  }
  render() {
    return (
      <div className="content d-flex">
        <div className="col-12">
          <div className="row d-flex justify-content-center">
            <SiteCrop siteName={this.props.location.state.siteName} />
            <TxnWorkLogComponent />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    SaveFarmState: (farmObject) => dispatch(SaveFarmState(farmObject)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Site));
