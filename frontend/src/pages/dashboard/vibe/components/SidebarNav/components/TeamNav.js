import React, { Component } from 'react';
import * as Feather from 'react-feather';
import NavBadge from './NavBadge';
// import TeamNavSingleItem from './TeamNavSingleItem';

export default class NavDropdownItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      submenuOpen: false
    };
  }
  toggle = e => {
    if(this.state.open === true) this.setState({submenuOpen: false});
    console.log("I am in first now");
    this.setState(prevState => ({ open: !prevState.open }));
    e.preventDefault();
    e.stopPropagation();
  };

  toggle1 = e => {
    console.log("I am in second now", this.state.submenuOpen);
    this.setState(prevState => ({ submenuOpen: !prevState.submenuOpen }));
  };

  invite_people = () => {
    console.log(this.props);
    this.props.history.push(`/${localStorage.getItem('teamname')}/invite-people`);
  }

  team_roles = () => {
    this.props.history.push(`/${localStorage.getItem('teamname')}/team_roles`);
  }

  switch_team = (team) => {
    localStorage.setItem('teamname', team);
    // this.props.history.push(`/${localStorage.getItem('teamname')}`);
    window.location.href = `/${localStorage.getItem('teamname')}`;
  }
  render() {
    const { item } = this.props;
    const isExpanded = this.state.open ? 'open' : '';
    const ExpandIcon = this.state.open
      ? Feather.ChevronDown
      : Feather.ChevronRight;
    return (
      <li className={`nav-item has-submenu ${isExpanded}`}>
        <a href="#!" role="button" onClick={this.toggle} className="team_title">
          <img className="team_avatar" src={process.env.PUBLIC_URL + '/assets/images/' + item.avatar} alt="" />
          <span className="nav-item-label">{item.name}</span>{' '}
          {item.badge && (
            <NavBadge color={item.badge.variant} text={item.badge.text} />
          )}
          <ExpandIcon className="menu-expand-icon" />
        </a>
        {/* {(this.state.open || this.props.isSidebarCollapsed) && (
          <ul className="nav-submenu">
            {item.children.map((item1, index) => {
              return  <TeamNavSingleItem item={{...item1, team:team}} key={index} />
            })}
          </ul>
        )} */}
        {this.state.open && (
          <div className="team_menu_dropdown">
            <ul>
              <li onClick={this.invite_people}>Invite People</li>
              <li onClick={this.team_roles}>Team & Roles</li>
              <li onClick={(e)=>{this.toggle1(); e.preventDefault(); e.stopPropagation();}}>Switch Team<Feather.ChevronRight className="submenu-expand-icon" /></li>
            </ul>
          </div>
        )}
        {this.state.submenuOpen && (
          <div className="switch_team_dropdown">
            <ul>
              {JSON.parse(localStorage.getItem('user'))&&JSON.parse(localStorage.getItem('user')).teams.map((team, index) => {
                return <li onClick={(e) => {this.switch_team(team.teamname); e.preventDefault(); e.stopPropagation();}} key={index}>{team.teamname}</li>;
              })}
            </ul>

          </div>
        )}

      </li>
    );
  }
}
