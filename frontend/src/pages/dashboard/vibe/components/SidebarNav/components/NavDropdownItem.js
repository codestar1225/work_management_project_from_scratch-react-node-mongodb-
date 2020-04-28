import React, { Component } from 'react';
import * as Feather from 'react-feather';
import { Badge } from 'reactstrap';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import axios from "axios";

export default class NavDropdownItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
  }

  newbase = () => {
    // this.props.history.push(`/${localStorage.getItem('teamname')}/newbase`);
    let teamname = localStorage.getItem('teamname').replace(/\s/g, '-').toLowerCase();
    var token = localStorage.getItem('token');
    var url = `http://localhost:8000/team/newbase/${localStorage.getItem('teamname')}`;
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token
    };
    axios.get(url, { headers: headers })
      .then((response) => {
        // this.setState({ team_data: response.data });
        let newbasename = response.data.newbase.basename.replace(/\s/g, '-').toLowerCase();
        console.log(response.data);
        this.props.setTeamData(response.data.team);
        this.props.history.push(`/${teamname}/${newbasename}/property`);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data); // => the response payload
        }
        console.log(error);
      });
  }

  newtable = (basename) => {
    console.log("new table");
    let teamname = localStorage.getItem('teamname').replace(/\s/g, '-').toLowerCase();
    var token = localStorage.getItem('token');
    var url = `http://localhost:8000/team/newtable/${localStorage.getItem('teamname')}/${basename}`;
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token
    };
    axios.get(url, { headers: headers })
      .then((response) => {
        // this.setState({ team_data: response.data });
        console.log(response.data);
        let correct_tablename = response.data.newtable.tablename.replace(/\s/g, '-').toLowerCase();
        let correct_basename = basename.replace(/\s/g, '-').toLowerCase();
        this.props.setTeamData(response.data.team);
        this.props.history.push(`/${teamname}/${correct_basename}/${correct_tablename}-${response.data.tableid}/property`);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data); // => the response payload
        }
        console.log(error);
      });
  }


  delete_base = (basename) => {
    console.log("delete base");
    var token = localStorage.getItem('token');
    let teamname = localStorage.getItem('teamname').replace(/\s/g, '-').toLowerCase();
    var url = `http://localhost:8000/team/deletebase/${localStorage.getItem('teamname')}/${basename}`;
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token
    };
    axios.get(url, { headers: headers })
      .then((response) => {
        // this.setState({ team_data: response.data });
        console.log(response.data);
        this.props.setTeamData(response.data);
        this.props.history.push(`/${teamname}`);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data); // => the response payload
        }
        console.log(error);
      });
  }

  deletetable = (tableid, basename) => {
    console.log("delete table");
    var token = localStorage.getItem('token');
    var url = `http://localhost:8000/team/deletetable/${localStorage.getItem('teamname')}/${basename}/${tableid}`;
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token
    };
    axios.get(url, { headers: headers })
      .then((response) => {
        // this.setState({ team_data: response.data });
        console.log(response.data);
        this.props.setTeamData(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data); // => the response payload
        }
        console.log(error);
      });
  }

  base_property = (basename, property) => {
    console.log(basename);
    let teamname = localStorage.getItem('teamname').replace(/\s/g, '-').toLowerCase();
    var replacedbasename = basename.replace(/\s/g, '-').toLowerCase();
    console.log(replacedbasename);
    this.props.history.push(`/${teamname}/${replacedbasename}/${property}`);
  }

  baseclick = (basename) => {
    // let teamname = localStorage.getItem('teamname').replace(/\s/g, '-').toLowerCase();
    // this.props.history.push(`/${teamname}/${basename}`);
  }

  tableclick = (tablename, tableindex, basename) => {
    let teamname = localStorage.getItem('teamname').replace(/\s/g, '-').toLowerCase();
    let correct_tablename = tablename.replace(/\s/g, '-').toLowerCase();
    let correct_basename = basename.replace(/\s/g, '-').toLowerCase();
    this.props.history.push(`/${teamname}/${correct_basename}/${correct_tablename}-${tableindex}`);
  }

  propertytable = (tablename, tableindex, basename) => {
    let teamname = localStorage.getItem('teamname').replace(/\s/g, '-').toLowerCase();
    let correct_tablename = tablename.replace(/\s/g, '-').toLowerCase();
    let correct_basename = basename.replace(/\s/g, '-').toLowerCase();
    this.props.history.push(`/${teamname}/${correct_basename}/${correct_tablename}-${tableindex}/property`);
  }

  render() {
    const { item } = this.props;
    const Icon = item.icon ? Feather[item.icon] : null;
    const basenav = () => {
      return item.children && item.children.map((item1, index) => {
        return (
          <div className="nav-item has-submenu" key={index}>
            <a onClick={(e) => {
              this.baseclick(item1.basename);
              e.preventDefault();
              e.stopPropagation();
            }} role="button" key={index}>
              <span className="nav-item-label ml-3">{item1.basename}</span>
            </a>
            <UncontrolledDropdown className="base-dropdown-div">
              <DropdownToggle className="table-dropdown-toggle">
                ...
                </DropdownToggle>
              <DropdownMenu right className="base-dropped-toggle">
                <DropdownItem onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  this.newtable(item1.basename);
                }}>
                  <i className="fa fa-plus mr-2" aria-hidden="true"></i>New Table
                    </DropdownItem>
                <DropdownItem onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  this.base_property(item1.basename, 'property');
                }}>Properties</DropdownItem>
                <DropdownItem onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  this.delete_base(item1.basename);
                }}>Delete Base</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            {item1.tables.map((table, index) => {
              return (
                <div className="nav-item has-submenu" key={index}>
                  <a onClick={(e) => {
                    this.tableclick(table.tablename, table.id, item1.basename);
                    //I want to use item1.basename in here.
                    e.preventDefault();
                    e.stopPropagation();
                  }} role="button" key={index}>
                    <span className="nav-item-label ml-5">{table.tablename}</span>
                  </a>
                  <UncontrolledDropdown className="table-dropdown-div">
                    <DropdownToggle className="table-dropdown-toggle">
                      ...
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem onClick={(e) => {
                        this.propertytable(table.tablename, table.id, item1.basename);
                        e.preventDefault();
                        e.stopPropagation();
                      }}>Property</DropdownItem>
                      <DropdownItem onClick={(e) => {
                        this.deletetable(table._id, item1.basename);
                        e.preventDefault();
                        e.stopPropagation();
                      }}>Delete Table</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>

                </div>
              )
            })}
          </div>

        )
      })
    }
    return (
      <li className="nav-item has-submenu">
        <a role="button">
          {item.icon && Icon && <Icon className="side-nav-icon" />}
          <span className="nav-item-label">{item.name}</span>{' '}
          {item.badge && (
            <span className="new-base-badge" onClick={(e) => {

              this.newbase();
              e.preventDefault();
              e.stopPropagation();
            }} >
              <Badge color={item.badge.variant}><i className="fa fa-plus" aria-hidden="true"></i>{item.badge.text}</Badge>
            </span>

          )}
        </a>
        {basenav()}

      </li>
    );
  }
}
