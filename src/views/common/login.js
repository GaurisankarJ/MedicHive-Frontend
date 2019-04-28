import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import baseURL from "../connect/connect";

// Axios
axios.defaults.baseURL = baseURL;

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleChangeEmail(event) {
        this.setState({
            email: event.target.value
        });
    }

    handleChangePassword(event) {
        this.setState({
            password: event.target.value
        });
    }

    handleLogin(event) {
        event.preventDefault();

        const body = {
            email: this.state.email,
            password: this.state.password
        };

        axios({
            method: "post",
            url: "/users/login",
            data: body
        }).then((res) => {
            console.log(res.data);

            sessionStorage.setItem("token", res.headers["x-auth"]);
            sessionStorage.setItem("email", res.data.email);
            sessionStorage.setItem("userType", res.data.userType);
            sessionStorage.setItem("isActive", res.data.isActive);

            if (sessionStorage.getItem("userType") === "b") {
                this.props.history.push("/dashboard/b");
            } else if (sessionStorage.getItem("userType") === "s") {
                this.props.history.push("/dashboard/s");
            } else if (sessionStorage.getItem("userType") === "v") {
                this.props.history.push("/dashboard/v");
            }
        }).catch((err) => {
            console.log(err);

            this.props.history.push("/error");
        });
    }

    render() {
        return (
            <div>
                <div id="login">
                    <h3>LOGIN</h3>
                    <form id="login_form" className="form-group" onSubmit={this.handleLogin}>
                        <label htmlFor="login_email">
                            <i className="fas fa-envelope" />
                            <input id="login_email" className="form-control" value={this.state.email} type="text" placeholder="Email" onChange={this.handleChangeEmail} required />
                        </label>
                        <br />
                        <label htmlFor="login_password">
                            <i className="fas fa-key" />
                            <input id="login_password" className="form-control" value={this.state.password} type="password" placeholder="Password" onChange={this.handleChangePassword} required />
                        </label>
                        <br />
                        <button id="login_button" className="btn btn-success" type="submit">Log In</button>
                    </form>
                    <br />
                    <Link to="/forgot">Forgot password?</Link>
                    <br />
                    <Link to="/sign_up">Sign Up</Link>
                </div>
            </div>
        );
    }
}

export default Login;
