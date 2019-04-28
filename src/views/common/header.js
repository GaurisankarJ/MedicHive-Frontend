/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

import baseURL from "../connect/connect";

// Axios
axios.defaults.baseURL = baseURL;

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.renderProfile = this.renderProfile.bind(this);
        this.renderDashboard = this.renderDashboard.bind(this);
    }

    handleLogout() {
        axios({
            method: "delete",
            url: "/users/logout",
            headers: { "x-auth": sessionStorage.getItem("token") }
        }).then((res) => {
            console.log(res.data);

            sessionStorage.clear();

            this.props.history.push("/");
        }).catch((err) => {
            console.log(err);

            sessionStorage.clear();

            this.props.history.push("/error");
        });
    }

    renderProfile() {
        if (sessionStorage.getItem("userType") === "b") {
            return (
                <li><Link to="/profile/b">Me</Link></li>
            );
        }
        if (sessionStorage.getItem("userType") === "s") {
            return (
                <li><Link to="/profile/s">Me</Link></li>
            );
        }
        if (sessionStorage.getItem("userType") === "v") {
            return (
                <li><Link to="/profile/v">Me</Link></li>
            );
        }
    }

    renderDashboard() {
        if (sessionStorage.getItem("userType") === "b") {
            return (
                <li><Link to="/dashboard/b">Dashboard</Link></li>
            );
        }
        if (sessionStorage.getItem("userType") === "s") {
            return (
                <li><Link to="/dashboard/s">Dashboard</Link></li>
            );
        }
        if (sessionStorage.getItem("userType") === "v") {
            return (
                <li><Link to="/dashboard/v">Dashboard</Link></li>
            );
        }
    }

    render() {
        if (sessionStorage.getItem("token")) {
            return (
                <div>
                    <div id="header" className="row">
                        <div id="header_logo" className="col-md-2">
                            <h1><Link to="/">MedicHive</Link></h1>
                        </div>
                        <div id="header_navigation" className="col-md-10">
                            <ul className="nav nav-tabs navbar-right">
                                { this.renderDashboard() }
                                { this.renderProfile() }
                                <li><a id="header_logout" href="#header_logout" style={{ cursor: "pointer" }} onClick={this.handleLogout}>Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div id="header" className="row">
                    <div id="header_logo" className="col-md-2">
                        <h1><Link to="/">MedicHive</Link></h1>
                    </div>
                    <div id="header_navigation" className="col-md-10">
                        <ul className="nav nav-tabs navbar-right">
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/sign_up">Sign Up</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);
