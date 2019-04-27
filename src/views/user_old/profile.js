import React from "react";
import { Grid, Col, Row } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import axios from "axios";

import baseURL from "../connect/connect";

// Axios
axios.defaults.baseURL = baseURL;

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            age: "",
            weight: "",
            sex: "",
            occupation: "",
            address: "",
            newAccount: null
        };
        this.handleChangeAge = this.handleChangeAge.bind(this);
        this.handleChangeWeight = this.handleChangeWeight.bind(this);
        this.handleChangeSex = this.handleChangeSex.bind(this);
        this.handleChangeOccupation = this.handleChangeOccupation.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios({
            method: "get",
            url: "/users/me",
            headers: { "x-auth": localStorage.getItem("token") }
        }).then((res) => {
            this.setState({
                age: res.data.userDetails.age,
                weight: res.data.userDetails.weight,
                sex: res.data.userDetails.sex,
                occupation: res.data.userDetails.occupation,
                address: res.data.userDetails.address,
                newAccount: false
            });
        }).catch(() => {
            this.setState({
                newAccount: true
            });
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

    handleChangeAddress(event) {
        this.setState({
            address: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const body = {
            age: this.state.age,
            weight: this.state.weight,
            sex: this.state.sex,
            occupation: this.state.occupation,
            address: this.state.address
        };
        if (this.state.newAccount) {
            axios({
                method: "post",
                url: "/users/me",
                data: body,
                headers: { "x-auth": localStorage.getItem("token") }
            }).then(() => {
                alert(`Account created successfully at ${new Date().toString()}.`);
                this.props.history.push("/dashboard");
            }).catch((err) => {
                console.log(err);
                this.props.history.push("/not_found");
            });
        } else {
            axios({
                method: "patch",
                url: "/users/me",
                data: body,
                headers: { "x-auth": localStorage.getItem("token") }
            }).then(() => {
                alert(`Account updated successfully at ${new Date().toString()}.`);
                this.props.history.push("/dashboard");
            }).catch((err) => {
                console.log(err);
                this.props.history.push("/not_found");
            });
        }
    }

    render() {
        return (
            <div>
                <div id="bg-div" className="bg-div-1" />
                <div id="profile" className="text-left page-body">
                    <h1 className="heading">Profile</h1>
                    <form id="profile_form" onSubmit={this.handleSubmit}>
                        <Grid className="pro-grid">
                            <Row className="pro-field">
                                <Col xs={3}>
                                    <strong>Age:</strong>
                                </Col>
                                <Col xs={9}>
                                    <input id="age" className="inputfield" value={this.state.age} type="number" placeholder="Age" onChange={this.handleChangeAge} required />
                                </Col>
                            </Row>
                            <Row className="pro-field">
                                <Col xs={3}>
                                    <strong>Weight:</strong>
                                </Col>
                                <Col xs={9}>
                                    <input id="weight" className="inputfield" value={this.state.weight} type="number" placeholder="Weight" onChange={this.handleChangeWeight} required />
                                </Col>
                            </Row>
                            <Row className="pro-field">
                                <Col xs={3}>
                                    <strong>Sex:</strong>
                                </Col>
                                <Col xs={9}>
                                    <input id="sex" className="inputfield" value={this.state.sex} type="text" placeholder="Male/Female" onChange={this.handleChangeSex} required />
                                </Col>
                            </Row>
                            <Row className="pro-field">
                                <Col xs={3}>
                                    <strong>Occupation:</strong>
                                </Col>
                                <Col xs={9}>
                                    <input id="occupation" className="inputfield" value={this.state.occupation} type="text" placeholder="Occupation" onChange={this.handleChangeOccupation} />
                                </Col>
                            </Row>
                            <Row className="pro-field">
                                <Col xs={3}>
                                    <strong>Address:</strong>
                                </Col>
                                <Col xs={6}>
                                    <input id="address" className="inputfield" value={this.state.address} type="text" placeholder="Address" onChange={this.handleChangeAddress} />
                                </Col>
                            </Row>
                            <Row className="pro-field justify-content-center d-flex text-center">
                                <Col xs={6}>
                                    <button id="profile_button" className="btn btn-1 " type="submit">Submit</button>
                                </Col>
                            </Row>
                        </Grid>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(Profile);
