/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-multi-comp */
import React from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";

import baseURL from "../connect/connect";

// Axios
axios.defaults.baseURL = baseURL;

class CreateProfileBuyer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            address: "",
            bio: ""
        };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleChangeBio = this.handleChangeBio.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeName(event) {
        this.setState({
            name: event.target.value
        });
    }

    handleChangeAddress(event) {
        this.setState({
            address: event.target.value
        });
    }

    handleChangeBio(event) {
        this.setState({
            bio: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const body = {
            name: this.state.name,
            address: this.state.address,
            buyer: {
                bio: this.state.bio
            }
        };

        axios({
            method: "post",
            url: "/users/me",
            data: body,
            headers: { "x-auth": localStorage.getItem("token") }
        }).then((res) => {
            console.log(res.data);

            axios({
                method: "post",
                url: "/record",
                headers: { "x-auth": localStorage.getItem("token") }
            }).then((resp) => {
                console.log(resp.data);

                this.props.history.push("/dashboard/b");
            }).catch((error) => {
                console.log(error);

                this.props.history.push("/error");
            });
        }).catch((err) => {
            console.log(err);

            this.props.history.push("/error");
        });
    }

    render() {
        return (
            <div>
                <div id="profile_buyer">
                    <h1>PROFILE BUYER</h1>
                    <form id="profile_buyer_form" onSubmit={this.handleSubmit}>
                        <label htmlFor="profile_buyer_name">
                            <h4>NAME:</h4>
                            <input id="profile_buyer_name" className="form-control" value={this.state.name} type="text" placeholder="Name" onChange={this.handleChangeName} required />
                        </label>
                        <br />
                        <label htmlFor="profile_buyer_address">
                            <h4>ADDRESS:</h4>
                            <input id="profile_buyer_address" className="form-control" value={this.state.address} type="text" placeholder="Address" onChange={this.handleChangeAddress} required />
                        </label>
                        <br />
                        <label htmlFor="profile_buyer_bio">
                            <h4>BIO:</h4>
                            <textarea id="profile_buyer_bio" className="form-control" value={this.state.bio} placeholder="Bio" onChange={this.handleChangeBio} required />
                        </label>
                        <br />
                        <button id="profile_buyer_submit_button" className="btn btn-success" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

class ProfileBuyer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            address: "",
            bio: "",
            show: false,
            key: "",
            value: ""
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.activate = this.activate.bind(this);
        this.activateAccount = this.activateAccount.bind(this);
    }

    componentDidMount() {
        axios({
            method: "get",
            url: "/users/me",
            headers: { "x-auth": localStorage.getItem("token") }
        }).then((res) => {
            console.log(res.data);

            this.setState({
                name: res.data.userData.name,
                address: res.data.userData.address,
                bio: res.data.userData.buyer.bio
            });
        }).catch((err) => {
            console.log(err);

            this.props.history.push("/error");
        });
    }

    handleClose() {
        this.setState({
            show: false,
            value: ""
        });
    }

    handleShow(event) {
        this.setState({
            show: true,
            key: event
        });
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const body = {
            key: this.state.key,
            value: this.state.value
        };

        axios({
            method: "patch",
            url: "/users/me",
            data: body,
            headers: { "x-auth": localStorage.getItem("token") }
        }).then((res) => {
            console.log(res.data);

            this.handleClose();
            this.componentDidMount();
        }).catch((err) => {
            console.log(err);

            this.props.history.push("/error");
        });
    }

    activate() {
        if (localStorage.getItem("isActive") === "true") {
            return (
                <h3>ACCOUNT IS ACTIVE</h3>
            );
        }
        return (
            <button id="profile_buyer_activate_button" className="btn btn-block btn-success" type="button" onClick={this.activateAccount}>SEND ACTIVATION EMAIL</button>
        );
    }

    activateAccount() {
        axios({
            method: "get",
            url: "/users/activate",
            headers: { "x-auth": localStorage.getItem("token") }
        }).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err);

            this.props.history.push("/error");
        });
    }

    render() {
        return (
            <div>
                <div id="profile_buyer">
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>UPDATE {this.state.key.toUpperCase()}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <label htmlFor="profile_modal">
                                <input id="profile_modal" className="form-control" value={this.state.value} type="text" placeholder="Enter update" onChange={this.handleChange} />
                            </label>
                        </Modal.Body>
                        <Modal.Footer>
                            <button id="profile_buyer_modal_close_button" className="btn btn-danger" type="button" onClick={this.handleClose}>CLOSE</button>
                            <button id="profile_buyer_modal_save_button" className="btn btn-success" type="button" onClick={this.handleSubmit}>SAVE</button>
                        </Modal.Footer>
                    </Modal>
                    <h1>PROFILE BUYER</h1>
                    <h4>ACTIVATE ACCOUNT</h4>
                    {this.activate()}
                    <h4>NAME:</h4>
                    {this.state.name}
                    <button id="profile_buyer_name_update_button" className="btn btn-warning" type="button" onClick={() => this.handleShow("name")}><i className="fas fa-edit" /></button>
                    <h4>ADDRESS:</h4>
                    {this.state.address}
                    <button id="profile_buyer_address_update_button" className="btn btn-warning" type="button" onClick={() => this.handleShow("address")}><i className="fas fa-edit" /></button>
                    <h4>BIO:</h4>
                    {this.state.bio}
                    <button id="profile_buyer_bio_update_button" className="btn btn-warning" type="button" onClick={() => this.handleShow("bio")}><i className="fas fa-edit" /></button>
                </div>
            </div>
        );
    }
}

export { CreateProfileBuyer, ProfileBuyer };
