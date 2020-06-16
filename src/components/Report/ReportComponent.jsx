import React from "react";
import {
  generateSiteReport,
  generateFarmReport,
  generateCropReport,
} from "Services/ReportService";
import SiteReportPopup from "components/Popup/SiteReportPopup";
import CropReportPopup from "components/Popup/CropReportPopup";
import FarmReportPopup from "components/Popup/FarmReportPopup";

class ReportComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      farmReportFormData: {},
      siteReportFormData: {},
      cropReportFormData: {},
    };

    this.cropReportHandler = this.cropReportHandler.bind(this);
    this.farmReportHandler = this.farmReportHandler.bind(this);
    this.siteReportHandler = this.siteReportHandler.bind(this);
  }

  siteReportHandler(siteId) {
    generateSiteReport(siteId).then((res) => {
      this.downloadHandler(res.data);
    });
  }

  farmReportHandler(data) {
    generateFarmReport(data).then((res) => {
      this.downloadHandler(res.data);
    });
  }

  cropReportHandler(data) {
    generateCropReport(data).then((res) => {
      this.downloadHandler(res.data);
    });
  }

  downloadHandler(data) {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "download.zip");
    document.body.appendChild(link);
    link.click();
  }

  render() {
    return (
      <div className="content box-component-wrapper">
        <div className="col-12 d-flex justify-content-center align-items-center">
          <h3 className="component-header">Reports</h3>
        </div>
        <div className="report-list d-flex justify-content-center">
          <div className="single-report">
            <SiteReportPopup postMethod={this.siteReportHandler} />
          </div>
          <div className="single-report">
            <FarmReportPopup postMethod={this.farmReportHandler} />
          </div>
          <div className="single-report">
            <CropReportPopup postMethod={this.cropReportHandler} />
          </div>
        </div>
      </div>
    );
  }
}

export default ReportComponent;
