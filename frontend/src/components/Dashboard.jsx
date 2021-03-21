/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
} from "../variables/charts.jsx";

function Dashboard(props) {
  const [bigChartData, setbigChartData] = React.useState("data1");
  const setBgChartData = (name) => {
    setbigChartData(name);
  };
  const renderTableData = () => {
    const meeting_table = [
      { name: 'Parker Griep', taName: 'Yang Lin', reason: 'HW 1', duration: 'minutes'}
      ,{ name: 'Anthony Brigidi', taName: 'Joe Shmo', reason: 'HW 3', duration: 'minutes'}
      ,{ name: 'Colin Arscott', taName: 'DaBaby', reason: 'Fortnite', duration: 'minutes'}
    ]
    return (meeting_table.map((meeting,idx) => (
      <tr key={`meeting${idx}`}>
        <td>{meeting.name}</td>
        <td>{meeting.taName}</td>
        <td>{meeting.reason}</td>
        <td style={{textAlign: "center"}}>{meeting.duration}</td>
      </tr>
    )))
  }
  return (
    <>
      <div className="content">
        <Row>
          <h1 style={{paddingLeft: "30px"}}>Data Analytics</h1>
        </Row>
        <Row>
          <Col lg="6">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    {/* <h5 className="card-category">Total Shipments</h5> */}
                    <CardTitle tag="h3">Durations for Each Session</CardTitle>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample1[bigChartData]}
                    options={chartExample1.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6">
            <Card className="card-chart">
              <CardHeader>
                {/* <h5 className="card-category">Total Shipments</h5> */}
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> Visits per Reason
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample2.data}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="6">
            <Card className="card-chart">
              <CardHeader>
                {/* <h5 className="card-category">Daily Sales</h5> */}
                <CardTitle tag="h3">
                  <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                  Average Duration per Question
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={chartExample3.data}
                    options={chartExample3.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6">
            <Card className="card-chart">
              <CardHeader>
                {/* <h5 className="card-category">Completed Tasks</h5> */}
                <CardTitle tag="h3">
                  <i className="tim-icons icon-send text-success" /> TA Quality
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample4.data}
                    options={chartExample4.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="12" md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Student Sessions List</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Student Name</th>
                      <th>TA Name</th>
                      <th>Reason</th>
                      <th className="text-center">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderTableData()}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;