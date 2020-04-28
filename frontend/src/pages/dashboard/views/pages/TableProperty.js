import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Col, Row, Card, CardBody, CustomInput } from 'reactstrap';
import axios from "axios";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setTeamData } from '../../../../services/action';

class TableProperty extends Component {
    constructor() {
        super();
        this.state = {
            tablename: '',
            edittablename: false,
            description: '',
            editdescription: false,
            public_check: true,
            table_id: ''
        }
    }

    componentDidMount () {
        this.gettable_data();
    }

    componentDidUpdate(prevProps){
        if(this.props.match.params.tablename !== prevProps.match.params.tablename){
            this.gettable_data();
        }
    }

    gettable_data = () => {
        var token = localStorage.getItem('token');
        // console.log(this.props.match.params.tablename.split("-")[1]);
        let correctbasename = '';
        let basename = this.props.match.params.basename.split("-");
        for (var i = 0; i < basename.length; i++)
        {
            if( i === 0) correctbasename += basename[0]+'%C2%A0';
            else if(i === basename.length-1) correctbasename += basename[i];
            else correctbasename = correctbasename+basename[i]+'%20';
        }
        let tablename_array = this.props.match.params.tablename.split("-")
        let tableid = tablename_array[tablename_array.length-1];
        console.log(tableid);
        var url = `http://localhost:8000/team/gettable/${localStorage.getItem('teamname')}/${correctbasename}/${tableid}`;
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
        };
        axios.get(url, { headers: headers })
            .then((response) => {
                // this.setState({ team_data: response.data });
                console.log(response.data);
                this.setState({ tablename: response.data.table.tablename, description: response.data.table.tabledescription, public_check: response.data.table.tablevisiblity, table_id:response.data.table._id });
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data); // => the response payload
                }
                console.log(error);
            });
    }

    tablename_change = (e) => {
        this.setState({tablename: e.target.value});
    }

    description_change = (e) => {
        this.setState({description : e.target.value});
        
    }

    visiblity_change = (e) => {
        this.setState({public_check: e.target.checked});
        var token = localStorage.getItem('token');
        let correctbasename = '';
        let basename = this.props.match.params.basename.split("-");
        for (var i = 0; i < basename.length; i++)
        {
            if( i === 0) correctbasename += basename[0]+'%C2%A0';
            else if(i === basename.length-1) correctbasename += basename[i];
            else correctbasename = correctbasename+basename[i]+'%20';
        }
        var url = `http://localhost:8000/team/settable/${localStorage.getItem('teamname')}/${correctbasename}/${this.state.table_id}`;
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
        };
        var data = {
            tablename: this.state.tablename,
            tabledescription: this.state.description,
            tablevisiblity: e.target.checked,
        }
        axios.post(url, data, { headers: headers })
            .then((response) => {
                // this.setState({ team_data: response.data });
                console.log(response.data);
                this.setState({table_id: response.data.table._id});
                this.props.setTeamData(response.data.team);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data); // => the response payload
                }
                console.log(error);
            });
    }

    send_tablename = () => {
        this.setState({edittablename: false});
        this.send_data();
    }

    description_send = () => {
        this.setState({editdescription: false});
        this.send_data();
    }

    send_data = () => {
        var token = localStorage.getItem('token');
        let correctbasename = '';
        let basename = this.props.match.params.basename.split("-");
        for (var i = 0; i < basename.length; i++)
        {
            if( i === 0) correctbasename += basename[0]+'%C2%A0';
            else if(i === basename.length-1) correctbasename += basename[i];
            else correctbasename = correctbasename+basename[i]+'%20';
        }
        var url = `http://localhost:8000/team/settable/${localStorage.getItem('teamname')}/${correctbasename}/${this.state.table_id}`;
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
        };
        var data = {
            tablename: this.state.tablename,
            tabledescription: this.state.description,
            tablevisiblity: this.state.public_check
        }
        console.log("data", data);
        axios.post(url, data, { headers: headers })
            .then((response) => {
                // this.setState({ team_data: response.data });
                console.log(response.data);
                this.setState({table_url: response.data.table._id});
                this.props.setTeamData(response.data.team);
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
                                    <h2>Table Property</h2>
                                </div>
                                <FormGroup row>
                                    <Label for="tablename" sm={12}><b>Table Name</b></Label>
                                    <Col sm={6}>
                                        {this.state.edittablename ? (
                                            <Input type="text" autoFocus placeholder="New Base Name" value={this.state.tablename} onChange={this.tablename_change} onBlur={this.send_tablename} />
                                        ) : (<div className="name_div" onClick={() => {this.setState({ edittablename: true });}}><span>{this.state.tablename}</span></div>)}
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="exampleText" sm={3}><b onClick={() => { this.setState({ editdescription: true }); }}>Description</b></Label>
                                    <Col sm={12}>
                                        {this.state.editdescription ? (
                                            <Input type="textarea" autoFocus rows="5" value={this.state.description} onChange={this.description_change} onBlur={this.description_send} />
                                        ) : (<div className="description_div" onClick={() => { this.setState({ editdescription: true }); }}><span>{this.state.description}</span></div>)}
                                    </Col>

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

const mapStateToProps = ({team_data}) => ({
    team_data
});

const mapDispatchToProps = (dispatch) => ({
    setTeamData: bindActionCreators(setTeamData, dispatch)
});

const ReduxNewBase = connect(
    mapStateToProps,
    mapDispatchToProps,
)(TableProperty);

export default ReduxNewBase;
