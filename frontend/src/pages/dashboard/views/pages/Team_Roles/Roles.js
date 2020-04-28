import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import classnames from 'classnames';
import Role_Modal from './Role_Modal';

class Roles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role_modal: false
        }
    }

    modal_handle = () => {
        this.setState(prevState => ({
            role_modal: !prevState.role_modal
        }));
        console.log("I am here now", this.state.role_modal);
    }

    render() {
        return (
            <div>
                <div className="roles_div">
                    <h5 className="text-dark">Roles</h5>
                    <ul>
                        <li onClick={this.modal_handle}>Admin</li>
                        <li>Team Member</li>
                        <li>Guest</li>
                        <li>+New Role</li>
                    </ul>
                </div>
                <Role_Modal role_modal = {this.state.role_modal} modal_handle = {this.modal_handle} />
            </div>
        )
    }
}

export default Roles;