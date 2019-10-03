import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const GlobalNav = () => {
  const nav = [
    { name: 'Project', to: '/' },
    { name: 'Plan', to: '/plan' },
  ];

  return (
    <section className="header__nav nav-global">
      <h1 className="logo">
        <Link to="/">realdopt</Link>
      </h1>
      <ul className="nav__list">
        {nav.map((n, i) => (
          <li key={n.name} className="list__item">
            {
              i === 0
                ? <NavLink exact to={n.to} className="nav" activeClassName="nav--active">{n.name}</NavLink>
                : <NavLink to={n.to} className="nav" activeClassName="nav--active">{n.name}</NavLink>
            }
          </li>
        ))}
      </ul>
    </section>
  );
};

export default GlobalNav;
