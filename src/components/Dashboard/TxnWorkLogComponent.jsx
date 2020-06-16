import React from "react";
import { getTxnWorkLogsByFarmSite } from "Services/TxnWorkLogService";
import { Table } from "reactstrap";

class TxnWorkLogComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      txnWorkLogs: [],
    };
  }

  componentDidMount() {
    this.InitializeTxnWorkLogs();
  }

  async InitializeTxnWorkLogs() {
    this.setState({
      txnWorkLogs: await getTxnWorkLogsByFarmSite(),
    });
  }

  render() {
    return (
      <div className="content box-component-wrapper col-lg-10">
        <div className="col-12">
          <h3 className="component-header text-center">Work Log</h3>
        </div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee Name</th>
              <th>Work</th>
              <th>hours</th>
            </tr>
          </thead>
          <tbody>
            {this.state.txnWorkLogs.map((log) => (
              <tr key={log.id}>
                <td>{log.id}</td>
                <td>{log.employeeName}</td>
                <td>{log.work}</td>
                <td>{log.timeWorked}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default TxnWorkLogComponent;
