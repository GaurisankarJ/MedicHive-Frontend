/* eslint-disable jsx-a11y/label-has-for */
import React from "react";
import axios from "axios";

import baseURL from "../connect/connect";

// Axios
axios.defaults.baseURL = baseURL;

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userType: "b",
            email: "",
            password: ""
        };
        this.handleChangeUserType = this.handleChangeUserType.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    handleChangeUserType(event) {
        this.setState({
            userType: event.target.value
        });
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

    handleSignUp(event) {
        event.preventDefault();

        const body = {
            userType: this.state.userType,
            email: this.state.email,
            password: this.state.password
        };

        axios({
            method: "post",
            url: "/users",
            data: body
        }).then((res) => {
            console.log(res.data);

            sessionStorage.setItem("token", res.headers["x-auth"]);
            sessionStorage.setItem("email", res.data.email);
            sessionStorage.setItem("userType", res.data.userType);
            sessionStorage.setItem("isActive", res.data.isActive);

            if (sessionStorage.getItem("userType") === "b") {
                this.props.history.push("/profile/b/create");
            } else if (sessionStorage.getItem("userType") === "s") {
                this.props.history.push("/profile/s/create");
            } else if (sessionStorage.getItem("userType") === "v") {
                this.props.history.push("/profile/v/create");
            }
        }).catch((err) => {
            console.log(err);

            this.props.history.push("/error");
        });
    }

    render() {
        return (
            <div>
                <div id="sign_up">
                    <h3>SIGN UP</h3>
                    <form id="sign_up_form" className="form-group" onSubmit={this.handleSignUp}>
                        <label htmlFor="sign_up_userType">
                            <i className="fa fa-user" />
                            <select id="sign_up_userType" className="form-control" value={this.state.userType} onChange={this.handleChangeUserType}>
                                <option value="b">Buyer</option>
                                <option value="s">Seller</option>
                                <option value="v">Verifier/Issuer</option>
                            </select>
                        </label>
                        <br />
                        <label htmlFor="sign_up_email">
                            <i className="fas fa-envelope" />
                            <input id="sign_up_email" className="form-control" value={this.state.email} type="text" placeholder="Email" onChange={this.handleChangeEmail} required />
                        </label>
                        <br />
                        <label htmlFor="sign_up_password">
                            <i className="fas fa-key" />
                            <input id="sign_up_password" className="form-control" value={this.state.password} type="password" placeholder="Password" onChange={this.handleChangePassword} required />
                        </label>
                        <br />
                        <button id="sign_up_button" className="btn btn-primary" type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignUp;
