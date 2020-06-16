import React from "react";
import { Table } from "reactstrap";
import WorkerGroupPopup from "components/Popup/WorkerGroupPopup";
import { GetWorkerGroup, PostWorkerGroup } from "Services/WorkerGroupService";
import { getEmployees } from "Services/EmployeeService";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import routes from "routes/routes.js";

class WorkerGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        farmId: props.farmId,
        workerGroupName: "",
        dropdown: [],
      },
      workerGroups: [],
    };

    this.PostHandler = this.PostHandler.bind(this);
  }

  componentDidMount() {
    this.InitialiseWorkerGroups();
    this.InitialiseEmployees();
  }

  async InitialiseEmployees() {
    let newFormData = this.state.formData;
    newFormData.dropdown = await getEmployees();
    this.setState({ formData: newFormData });
  }
  async InitialiseWorkerGroups() {
    this.setState({
      workerGroups: await GetWorkerGroup(this.state.formData.farmId),
    });
  }

  PostHandler(data) {
    PostWorkerGroup(data).then(() => {
      this.InitialiseWorkerGroups();
    });
  }

  render() {
    return (
      <div className="content box-component-wrapper col-lg-11">
        <div className="col-12">
          <div className="row">
            <div className="col-4">
              <WorkerGroupPopup
                postMethod={this.PostHandler}
                data={this.state.formData}
              />
            </div>
            <div className="col-4 d-flex justify-content-center align-items-center">
              <h3 className="component-header">Work Group</h3>
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
            {this.state.workerGroups.map((work) => (
              <tr key={work.id}>
                <td>{work.id}</td>
                <td>
                  <Link
                    className="link"
                    to={{
                      pathname: routes[4].layout + routes[4].path,
                      state: {
                        workerGroupId: work.id,
                      },
                    }}
                  >
                    {work.name}
                  </Link>
                </td>
                {/* <td>
                  <button
                    className="btn"
                    onClick={() => this.deleteHandler(work.id)}
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
  return { farmId: state.SaveFarmStateReducer.farmState.farmId };
};

export default connect(mapStateToProps, null)(withRouter(WorkerGroup));
