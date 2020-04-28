import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Table } from 'reactstrap';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <Table className="users_table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>E-mail Address</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Eric Basilisa</td>
                            <td>success.maple@gmail.com</td>
                            <td><i className="fa fa-times text-danger" aria-hidden="true"></i></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default Users;