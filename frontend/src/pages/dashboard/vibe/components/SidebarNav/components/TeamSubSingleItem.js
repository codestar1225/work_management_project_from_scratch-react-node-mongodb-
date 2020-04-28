import React from 'react';
import { NavLink } from 'react-router-dom';
import * as Feather from 'react-feather';
import NavBadge from './NavBadge';

const TeamSubNavSingleItem = ({ item }) => {
    const Icon = item.icon && Feather[item.icon] ? Feather[item.icon] : null;

    // Force relative URLs to start with a slash
    return (
        <li className="nav-item">
            <NavLink to={`/${item.teamname}`} className="sub-single-item" activeClassName="active">
                {item.icon && Icon && <Icon className="side-nav-icon" />}
                <span className="nav-item-label">{item.teamname}</span>
                {item.badge && <NavBadge color={item.badge.variant} text={item.badge.text} />}
            </NavLink>
        </li>
    );
};

export default TeamSubNavSingleItem;
