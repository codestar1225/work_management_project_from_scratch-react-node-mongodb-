import React, { Component } from 'react';
import {
    Card,
    CardBody,
    Table
} from 'reactstrap';
import { UncontrolledTooltip, UncontrolledDropdown, DropdownToggle, FormGroup, Label, Input, Button } from 'reactstrap';
import { InputGroup, InputGroupAddon } from 'reactstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.less';

const label_color = ['#6CCBF1', '#20BF2F', '#FFB911', '#EA3C6D', '#92BEFE', '#FF93AE', '#FFCF63', '#FFDBDE', '#CEF8FF', '#5A5A5A'];

class TablePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tablename: '',
            tabledata: [
                {
                    column_type: "Number",
                    column_name: "IID",
                    column_data: []
                },
                {
                    column_type: "Text",
                    column_name: "Name",
                    column_data: []
                }
            ],
            show_columntype: false,
            column_type_show: false,
            new_column_form_show: false,
            new_column_type: '',
            new_column_name: '',
            is_editing: false,
            editing_row: 0,
            editing_col: 0,
            date_picker_show: false,
            date: new Date(),
            form_input_date: '',
            new_column_label_input: '',
            new_column_label_array: [],
            new_column_label_index: 1,
            label_search_input: '',
            Iid: 1
        }
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.calendarRef = null;
        this.new_label_input = React.createRef();
    }

    componentDidMount() {
        this.set_tablename();
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    handleClickOutside(event) {
        if (this.calendarRef && !this.calendarRef.contains(event.target)) {
            this.onBlur();
        }
        else if (this.labelsearchRef && !this.labelsearchRef.contains(event.target)) {
            this.setState({ label_search_input: '', new_column_label_index: 1, is_editing: false, editing_col: 0, editing_row: 0 });
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.match.params.tablename !== prevProps.match.params.tablename) this.set_tablename();
    }

    set_tablename = () => {
        var tablename = '';

        for (let i = 0; i < this.props.match.params.tablename.split("-").length - 1; i++) {
            tablename += this.props.match.params.tablename.split("-")[i] + ' ';
        }
        this.setState({ tablename: tablename });
    }

    show_newcolumn = () => {
        this.setState({ show_columntype: true });
    }

    add_column = () => {
        console.log(this.state.new_column_name);
        if (this.state.new_column_name) {
            var column_data = [];
            if (this.state.new_column_type === 'Label') {
                for (var i = 0; i < this.state.tabledata[1].column_data.length; i++) column_data.push(" ");

                var element = {
                    column_type: this.state.new_column_type,
                    column_name: this.state.new_column_name,
                    labels: this.state.new_column_label_array,
                    column_data: column_data
                }
            }
            else {
                for (var j = 0; j < this.state.tabledata[1].column_data.length; j++) column_data.push(" ");
                var element = {
                    column_type: this.state.new_column_type,
                    column_name: this.state.new_column_name,
                    column_data: column_data
                }
            }


            this.setState({ tabledata: [...this.state.tabledata, element], new_column_type: '', new_column_name: '', new_column_form_show: false, column_name_error: '', new_column_label_array: [], new_column_label_index: 1, new_column_label_input: '' });
        }

        else this.setState({ column_name_error: 'Please input column name' });


        console.log(this.state.tabledata);
    }

    cancel_column = () => {
        this.setState({ new_column_type: '', new_column_name: '', new_column_form_show: false, column_name_error: '', new_column_label_array: [], new_column_label_index: 1, new_column_label_input: '' });
    }

    add_row = () => {
        this.state.tabledata.map(element => {
            if (element.column_name === 'IID') {
                if (element.column_data.length === 0) {
                    element.column_data.push(1);
                    this.setState({ Iid: 2 });
                }
                else {
                    element.column_data.push(this.state.Iid);
                    this.setState({ Iid: this.state.Iid + 1 });
                }
            }
            else element.column_data.push("");
        });
        this.forceUpdate()
    }

    delete_row = (i) => {
        this.state.tabledata.map(element => {
            element.column_data.splice(i, 1);
        });
        this.forceUpdate();
    }

    datecell_to_dateobject = (datestring) => {
        var date = Date.parse(datestring);
        return new Date(date);
    }

    edit_celldata = (row, col) => {
        console.log(col, row);
        this.setState({ is_editing: true, editing_col: col, editing_row: row });
        if (this.state.tabledata[col].column_type === 'Date') {
            let calendar_date = this.datecell_to_dateobject(this.state.tabledata[col].column_data[row]);
            if (calendar_date.getFullYear()) this.setState({ date: calendar_date, form_input_date: this.state.tabledata[col].column_data[row] });
        }
        else if (this.state.tabledata[col].column_type === 'Label' && this.state.tabledata[col].labels.length > 0) this.setState({ new_column_label_index: this.state.tabledata[col].labels[this.state.tabledata[col].labels.length - 1].index + 1 });
    }

    edit_cell_text = (e) => {
        this.state.tabledata[this.state.editing_col].column_data[this.state.editing_row] = e.target.value;
        this.forceUpdate();
    }

    leave_cell = () => {
        this.setState({ is_editing: false, editing_col: 0, editing_row: 0 });
    }

    change_date = (date) => {
        var form_input_date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        this.setState({ date: date, form_input_date: form_input_date });
        var form_input_date1 = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
        this.state.tabledata[this.state.editing_col].column_data[this.state.editing_row] = form_input_date1;
        this.forceUpdate();
    }

    input_date_change = (e) => {
        this.setState({ form_input_date: e.target.value });
    }

    remove_form_input_date = () => {
        this.setState({ form_input_date: '' });
    }

    set_today = (date) => {
        var form_input_date = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
        this.state.tabledata[this.state.editing_col].column_data[this.state.editing_row] = form_input_date;
        this.setState({ is_editing: false, editing_col: 0, editing_row: 0, date: new Date(), form_input_date: '' });
        // this.leave_cell();
        this.forceUpdate();
    }

    set_date = () => {
        var form_input_date = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(this.state.date);
        this.state.tabledata[this.state.editing_col].column_data[this.state.editing_row] = form_input_date;
        this.setState({ is_editing: false, editing_col: 0, editing_row: 0, date: new Date(), form_input_date: '' });
        this.forceUpdate();
    }

    date_cancel = () => {
        this.setState({ is_editing: false, editing_col: 0, editing_row: 0, date: new Date(), form_input_date: '' });
    }

    onBlur = () => {
        if (this.datecell_to_dateobject(this.state.form_input_date).getFullYear()) {
            var form_input_date = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(this.datecell_to_dateobject(this.state.form_input_date));
            this.state.tabledata[this.state.editing_col].column_data[this.state.editing_row] = form_input_date;
            this.forceUpdate();
        }

        this.setState({ is_editing: false, editing_col: 0, editing_row: 0, date: new Date(), form_input_date: '' });
        console.log("I am in onblur now");
    }

    handle_label_search_input = (e) => {
        this.setState({ label_search_input: e.target.value });
    }

    remove_label = (col, row, index) => {
        var label_index = this.state.tabledata[col].labels[index].index;
        this.state.tabledata[col].labels.splice(index, 1);
        var label_array = this.state.tabledata[col].column_data;
        for (let i = 0; i < label_array.length; i++) {
            if (label_array[i] === label_index) label_array[i] = " ";
        }

        this.state.tabledata[col].column_data = label_array;
        this.forceUpdate();
    }

    select_label = (col, row, label) => {
        this.state.tabledata[col].column_data[row] = label.index;
        this.setState({ is_editing: false, editing_col: 0, editing_row: 0, new_column_label_index: 1, label_search_input: '' });
        this.forceUpdate();
    }

    create_search_label_input = (col, row) => {
        var newlabel = {
            index: this.state.new_column_label_index,
            label: this.state.label_search_input,
        };
        this.state.tabledata[col].labels.push(newlabel);
        this.state.tabledata[col].column_data[row] = this.state.new_column_label_index;

        this.setState({ label_search_input: '', new_column_label_index: 1, is_editing: false, editing_col: 0, editing_row: 0 });
        this.forceUpdate();
    }

    search_label_list = (col, row) => {
        console.log("I am here")
        let label_list_count = 0;
        let label_list = [];
        this.state.tabledata[col].labels.map((label, index) => {
            if (label.label.toLowerCase().search(this.state.label_search_input.toLowerCase()) > -1) {
                label_list_count++;
                console.log("I am here1", label_list_count)
                if (label_list_count <= 5) label_list.push(<li key={index} className="new_column_label_list"><span style={{ backgroundColor: label_color[(label.index - 1) % 10] }} onClick={() => this.select_label(col, row, label)}>{label.label}</span><i className="fa fa-times text-danger" onClick={() => this.remove_label(col, row, index)} aria-hidden="true"></i></li>);
            }
        });
        return label_list;
    }

    create_search_label = (col, row) => {
        let search_label_count = 0;
        this.state.tabledata[col].labels.map(label => {
            if (label.label.toLowerCase() === this.state.label_search_input.toLowerCase()) search_label_count += 1;
        });

        if (search_label_count === 0 && this.state.label_search_input) return (<li className="text-center" onClick={() => this.create_search_label_input(col, row)}>Create <b>{this.state.label_search_input}</b> Label</li>);

    }

    label_cell_clear = (col, row) => {
        this.state.tabledata[col].column_data[row] = " ";
        this.forceUpdate();
    }

    editing_cell_by_type = (col, row, data) => {
        if (this.state.tabledata[col].column_type === 'Text') return (<input type="text" className="edit_cell_input" onChange={this.edit_cell_text} autoFocus onBlur={this.leave_cell} value={data[col].column_data[row]} maxLength="1000" />);
        else if (this.state.tabledata[col].column_type === 'Date') {
            return (
                <div>
                    <div className="table_span_div">
                        <span>{data[col].column_data[row]}</span>
                    </div>
                    <div className="date_picker_form" ref={dd => this.calendarRef = dd}>
                        <InputGroup className="mb-2">
                            <Input type="text" onChange={this.input_date_change} value={this.state.form_input_date} />
                            <InputGroupAddon addonType="prepend" onClick={this.remove_form_input_date}><span className="input-group-text"><i className="fa fa-times text-danger" aria-hidden="true" ></i></span></InputGroupAddon>
                        </InputGroup>
                        <Calendar
                            onChange={this.change_date}
                            value={this.state.date}
                        />
                        <FormGroup className="text-center mt-3">
                            <Button className="mr-2" onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                this.set_today(new Date());
                            }}>Today</Button>
                            <Button className="ml-2" onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                this.date_cancel();
                            }}>Cancel</Button>
                        </FormGroup>
                    </div>
                </div>)
        }
        else if (this.state.tabledata[col].column_type === 'Label') {
            return (
                <div>
                    <div className="table_span_div">
                        <span className="label_td" style={{ backgroundColor: label_color[(data[col].column_data[row] - 1) % 10] }}>{this.get_label(col, row)}</span>
                    </div>
                    <div className="label_picker_form" ref={label_search => this.labelsearchRef = label_search}>
                        {this.get_label(col, row) && <i className="fa fa-times label_cell_clear text-danger" onClick={() => this.label_cell_clear(col, row)} aria-hidden="true"></i>}
                        <Input type="text" autoFocus value={this.state.label_search_input} onChange={this.handle_label_search_input} />
                        {this.state.label_search_input && <i className="fa fa-times label_search_clear text-danger" onClick={() => { this.setState({ label_search_input: '' }) }} aria-hidden="true"></i>}
                        <ul className="mt-2">
                            {this.search_label_list(col, row)}
                            {this.create_search_label(col, row)}
                        </ul>
                    </div>
                </div>
            )
        }
    }

    get_label = (col, row) => {
        var index = this.state.tabledata[col].column_data[row];
        var label_name = ''
        this.state.tabledata[col].labels.map(label => {
            if (label.index === index) label_name = label.label;
        })
        return label_name;
    }

    my_table = () => {

        var my_view = [];
        if (!this.state.tabledata || this.state.tabledata.length === 0)
            return null
        for (let i = 0; i < this.state.tabledata[1].column_data.length; i++) {
            my_view.push(<tr key={i}>{this.my_tr(this.state.tabledata, i)}<td key={i} className="delete_row" onClick={() => this.delete_row(i)}><i className="fa fa-times text-danger delete_row" aria-hidden="true"></i></td></tr>)
        }
        return my_view
    }

    my_tr = (sample_data, index) => {
        let my_view = [];
        for (let i = 1; i < sample_data.length; i++) {
            my_view.push(<td key={i}>
                {(this.state.is_editing && this.state.editing_col === i && this.state.editing_row === index) ? this.editing_cell_by_type(i, index, sample_data) :
                    <div className="table_span_div" onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.edit_celldata(index, i)
                    }} >
                        {this.state.tabledata[i].column_type === "Label" ? <span className="label_td" style={{ backgroundColor: label_color[(this.state.tabledata[i].column_data[index] - 1) % 10] }}>{this.get_label(i, index)}</span> :
                            (<span id={`UncontrolledTooltipExample${index}${i}`}>
                                {sample_data[i].column_data[index]}
                                <UncontrolledTooltip modifiers={{ preventOverflow: { boundariesElement: 'window' } }} autohide={false} delay={{ show: 100, hide: 9 }} placement="bottom-start" target={`UncontrolledTooltipExample${index}${i}`}>
                                    {sample_data[i].column_data[index]}
                                </UncontrolledTooltip>
                            </span>)
                        }
                    </div>
                }

            </td>)
        }
        return my_view
    }

    handle_column_name = (e) => {
        this.setState({ new_column_name: e.target.value });
    }

    new_column_type = () => {
        if (!this.state.new_column_form_show) this.setState(prevState => ({ column_type_show: !prevState.column_type_show }));
    }

    show_new_column_form = (type) => {
        this.setState({ column_type_show: false, new_column_form_show: true, new_column_type: type });
    }

    handle_label_input = (e) => {
        this.setState({ new_column_label_input: e.target.value });
    }

    label_accept = () => {
        var newlabel = {
            index: this.state.new_column_label_index,
            label: this.state.new_column_label_input
        };
        this.new_label_input.current.focus();
        this.setState({ new_column_label_array: [...this.state.new_column_label_array, newlabel], new_column_label_input: '', new_column_label_index: this.state.new_column_label_index + 1 });

        console.log(this.state.new_column_label_array);
    }

    label_reset = () => {
        this.setState({ new_column_label_input: '' });
    }

    del_new_column_label = (index) => {
        let array = this.state.new_column_label_array;
        array.splice(index, 1)
        this.setState({ new_column_label_array: array });
    }

    new_label_enter_key_down = (e) => {
        if (e.key === 'Enter') this.label_accept();
    }

    render() {
        return (
            <Card>
                <CardBody>
                    <h3>{this.state.tablename}</h3>
                    <br />
                    <div className="row table_view">
                        <Table>
                            <thead>
                                <tr>
                                    {this.state.tabledata.map((column, index) => {
                                        if (index > 0) return (<th key={index}><span>{column.column_name}</span></th>)
                                    })}
                                    <th className="end_column">
                                        <div>
                                            <button className="btn btn-secondary new_col_button" onClick={this.new_column_type}>+</button>
                                            <div className="new_column_type_div" style={{ display: this.state.column_type_show ? 'block' : 'none' }}>
                                                <ul>
                                                    <li onClick={() => this.show_new_column_form('Text')}>Text</li>
                                                    <li onClick={() => this.show_new_column_form('Date')}>Date</li>
                                                    <li onClick={() => this.show_new_column_form('Label')}>Label</li>
                                                    <li onClick={() => this.show_new_column_form('Person')}>Person</li>
                                                </ul>
                                            </div>
                                            <div className="new_column_form" style={{ display: this.state.new_column_form_show ? 'block' : 'none' }}>
                                                <FormGroup className="mb-0">
                                                    <Label for="columnName" className="mt-2">Column Name</Label>
                                                    <Input type="text" name="name" value={this.state.new_column_name} autoFocus onChange={this.handle_column_name} placeholder="New Column Name" />
                                                </FormGroup>
                                                {this.state.column_name_error ? <span className="text-danger">{this.state.column_name_error}</span> : <br />}
                                                {this.state.new_column_type === 'Label' ? (
                                                    <div>
                                                        <Label> List </Label>
                                                        <ul>
                                                            {this.state.new_column_label_array.map((label, index) => {
                                                                return <li key={index} className="new_column_label_list"><span style={{ backgroundColor: label_color[(label.index - 1) % 10] }}>{label.label}</span><i className="fa fa-times text-danger" aria-hidden="true" onClick={() => this.del_new_column_label(index)}></i></li>
                                                            })}
                                                        </ul>
                                                        <Input type="text" ref={this.new_label_input} className="mb-3" placeholder="New Items..." value={this.state.new_column_label_input} onChange={this.handle_label_input} onKeyDown={this.new_label_enter_key_down} />
                                                        {this.state.new_column_label_input && (
                                                            <div>
                                                                <i className="fa fa-check label_input_accept text-success" onClick={this.label_accept} aria-hidden="true"></i>
                                                                <i className="fa fa-times label_input_clear text-danger" onClick={this.label_reset} aria-hidden="true"></i>
                                                            </div>
                                                        )}

                                                    </div>
                                                ) : <FormGroup>
                                                        <Label> Column Type: {this.state.new_column_type}</Label>
                                                    </FormGroup>}
                                                <FormGroup className="text-center">
                                                    <Button className="mr-2" onClick={this.add_column}>Add</Button>
                                                    <Button className="ml-2" onClick={this.cancel_column}>Cancel</Button>
                                                </FormGroup>
                                            </div>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.my_table()}

                            </tbody>
                        </Table>

                    </div>

                    <UncontrolledDropdown>
                        <DropdownToggle onClick={this.add_row}>
                            + New Row
                        </DropdownToggle>
                    </UncontrolledDropdown>

                </CardBody>
            </Card>
        )
    }
}

export default TablePage;
