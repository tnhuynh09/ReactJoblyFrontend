import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import UserContext from "./UserContext";
import "./Navigation.css";

function Navigation({ handleLogOut }) {
    const { currentUser } = useContext(UserContext);

    return (
        <div className="Navigation">
            <Navbar>
                <NavLink exact to="/" className="Navigation-logo">
                    Jobly
                </NavLink>
                <Nav>
                    {!currentUser ?
                        <div className="Navigation-navBar">
                            <NavItem>
                                <NavLink to="/login">Login</NavLink>
                            </NavItem>
                        </div>
                        :
                        <div className="Navigation-navBar">
                            <NavItem>
                                <Link to="/" onClick={handleLogOut}>Logout</Link>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/profile">Profile</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/jobs">Jobs</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/companies">Companies</NavLink>
                            </NavItem>
                        </div>
                    }
                </Nav>
            </Navbar>
        </div >
    );
}


export default Navigation;