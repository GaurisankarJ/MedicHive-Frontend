import React from "react";
import axios from "axios";

import baseURL from "../connect/connect";

// Axios
axios.defaults.baseURL = baseURL;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin() {
        this.props.history.push("/login");
    }

    handleSignUp() {
        this.props.history.push("/sign_up");
    }

    render() {
        return (
            <div>
                <div id="home">
                    <h1>HOME</h1>
                    <hr />
                    <button id="home_login" className="btn btn-success" type="button" onClick={this.handleLogin}>Login</button>
                    <button id="home_sign_up" className="btn btn-primary" type="button" onClick={this.handleSignUp}>Sign Up</button>
                </div>
            </div>
        );
    }
}

export default Home;
