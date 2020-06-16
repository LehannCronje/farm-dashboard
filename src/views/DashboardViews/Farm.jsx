import React from "react";
import Site from "components/Dashboard/Site/Site";
import Work from "components/Dashboard/Work/Work";
import Crop from "components/Dashboard/Crop/Crop";
import Employee from "components/Dashboard/Employee/Employee";
import { SaveFarmState } from "Services/Redux/actions/SaveFarmState";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import WorkerGroup from "components/Dashboard/WorkerGroup";
class Farm extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    if (props.location.state !== undefined) {
      let farmObject = { farmId: props.location.state.farmId, key: "farmId" };
      this.props.SaveFarmState(farmObject);
    }
  }
  render() {
    return (
      <div className="content">
        <div className="col-12">
          <div className="row d-flex justify-content-center">
            <Site />
            <Crop />
            <Work />
            <Employee />
            <WorkerGroup />
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

export default connect(null, mapDispatchToProps)(withRouter(Farm));
