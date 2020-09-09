import React from "react";
import { Table } from "reactstrap";
import Popup from "components/Popup/popup";
import { GetWork, PostWork, deleteWork } from "Services/WorkService";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import OptionsPopup from "components/Popup/OptionsPopup";

class Crop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        workName: "",
        farmId: props.farmId,
      },
      work: [],
    };
    this.InitialiseWork = this.InitialiseWork.bind(this);
    this.PostHandler = this.PostHandler.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.InitialiseWork();
  }

  async InitialiseWork() {
    this.setState({
      work: await GetWork(this.state.formData.farmId),
    });
  }

  PostHandler(data) {
    PostWork(data).then(() => {
      this.InitialiseWork();
    });
  }

  handleDelete(workId) {
    deleteWork(workId).then(() => {
      this.InitialiseWork();
    });
  }

  render() {
    return (
      <div className="content box-component-wrapper col-lg-11">
        <div className="col-12">
          <div className="row">
            <div className="col-4">
              <Popup
                postMethod={this.PostHandler}
                data={this.state.formData}
                title="Create New Work"
              />
            </div>
            <div className="col-4 d-flex justify-content-center align-items-center">
              <h3 className="component-header">Work</h3>
            </div>
          </div>
        </div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.work.map((work) => (
              <tr key={work.id}>
                <td>{work.id}</td>
                <td>{work.name}</td>
                <td>
                  <OptionsPopup
                    itemId={work.id}
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
  return { farmId: state.SaveFarmStateReducer.farmState.farmId };
};

export default connect(mapStateToProps, null)(withRouter(Crop));
