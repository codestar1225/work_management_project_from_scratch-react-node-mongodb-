import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Header, SidebarNav, PageContent, Avatar, PageAlert, Page } from '../vibe';
import Logo from '../../../../public/assets/images/logo.png';
import avatar1 from '../../../../public/assets/images/avatar.jpg';
import nav from '../_nav';
import routes from '../views';
import ContextProviders from '../vibe/components/utilities/ContextProviders';
import handleKeyAccessibility, { handleClickAccessibility } from '../vibe/helpers/handleTabAccessibility';
import '../vibe/scss/styles.scss';

const MOBILE_SIZE = 992;

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarCollapsed: false,
            isMobile: window.innerWidth <= MOBILE_SIZE,
            showChat1: true,
            showguid: false,
        };
    }

    handleResize = () => {
        if (window.innerWidth <= MOBILE_SIZE) {
            this.setState({ sidebarCollapsed: false, isMobile: true });
        } else {
            this.setState({ isMobile: false });
        }
    };

    componentDidUpdate(prev) {
        if (this.state.isMobile && prev.location.pathname !== this.props.location.pathname) {
            this.toggleSideCollapse();
        }
    }

    componentDidMount() {
        if (!localStorage.getItem('token')) this.props.history.push('/sign-in');
        window.addEventListener('resize', this.handleResize);
        document.addEventListener('keydown', handleKeyAccessibility);
        document.addEventListener('click', handleClickAccessibility);

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    toggleSideCollapse = () => {
        this.setState(prevState => ({ sidebarCollapsed: !prevState.sidebarCollapsed }));
    };

    closeChat = () => {
        this.setState({ showChat1: false });
    };

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('teamname');
        this.props.history.push('/sign-in');
    }

    click_guide = () => {
        this.setState(prevState => ({ showguid: !prevState.showguid }));
    }

    profile = () => {
        this.props.history.push(`/${localStorage.getItem('teamname')}/profile`);
    }

    HeaderNav = () => {
        let user_data = JSON.parse(localStorage.getItem('user'));
        let profile_avatar = "";
        if (!user_data.avatar) {
            if (user_data.firstname && user_data.lastname) profile_avatar = user_data.firstname[0].toUpperCase() + user_data.lastname[0].toUpperCase();
            else profile_avatar = user_data.email.slice(0, 2).toUpperCase();
        }
        else {
            profile_avatar = process.env.REACT_APP_API_HOST + user_data.avatar;
        }
        console.log(profile_avatar);
        return (
            <React.Fragment>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav className="alert-bell">
                        <i className="fa fa-bell-o fa-1x"></i>
                        <span className="badge badge-success">6</span>
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem>Project</DropdownItem>
                        <DropdownItem>User</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
                            Message <Badge color="primary">10</Badge>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret className="profile-block">
                        {user_data.avatar ? <Avatar size="medium" image={profile_avatar} /> : <Avatar size="medium" color="blue" initials={profile_avatar} />}
                        <div className="prfile-body">
                            <h5 className="profile-name">{user_data ? user_data.firstname : ''} <span>{user_data ? user_data.lastname : ''}</span></h5>
                            <span>{user_data ? user_data.email : ''}</span>
                        </div>
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={this.profile}>My Profile</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={this.logout}>Logout</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </React.Fragment>
        );
    }
    render() {
        const { sidebarCollapsed } = this.state;
        const sidebarCollapsedClass = sidebarCollapsed ? 'side-menu-collapsed' : '';
        const { team } = this.props.match.params;
        return (
            <ContextProviders>
                <div className={`app ${sidebarCollapsedClass}`}>
                    <PageAlert />
                    <div className="app-body">
                        <SidebarNav
                            nav={nav}
                            logo={Logo}
                            logoText="WMP"
                            isSidebarCollapsed={sidebarCollapsed}
                            toggleSidebar={this.toggleSideCollapse}
                            {...this.props}
                        />
                        <Page>
                            <Header
                                toggleSidebar={this.toggleSideCollapse}
                                isSidebarCollapsed={sidebarCollapsed}
                                routes={routes}
                                {...this.props}
                            >
                                {this.HeaderNav()}
                            </Header>
                            <PageContent>
                                <Switch>
                                    {routes.map(({ path, component: Component }, key) => {
                                        return <Route path={`/${team}${path}`} render={(props) => <Component {...props} />} key={key} />
                                    })}

                                </Switch>
                            </PageContent>
                        </Page>
                    </div>

                    <i className="fa fa-question-circle fa-4x text-danger" onClick={this.click_guide}></i>
                    {this.state.showguid && (
                        <div className="site_guide">
                            <ul>
                                <li>User Guide</li>
                                <li>Contact Us</li>
                            </ul>
                        </div>
                    )}

                </div>
            </ContextProviders>
        );
    }
}


