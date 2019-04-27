/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-multi-comp */
import React from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";

import baseURL from "../connect/connect";

// Axios
axios.defaults.baseURL = baseURL;

class CreateProfileSeller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            address: "",
            age: "",
            weight: "",
            sex: "",
            occupation: ""
        };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleChangeAge = this.handleChangeAge.bind(this);
        this.handleChangeWeight = this.handleChangeWeight.bind(this);
        this.handleChangeSex = this.handleChangeSex.bind(this);
        this.handleChangeOccupation = this.handleChangeOccupation.bind(this);
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

    handleChangeAge(event) {
        this.setState({
            age: event.target.value
        });
    }

    handleChangeWeight(event) {
        this.setState({
            weight: event.target.value
        });
    }

    handleChangeSex(event) {
        this.setState({
            sex: event.target.value
        });
    }

    handleChangeOccupation(event) {
        this.setState({
            occupation: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const body = {
            name: this.state.name,
            address: this.state.address,
            seller: {
                age: this.state.age,
                weight: this.state.weight,
                sex: this.state.sex,
                occupation: this.state.occupation
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

                this.props.history.push("/dashboard/s");
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
                <div id="profile_seller">
                    <h1>PROFILE SELLER</h1>
                    <form id="profile_seller_form" onSubmit={this.handleSubmit}>
                        <label htmlFor="profile_seller_name">
                            <h4>NAME:</h4>
                            <input id="profile_seller_name" className="form-control" value={this.state.name} type="text" placeholder="Name" onChange={this.handleChangeName} required />
                        </label>
                        <br />
                        <label htmlFor="profile_seller_address">
                            <h4>ADDRESS:</h4>
                            <input id="profile_seller_address" className="form-control" value={this.state.address} type="text" placeholder="Address" onChange={this.handleChangeAddress} required />
                        </label>
                        <br />
                        <label htmlFor="profile_seller_age">
                            <h4>AGE:</h4>
                            <input id="profile_seller_age" className="form-control" value={this.state.age} type="number" placeholder="Age" onChange={this.handleChangeAge} required />
                        </label>
                        <br />
                        <label htmlFor="profile_seller_weight">
                            <h4>WEIGHT:</h4>
                            <input id="profile_seller_weight" className="form-control" value={this.state.weight} type="number" placeholder="Weight" onChange={this.handleChangeWeight} required />
                        </label>
                        <br />
                        <label htmlFor="profile_seller_sex">
                            <h4>SEX:</h4>
                            <input id="profile_seller_sex" className="form-control" value={this.state.sex} type="text" placeholder="Male/Female" onChange={this.handleChangeSex} required />
                        </label>
                        <br />
                        <label htmlFor="profile_seller_occupation">
                            <h4>AGE:</h4>
                            <input id="profile_seller_occupation" className="form-control" value={this.state.occupation} type="text" placeholder="Occupation" onChange={this.handleChangeOccupation} required />
                        </label>
                        <br />
                        <button id="profile_seller_submit_button" className="btn btn-success" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

class ProfileSeller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            address: "",
            age: "",
            weight: "",
            sex: "",
            occupation: "",
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
                age: res.data.userData.seller.age,
                weight: res.data.userData.seller.weight,
                sex: res.data.userData.seller.sex,
                occupation: res.data.userData.seller.occupation
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
            <button id="profile_seller_activate_button" className="btn btn-block btn-success" type="button" onClick={this.activateAccount}>SEND ACTIVATION EMAIL</button>
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
                <div id="profile_seller">
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
                            <button id="profile_seller_modal_close_button" className="btn btn-danger" type="button" onClick={this.handleClose}>CLOSE</button>
                            <button id="profile_seller_modal_save_button" className="btn btn-success" type="button" onClick={this.handleSubmit}>SAVE</button>
                        </Modal.Footer>
                    </Modal>
                    <h1>PROFILE SELLER</h1>
                    <h4>ACTIVATE ACCOUNT</h4>
                    {this.activate()}
                    <h4>NAME:</h4>
                    {this.state.name}
                    <button id="profile_seller_name_update_button" className="btn btn-warning" type="button" onClick={() => this.handleShow("name")}><i className="fas fa-edit" /></button>
                    <h4>ADDRESS:</h4>
                    {this.state.address}
                    <button id="profile_seller_address_update_button" className="btn btn-warning" type="button" onClick={() => this.handleShow("address")}><i className="fas fa-edit" /></button>
                    <h4>AGE:</h4>
                    {this.state.age}
                    <button id="profile_seller_age_update_button" className="btn btn-warning" type="button" onClick={() => this.handleShow("age")}><i className="fas fa-edit" /></button>
                    <h4>WEIGHT:</h4>
                    {this.state.weight}
                    <button id="profile_seller_weight_update_button" className="btn btn-warning" type="button" onClick={() => this.handleShow("weight")}><i className="fas fa-edit" /></button>
                    <h4>SEX:</h4>
                    {this.state.sex}
                    <button id="profile_seller_sex_update_button" className="btn btn-warning" type="button" onClick={() => this.handleShow("sex")}><i className="fas fa-edit" /></button>
                    <h4>OCCUPATION:</h4>
                    {this.state.occupation}
                    <button id="profile_seller_occupation_update_button" className="btn btn-warning" type="button" onClick={() => this.handleShow("occupation")}><i className="fas fa-edit" /></button>
                </div>
            </div>
        );
    }
}

export { CreateProfileSeller, ProfileSeller };
