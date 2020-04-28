import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Col, Row, Card, CardBody, CustomInput } from 'reactstrap';
import axios from "axios";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setTeamData } from '../../../../services/action';

class BaseProperty extends Component {
    constructor() {
        super();
        this.state = {
            basename: '',
            editbasename: false,
            description: '',
            editdescription: false,
            public_check: false,
            base_url: '',
            error_opacity: 0,
        }
    }

    componentDidMount() {
        this.getbasedata();
    }
    componentDidUpdate(prevProps) {
        if (this.props.match.params.basename !== prevProps.match.params.basename) {
            this.getbasedata();
        }
        console.log("updated");
    }
    getbasedata = () => {
        var token = localStorage.getItem('token');
        let correctbasename = '';
        let basename = this.props.match.params.basename.split("-");
        if (basename.length > 1) {
            for (var i = 0; i < basename.length; i++) {
                if (i === 0) correctbasename += basename[0] + '%C2%A0';
                else if (i === basename.length - 1) correctbasename += basename[i];
                else correctbasename = correctbasename + basename[i] + '%20';
            }
        }
        else correctbasename = basename[0];

        console.log(correctbasename);
        var url = `http://localhost:8000/team/getbase/${localStorage.getItem('teamname')}/${correctbasename}`;
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
        };
        axios.get(url, { headers: headers })
            .then((response) => {
                // this.setState({ team_data: response.data });
                console.log(response.data);
                this.setState({ basename: response.data.basename, description: response.data.basedescription, public_check: response.data.basevisiblity, base_url: response.data.basename });
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data); // => the response payload
                }
                console.log(error);
            });
    }

    visiblity_change = (e) => {
        console.log(e.target.checked);
        this.setState({ public_check: e.target.checked });
        var token = localStorage.getItem('token');
        var url = `http://localhost:8000/team/setbase/${localStorage.getItem('teamname')}/${this.state.base_url}`;
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
        };
        var data = {
            basename: this.state.basename,
            basedescription: this.state.description,
            basevisiblity: e.target.checked
        }
        axios.post(url, data, { headers: headers })
            .then((response) => {
                // this.setState({ team_data: response.data });
                console.log(response.data);
                this.props.setTeamData(response.data.team);
                this.setState({ base_url: response.data.base.basename });
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data); // => the response payload
                }
                console.log(error);
            });
    }

    basename_change = (e) => {
        this.setState({ basename: e.target.value });
    }

    description_change = (e) => {
        this.setState({ description: e.target.value });
    }

    send_basename = () => {
        this.setState({ editbasename: false });
        if (this.state.base_url.replace(/\s/g, '-').toLowerCase() !== this.state.basename.replace(/\s/g, '-').toLowerCase()) {
            var token = localStorage.getItem('token');
            var url = `http://localhost:8000/team/setbasename/${localStorage.getItem('teamname')}/${this.state.base_url}`;
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': token
            };
            var data = {
                basename: this.state.basename,
                basedescription: this.state.description,
                basevisiblity: this.state.public_check,
            }
            console.log(data);
            axios.post(url, data, { headers: headers })
                .then((response) => {
                    // this.setState({ team_data: response.data });
                    console.log(response.data);
                    this.props.setTeamData(response.data.team);
                    this.setState({ base_url: response.data.base.basename });
                })
                .catch((error) => {
                    if (error.response) {
                        console.log(error.response.data); // => the response payload
                        this.setState({ basename: this.state.base_url });
                        this.setState({ error_opacity: 1 }, () => setTimeout(() => this.setState({ error_opacity: 0 }), 2000));
                    }
                    console.log(error);
                });
        }

    }

    send_description = () => {
        this.setState({ editdescription: false });
        this.send_data();
    }

    send_data = () => {
        var token = localStorage.getItem('token');
        var url = `http://localhost:8000/team/setbase/${localStorage.getItem('teamname')}/${this.state.base_url}`;
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
        };
        var data = {
            basename: this.state.basename,
            basedescription: this.state.description,
            basevisiblity: this.state.public_check
        }
        axios.post(url, data, { headers: headers })
            .then((response) => {
                // this.setState({ team_data: response.data });
                console.log(response.data);
                this.props.setTeamData(response.data.team);
                this.setState({ base_url: response.data.base.basename });
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data); // => the response payload
                }
                console.log(error);
            });
    }

    render() {
        return (
            <Row>
                <Col md={{ size: 8, offset: 2 }}>
                    <Card>
                        <CardBody>
                            <Form>
                                <div className="text-center mb-5">
                                    <h2>Base Property</h2>
                                </div>
                                <div className="alert alert-danger mr-5 ml-5 text-center fade-in" style={{ opacity: this.state.error_opacity, transition: "opacity 1s" }}>
                                    <strong>Error!</strong> Another base with this name exists.
                                </div>
                                <FormGroup row>
                                    <Label for="basename" sm={12}><b>Base Name</b></Label>
                                    <Col sm={6}>
                                        {this.state.editbasename ? (
                                            <Input type="text" autoFocus placeholder="New Base Name" value={this.state.basename} onChange={this.basename_change} onBlur={this.send_basename} />
                                        ) : (<div className="name_div" onClick={() => { this.setState({ editbasename: true }); }}><span >{this.state.basename}</span></div>)}
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="exampleText" sm={12}><b onClick={() => { this.setState({ editdescription: true }); }}>Description</b></Label>
                                    <Col sm={12}>
                                        {this.state.editdescription ? (
                                            <Input type="textarea" autoFocus rows="5" value={this.state.description} onChange={this.description_change} onBlur={this.send_description} />
                                        ) : (<div className="description_div" onClick={() => { this.setState({ editdescription: true }); }}><span>{this.state.description}</span></div>)}
                                    </Col>

                                    {/* <Input type="textarea" name="text" id="exampleText" rows="5" value={this.state.description} onChange={this.description_change} /> */}
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="examplePassword" sm={2}><b>Visiblity <i className="fa fa-question-circle-o" aria-hidden="true"></i></b></Label>
                                    <Label for="public" className="text-center" sm={1}>Private</Label>
                                    <Col sm={1} className="d-flex align-items-center justify-content-center pr-0">
                                        <CustomInput type="switch" id="exampleCustomSwitch" name="customSwitch" onChange={this.visiblity_change} value="public" checked={this.state.public_check} />
                                    </Col>
                                    <Label for="public" className="text-center" sm={1}>Public</Label>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = ({ team_data }) => ({
    team_data
});

const mapDispatchToProps = (dispatch) => ({
    setTeamData: bindActionCreators(setTeamData, dispatch)
});

const ReduxNewBase = connect(
    mapStateToProps,
    mapDispatchToProps,
)(BaseProperty);

export default ReduxNewBase;

