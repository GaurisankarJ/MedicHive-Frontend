import React from "react";
import axios from "axios";

import baseURL from "../connect/connect";

// Axios
axios.defaults.baseURL = baseURL;

class Forgot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            show: false,
            new_password: "",
            confirm_password: "",
            key: ""
        };
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleSendEmail = this.handleSendEmail.bind(this);
        this.handleChangeNewPassword = this.handleChangeNewPassword.bind(this);
        this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this);
        this.handleChangeKey = this.handleChangeKey.bind(this);
        this.handleResetPassword = this.handleResetPassword.bind(this);
    }

    handleChangeEmail(event) {
        this.setState({
            email: event.target.value
        });
    }

    handleChangeNewPassword(event) {
        this.setState({
            new_password: event.target.value
        });
    }

    handleChangeConfirmPassword(event) {
        this.setState({
            confirm_password: event.target.value
        });
    }

    handleChangeKey(event) {
        this.setState({
            key: event.target.value
        });
    }

    handleSendEmail(event) {
        event.preventDefault();

        axios({
            method: "get",
            url: `/users/forgot?email=${this.state.email}`
        }).then((res) => {
            console.log(res.data);

            this.setState({ show: true });
        }).catch((err) => {
            console.log(err);

            this.props.history.push("/error");
        });
    }

    handleResetPassword(event) {
        event.preventDefault();

        if (this.state.new_password !== this.state.confirm_password) {
            alert("Passwords don't match!");

            this.setState({
                new_password: "",
                confirm_password: ""
            });
        } else {
            const body = {
                password: this.state.new_password
            };

            axios({
                method: "post",
                url: `/users/forgot/${this.state.key}`,
                data: body
            }).then((res) => {
                console.log(res.data);

                this.props.history.push("/login");
            }).catch((err) => {
                console.log(err);

                this.props.history.push("/error");
            });
        }
    }

    render() {
        return (
            <div>
                <div id="forgot">
                    <h3>FORGOT PASSWORD</h3>
                    {
                        (this.state.show === false)
                            ? (
                                <form id="forgot_email" className="form-group" onSubmit={this.handleSendEmail}>
                                    <label htmlFor="forgot_email">
                                        <i className="fas fa-envelope" />
                                        <input id="login_email" className="form-control" value={this.state.email} type="text" placeholder="Email" onChange={this.handleChangeEmail} required />
                                    </label>
                                    <br />
                                    <button id="forgot_email_button" className="btn btn-info" type="submit">Sent Reset Mail</button>
                                </form>
                            ) : (
                                <form id="forgot_password" className="form-group" onSubmit={this.handleResetPassword}>
                                    <label htmlFor="forgot_new_password">
                                        <i className="fas fa-key" />
                                        <input id="forgot_new_password" className="form-control" value={this.state.new_password} type="password" placeholder="New Password" onChange={this.handleChangeNewPassword} required />
                                    </label>
                                    <br />
                                    <label htmlFor="forgot_confirm_password">
                                        <i className="fas fa-key" />
                                        <input id="forgot_confirm_password" className="form-control" value={this.state.confirm_password} type="password" placeholder="Confirm Password" onChange={this.handleChangeConfirmPassword} required />
                                    </label>
                                    <br />
                                    <label htmlFor="forgot_key">
                                        <i className="fas fa-user-secret" />
                                        <input id="forgot_key" className="form-control" value={this.state.key} type="text" placeholder="Secret Key" onChange={this.handleChangeKey} required />
                                    </label>
                                    <br />
                                    <button id="forgot_reset_button" className="btn btn-danger" type="submit">Reset Password</button>
                                </form>
                            )
                    }
                </div>
            </div>
        );
    }
}

export default Forgot;
