import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setTeamData } from '../../../../../../services/action';

class Role_Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            // team_data: null,
        }
    }

    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    }

    render() {
        if (this.props.team_data && this.props.team_data.bases)
            console.log(this.props.team_data.bases.length);
        return (
            <Modal isOpen={this.props.role_modal} toggle={() => this.props.modal_handle()} style={{ minWidth: '800px' }}>
                <ModalHeader toggle={() => this.props.modal_handle()} className="role_modal_header">Role: Admin</ModalHeader>
                <ModalBody>
                    <div className="role_modal_body">
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    href="#"
                                    className={classnames({ active: this.state.activeTab === '1' })}
                                    onClick={() => {
                                        this.toggle('1');
                                    }}
                                >
                                    Access Levels
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    href="#"
                                    className={classnames({ active: this.state.activeTab === '2' })}
                                    onClick={() => {
                                        this.toggle('2');
                                    }}
                                >
                                    Users
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <Row>
                                    <Col sm="12">
                                        <p>Here you can assign access level for each base.</p>
                                        <p>Users assigned to this role are subject to velow base access levels.</p>
                                    </Col>
                                </Row>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Base</th>
                                            <th>Access Level</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* <tr>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                        </tr>
                                        <tr>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                        </tr>
                                        <tr>
                                            <td>Larry</td>
                                            <td>the Bird</td>
                                        </tr> */}
                                        {this.props.team_data && this.props.team_data.bases ? this.props.team_data.bases.map((base, index) => {
                                            <tr>
                                                <td>{base.basename}</td>
                                                <td></td>
                                            </tr>
                                        }) : "aaa"}
                                    </tbody>
                                </Table>
                            </TabPane>
                            <TabPane tabId="2">
                                <Row>
                                    <Col sm="6">
                                        <Card body>
                                            <CardTitle>Special Title Treatment</CardTitle>
                                            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                            <Button>Go somewhere</Button>
                                        </Card>
                                    </Col>
                                    <Col sm="6">
                                        <Card body>
                                            <CardTitle>Special Title Treatment</CardTitle>
                                            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                            <Button>Go somewhere</Button>
                                        </Card>
                                    </Col>
                                </Row>
                            </TabPane>
                        </TabContent>
                    </div>
                </ModalBody>
                <ModalFooter>
                    {/* <Button color="primary" onClick={this.props.modal_handle}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.props.modal_handle}>Cancel</Button> */}
                </ModalFooter>
            </Modal>
        )
    }
}

const mapStateToProps = ({ team_data }) => ({
    team_data
});

const mapDispatchToProps = (dispatch) => ({
    setTeamData: bindActionCreators(setTeamData, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Role_Modal);
