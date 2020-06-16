import React from "react";
import SiteCrop from "components/Dashboard/Crop/CropSite";
import { SaveFarmState } from "Services/Redux/actions/SaveFarmState";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
class Site extends React.Component {
  constructor(props) {
    super(props);
    if (props.location.state !== undefined) {
      let cropObject = { cropId: props.location.state.siteId, key: "cropId" };
      props.SaveFarmState(cropObject);
    }
  }
  render() {
    return (
      <div className="content">
        <CropSite />
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
