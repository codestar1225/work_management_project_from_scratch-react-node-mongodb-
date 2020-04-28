import React from 'react';
import { NavLink } from 'react-router-dom';
import * as Feather from 'react-feather';
import NavBadge from './NavBadge';
import TeamSubNav from './TeamSubNav';

const TeamNavSingleItem = ({ item }) => {
  const Icon = item.icon && Feather[item.icon] ? Feather[item.icon] : null;
  if (item.children) {

    return <TeamSubNav item={{ ...item}} />;

  } else {
    // Force relative URLs to start with a slash
    return (
      <li className="nav-item">
        <NavLink to={`/${item.team}${item.url}`} activeClassName="active">
          {item.icon && Icon && <Icon className="side-nav-icon" />}
          <span className="nav-item-label">{item.name}</span>
          {item.badge && <NavBadge color={item.badge.variant} text={item.badge.text} />}
        </NavLink>
      </li>
    );
  }
};

export default TeamNavSingleItem;
