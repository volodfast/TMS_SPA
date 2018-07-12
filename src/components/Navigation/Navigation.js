import React from "react";

import { Link } from "react-router-dom";

import "./Navigation.css";

export default () => {
    return (
        <header className="navbar navbar-fixed-top navbar-inverse">
            <div className="container">
                <Link to="/" id="logo">
                    Task Management System
                </Link>
                <nav>
                    <ul className="nav navbar-nav navbar-right">
                        <li className="dropdown">
                            <a
                                className="dropdown-toggle"
                                data-toggle="dropdown"
                            >
                                Account <b className="caret" />
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link to="/">Profile</Link>
                                </li>
                                <li>
                                    <Link to="/">Settings</Link>
                                </li>
                                <li className="divider" />
                                <li>
                                    <Link to="/">Logout</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};
