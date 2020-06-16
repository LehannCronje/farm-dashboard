import React from "react";

import ReportComponent from "components/Report/ReportComponent";

class ReportView extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    return (
      <div className="content">
        <ReportComponent />
      </div>
    );
  }
}

export default ReportView;
