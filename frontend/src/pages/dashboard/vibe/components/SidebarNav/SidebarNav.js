import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import NavOverlay from './components/NavOverlay';
import NavDropdownItem from './components/NavDropdownItem';
import TeamNav from './components/TeamNav';
import PageAlertContext from '../PageAlert/PageAlertContext';
import axios from "axios";
// import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setTeamData } from '../../../../../services/action';

class SidebarNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team_data: {},
    };
  }

  componentDidMount() {
    this.getteamdata();
  }

  getteamdata = () => {
    var token = localStorage.getItem('token');
    var url = "http://localhost:8000/team/getteam/"+localStorage.getItem('teamname');
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token
    };
    axios.get(url, { headers: headers })
      .then((response) => {
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


  render() {
    const team = this.props.team_data;

    const navTeam = (teamnav) => {
      return <TeamNav item={ teamnav } {...this.props} isSidebarCollapsed={this.props.isSidebarCollapsed} />;
    }

    const navBases = (basenav) => {
      return <NavDropdownItem
        item={{ ...basenav, team: this.props.match.params.team }} {...this.props} isSidebarCollapsed={this.props.isSidebarCollapsed} />;
    }

    const NavBrand = ({ logo, logoText }) => {
      return (
        <div className="site-logo-bar">
          <NavLink to="/" className="navbar-brand">
            {logo && <img src={logo} alt="" />}
            {logoText && <span className="logo-text">{logoText}</span>}
          </NavLink>
        </div>
      );
    };


    const teamnav = {
      name: team.teamname,
      avatar: team.teamavatar,
      children: [
        {
          name: 'Invite People',
          url: '/invite_people',
        },
        {
          name: 'Settings',
          url: '/settings',
        },
        {
          name: 'Switch Team',
          children: JSON.parse(localStorage.getItem('user'))&&JSON.parse(localStorage.getItem('user')).teams
        }
      ]
    };


    const basenav = {
      name: "Bases",
      url: '/widgets',
      badge: {
        text: 'NEW BASE',
      },
      children: team.bases
    }

    return (
      <PageAlertContext.Consumer>
        {consumer => {
          const hasPageAlertClass = consumer.alert ? 'has-alert' : '';
          return (
            <div>
              <div className={`app-sidebar ${hasPageAlertClass}`}>
                <NavBrand logo={this.props.logo} logoText={this.props.logoText} />
                <nav>
                  <ul id="main-menu">
                    {navTeam(teamnav)}
                    <h3 className='text-center text-warning mt-3 mb-3 nav-item-label'>My WORK</h3>
                    {navBases(basenav)}
                  </ul>
                </nav>
              </div>
              {this.props.isSidebarCollapsed && <NavOverlay onClick={this.props.toggleSidebar} />}
            </div>
          );
        }}
      </PageAlertContext.Consumer>
    );
  }
}

const mapStateToProps = ({team_data}) => ({
  team_data
});

const mapDispatchToProps = (dispatch) => ({
  setTeamData: bindActionCreators(setTeamData, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SidebarNav);
