import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => (
    <nav className="main-nav">
        <ul>
          <li><NavLink exact to="/">Mountains</NavLink></li>
          <li><NavLink to="/ocean">Ocean</NavLink></li>
          <li><NavLink to="/dogs">Dogs</NavLink></li>
        </ul>
    </nav>
);

export default Nav;