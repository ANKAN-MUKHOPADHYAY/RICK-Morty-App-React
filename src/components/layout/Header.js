import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.scss";

const Header = () => {
    return (
        <header className="header">
            <h1 className="main-title">Rick and Morty React application</h1>
            <nav className="main-navigation">
                <ul className="main-navigation-list">
                    <li className="main-navigation-list__item">
                        <NavLink
                            exact={true}
                            activeClassName="active"
                            to="/home/"
                        >
                            Home Page
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
