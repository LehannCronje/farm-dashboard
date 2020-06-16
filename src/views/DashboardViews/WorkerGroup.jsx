import React from "react";
import WorkerGroupEmployees from "components/Dashboard/WorkerGroupEmployees";
import { SaveFarmState } from "Services/Redux/actions/SaveFarmState";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
class WorkerGroup extends React.Component {
  constructor(props) {
    super(props);
    if (props.location.state !== undefined) {
      let WorkerGroupObject = {
        workerGroupId: props.location.state.workerGroupId,
        key: "workerGroupId",
      };
      props.SaveFarmState(WorkerGroupObject);
    }
    console.log(props);
  }
  render() {
    return (
      <div className="content">
        <WorkerGroupEmployees
          workerGroupId={this.props.location.state.workerGroupId}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    SaveFarmState: (farmObject) => dispatch(SaveFarmState(farmObject)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(WorkerGroup));
