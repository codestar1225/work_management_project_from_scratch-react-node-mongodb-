import React, { Component } from 'react';
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import Users from './Users';
import Roles from './Roles';

class TabsPage extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    }
    render() {
        let user_data = JSON.parse(localStorage.getItem('user'));
        let user_role = ''
        user_data.teams.map(team => {
            if(team.teamname === localStorage.getItem('teamname')) user_role = team.role;
        })
        return (
            <div>
                <h3>Team & Roles</h3>
                <div>
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                href="#"
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => {
                                    this.toggle('1');
                                }}
                            >
                                Users
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
                                Roles
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <Users />
                        </TabPane>
                        <TabPane tabId="2">
                            <Roles />
                        </TabPane>
                    </TabContent>
                </div>
            </div>
        );
    }
}

export default TabsPage;
