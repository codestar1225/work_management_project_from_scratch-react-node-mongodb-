import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Progress,
  Button
} from 'reactstrap';
import { Switch } from '../../vibe';

export default class AnalyticsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      facebook: true,
      twitter: false
    };
  }

  render() {
    return (
      <div>
        <div className="m-b">
          <h2>Good morning!</h2>
          <p className="text-muted">
            Here's what's going on with your business today.
          </p>
        </div>
        <Row>
          <Col md={4} xs={12}>
            <Card>
              <CardHeader>
                Page Views{' '}
                <Button size="sm" className="pull-right">
                  View
                </Button>
              </CardHeader>
              <CardBody>
                <h2 className="m-b-20 inline-block">
                  <span>13K</span>
                </h2>{' '}
                <i
                  className="fa fa-caret-down text-danger"
                  aria-hidden="true"
                />
                <Progress value={77} color="warning" />
              </CardBody>
            </Card>
          </Col>
          <Col md={4} xs={12}>
            <Card>
              <CardHeader>
                Product Sold{' '}
                <Button size="sm" className="pull-right">
                  View
                </Button>
              </CardHeader>
              <CardBody>
                <h2 className="m-b-20 inline-block">
                  <span>1,890</span>
                </h2>{' '}
                <i className="fa fa-caret-up text-danger" aria-hidden="true" />
                <Progress value={77} color="success" />
              </CardBody>
            </Card>
          </Col>
          <Col md={4} xs={12}>
            <Card>
              <CardHeader>
                Server Capacity{' '}
                <Button size="sm" className="pull-right">
                  View
                </Button>
              </CardHeader>
              <CardBody>
                <h2 className="inline-block">
                  <span>14%</span>
                </h2>
                <Progress value={14} color="primary" />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={8} sm={12}>
            <Card>
              <CardHeader>Traffic</CardHeader>
              <CardBody>
                <div className="full-bleed">
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={4} sm={12}>
            <Card>
              <CardHeader>Product Views</CardHeader>
              <CardBody>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={8} sm={12}>
            <Card>
              <CardHeader>Conversions</CardHeader>
              <CardBody>
                <Row className="m-b-md">
                  <Col xs={4}>
                    <h5>Added to Cart</h5>
                    <div className="h2">4.30%</div>
                    <small className="text-muted">23 Visitors</small>
                  </Col>
                  <Col xs={4}>
                    <h5>Reached Checkout</h5>
                    <div className="h2">2.93</div>
                    <small className="text-muted">12 Visitors</small>
                  </Col>
                  <Col xs={4}>
                    <h5>Pruchased</h5>
                    <div className="h2">10</div>
                    <small className="text-muted">10 Customers</small>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col md={4} xs={12}>
            <Card>
              <CardHeader>Integrations</CardHeader>
              <CardBody>
                <Switch
                  enabled={this.state.facebook}
                  toggle={() => {
                    this.setState(prevState => ({ facebook: !prevState.facebook }));
                  }}
                />
                <span className="text-facebook pull-right">
                  <i className="fa fa-facebook" /> Facebook
                </span>
                <hr />
                <Switch
                  enabled={this.state.twitter}
                  toggle={() => {
                    this.setState(prevState => ({ twitter: !prevState.twitter }));
                  }}
                />
                <span className="text-twitter pull-right">
                  <i className="fa fa-twitter" /> Twitter
                </span>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
