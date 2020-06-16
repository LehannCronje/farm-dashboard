import React from "react";
import { Table } from "reactstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Popup from "components/Popup/popup";
import { GetCrops, PostCrop } from "Services/CropService";

class Crop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        cropName: "",
        farmId: props.farmId,
      },
      crops: [],
    };
    console.log(props);
    this.PostHandler = this.PostHandler.bind(this);
    this.InitialiseCrops = this.InitialiseCrops.bind(this);
  }

  componentDidMount() {
    this.InitialiseCrops();
  }

  async InitialiseCrops() {
    this.setState({
      crops: await GetCrops(this.state.formData.farmId),
    });
  }

  PostHandler(data) {
    PostCrop(data).then(() => {
      this.InitialiseCrops();
    });
  }

  render() {
    return (
      <div className="content box-component-wrapper crop-component col-lg-5">
        <div className="col-12">
          <div className="row">
            <div className="col-4">
              <Popup
                postMethod={this.PostHandler}
                data={this.state.formData}
                title="Create New Crop"
              />
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
            {this.state.crops.map((crop) => (
              <tr key={crop.id}>
                <td>{crop.id}</td>
                <td>{crop.name}</td>
                {/* <td>
                  <button
                    className="btn"
                    onClick={() => this.deleteHandler(crop.id)}
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
  };
};

export default connect(mapStateToProps, null)(withRouter(Crop));
