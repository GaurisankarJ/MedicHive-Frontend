/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import { Modal } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import axios from "axios";

import baseURL from "../connect/connect";

// Axios
axios.defaults.baseURL = baseURL;

class Records extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allergy: <tr />,
            medication: <tr />,
            problem: <tr />,
            immunization: <tr />,
            vitalSign: <tr />,
            procedure: <tr />,
            verifiers: <tr />,
            verifierEmail: "NONE",
            showAdd: false,
            showUpdate: false,
            showDelete: false,
            showVerify: false,
            showRequest: false,
            key: "",
            id: "",
            valueAdd: "",
            valueUpdate: ""
        };
        this.populateRecords = this.populateRecords.bind(this);
        this.populateVerifiers = this.populateVerifiers.bind(this);
        this.selectVerifier = this.selectVerifier.bind(this);
        this.handleShowAdd = this.handleShowAdd.bind(this);
        this.handleCloseAdd = this.handleCloseAdd.bind(this);
        this.handleChangeAdd = this.handleChangeAdd.bind(this);
        this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
        this.handleShowUpdate = this.handleShowUpdate.bind(this);
        this.handleCloseUpdate = this.handleCloseUpdate.bind(this);
        this.handleChangeUpdate = this.handleChangeUpdate.bind(this);
        this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
        this.handleShowDelete = this.handleShowDelete.bind(this);
        this.handleCloseDelete = this.handleCloseDelete.bind(this);
        this.handleSubmitDelete = this.handleSubmitDelete.bind(this);
        this.handleShowVerify = this.handleShowVerify.bind(this);
        this.handleCloseVerify = this.handleCloseVerify.bind(this);
        this.verifyButton = this.verifyButton.bind(this);
        this.handleSubmitVerify = this.handleSubmitVerify.bind(this);
        this.handleShowRequest = this.handleShowRequest.bind(this);
        this.handleCloseRequest = this.handleCloseRequest.bind(this);
        this.requestButton = this.requestButton.bind(this);
        this.handleSubmitRequest = this.handleSubmitRequest.bind(this);
    }

    componentDidMount() {
        axios({
            method: "get",
            url: "/record",
            headers: { "x-auth": sessionStorage.getItem("token") }
        }).then((res) => {
            console.log(res.data.record);

            this.populateRecords(res.data.record);
        }).catch((err) => {
            console.log(err);

            this.props.history.push("/error");
        });

        axios({
            method: "get",
            url: "/users?userType=v",
            headers: { "x-auth": sessionStorage.getItem("token") }
        }).then((res) => {
            console.log(res.data);

            this.populateVerifiers(res.data.users);
        }).catch((err) => {
            console.log(err);

            this.props.history.push("/error");
        });
    }

    populateRecords(records) {
        const allergy = records.allergy.map((record) => {
            let owner = "";
            let verifier = "";
            const createdAt = new Date(record.createdAt).toGMTString();
            let updatedAt = "NIL";
            if (record.updatedAt) {
                updatedAt = new Date(record.updatedAt).toGMTString();
            }
            record.owner.forEach((element, i) => {
                owner += `${i + 1}. ${element} `;
            });
            record.verifier.forEach((element, i) => {
                verifier += `${i + 1}. ${element} `;
            });
            return (
                <tr key={record._id}>
                    <td>{record.data}</td>
                    <td>{owner}</td>
                    <td>{verifier}</td>
                    <td>{createdAt}</td>
                    <td>{updatedAt}</td>
                    <td><button className="btn btn-warning" type="button" onClick={() => this.handleShowUpdate("allergy", record._id)}><i className="fas fa-edit" /></button>
                    </td>
                    <td><button className="btn btn-danger" type="button" onClick={() => this.handleShowDelete("allergy", record._id)}><i className="fas fa-trash" /></button></td>
                </tr>
            );
        });

        const medication = records.medication.map((record) => {
            let owner = "";
            let verifier = "";
            const createdAt = new Date(record.createdAt).toGMTString();
            let updatedAt = "NIL";
            if (record.updatedAt) {
                updatedAt = new Date(record.updatedAt).toGMTString();
            }
            record.owner.forEach((element, i) => {
                owner += `${i + 1}. ${element} `;
            });
            record.verifier.forEach((element, i) => {
                verifier += `${i + 1}. ${element} `;
            });
            return (
                <tr key={record._id}>
                    <td>{record.data}</td>
                    <td>{owner}</td>
                    <td>{verifier}</td>
                    <td>{createdAt}</td>
                    <td>{updatedAt}</td>
                    <td><button className="btn btn-warning" type="button" onClick={() => this.handleShowUpdate("medication", record._id)}><i className="fas fa-edit" /></button>
                    </td>
                    <td><button className="btn btn-danger" type="button" onClick={() => this.handleShowDelete("medication", record._id)}><i className="fas fa-trash" /></button></td>
                </tr>
            );
        });

        const problem = records.problem.map((record) => {
            let owner = "";
            let verifier = "";
            const createdAt = new Date(record.createdAt).toGMTString();
            let updatedAt = "NIL";
            if (record.updatedAt) {
                updatedAt = new Date(record.updatedAt).toGMTString();
            }
            record.owner.forEach((element, i) => {
                owner += `${i + 1}. ${element} `;
            });
            record.verifier.forEach((element, i) => {
                verifier += `${i + 1}. ${element} `;
            });
            return (
                <tr key={record._id}>
                    <td>{record.data}</td>
                    <td>{owner}</td>
                    <td>{verifier}</td>
                    <td>{createdAt}</td>
                    <td>{updatedAt}</td>
                    <td><button className="btn btn-warning" type="button" onClick={() => this.handleShowUpdate("problem", record._id)}><i className="fas fa-edit" /></button>
                    </td>
                    <td><button className="btn btn-danger" type="button" onClick={() => this.handleShowDelete("problem", record._id)}><i className="fas fa-trash" /></button></td>
                </tr>
            );
        });

        const immunization = records.immunization.map((record) => {
            let owner = "";
            let verifier = "";
            const createdAt = new Date(record.createdAt).toGMTString();
            let updatedAt = "NIL";
            if (record.updatedAt) {
                updatedAt = new Date(record.updatedAt).toGMTString();
            }
            record.owner.forEach((element, i) => {
                owner += `${i + 1}. ${element} `;
            });
            record.verifier.forEach((element, i) => {
                verifier += `${i + 1}. ${element} `;
            });
            return (
                <tr key={record._id}>
                    <td>{record.data}</td>
                    <td>{owner}</td>
                    <td>{verifier}</td>
                    <td>{createdAt}</td>
                    <td>{updatedAt}</td>
                    <td><button className="btn btn-warning" type="button" onClick={() => this.handleShowUpdate("immunization", record._id)}><i className="fas fa-edit" /></button>
                    </td>
                    <td><button className="btn btn-danger" type="button" onClick={() => this.handleShowDelete("immunization", record._id)}><i className="fas fa-trash" /></button></td>
                </tr>
            );
        });

        const vitalSign = records.vital_sign.map((record) => {
            let owner = "";
            let verifier = "";
            const createdAt = new Date(record.createdAt).toGMTString();
            let updatedAt = "NIL";
            if (record.updatedAt) {
                updatedAt = new Date(record.updatedAt).toGMTString();
            }
            record.owner.forEach((element, i) => {
                owner += `${i + 1}. ${element} `;
            });
            record.verifier.forEach((element, i) => {
                verifier += `${i + 1}. ${element} `;
            });
            return (
                <tr key={record._id}>
                    <td>{record.data}</td>
                    <td>{owner}</td>
                    <td>{verifier}</td>
                    <td>{createdAt}</td>
                    <td>{updatedAt}</td>
                    <td><button className="btn btn-warning" type="button" onClick={() => this.handleShowUpdate("vital_sign", record._id)}><i className="fas fa-edit" /></button>
                    </td>
                    <td><button className="btn btn-danger" type="button" onClick={() => this.handleShowDelete("vital_sign", record._id)}><i className="fas fa-trash" /></button></td>
                </tr>
            );
        });

        const procedure = records.procedure.map((record) => {
            let owner = "";
            let verifier = "";
            const createdAt = new Date(record.createdAt).toGMTString();
            let updatedAt = "NIL";
            if (record.updatedAt) {
                updatedAt = new Date(record.updatedAt).toGMTString();
            }
            record.owner.forEach((element, i) => {
                owner += `${i + 1}. ${element} `;
            });
            record.verifier.forEach((element, i) => {
                verifier += `${i + 1}. ${element} `;
            });
            return (
                <tr key={record._id}>
                    <td>{record.data}</td>
                    <td>{owner}</td>
                    <td>{verifier}</td>
                    <td>{createdAt}</td>
                    <td>{updatedAt}</td>
                    <td><button className="btn btn-warning" type="button" onClick={() => this.handleShowUpdate("procedure", record._id)}><i className="fas fa-edit" /></button>
                    </td>
                    <td><button className="btn btn-danger" type="button" onClick={() => this.handleShowDelete("procedure", record._id)}><i className="fas fa-trash" /></button></td>
                </tr>
            );
        });

        this.setState({
            allergy,
            medication,
            problem,
            immunization,
            vitalSign,
            procedure
        });
    }

    selectVerifier(verifier) {
        if (verifier.isActive) {
            this.setState({
                verifierEmail: verifier.email
            });
        }
    }

    populateVerifiers(users) {
        const verifiers = users.map(user => (
            <tr key={Math.ceil(Math.random() * 100000)} onClick={() => this.selectVerifier(user)}>
                <td>{user.email}</td>
                <td>{(user.isActive) ? "TRUE" : "FALSE"}</td>
            </tr>
        ));

        this.setState({ verifiers });
    }

    handleShowAdd(event) {
        this.setState({
            showAdd: true,
            key: event
        });
    }

    handleCloseAdd() {
        this.setState({
            showAdd: false,
            key: "",
            valueAdd: ""
        });
    }

    handleChangeAdd(event) {
        this.setState({
            valueAdd: event.target.value
        });
    }

    handleSubmitAdd(event) {
        event.preventDefault();

        const body = {
            key: this.state.key,
            value: [this.state.valueAdd]
        };

        axios({
            method: "patch",
            url: "/record",
            data: body,
            headers: { "x-auth": sessionStorage.getItem("token") }
        }).then((res) => {
            console.log(res.data);

            this.handleCloseAdd();
            this.componentDidMount();
        }).catch((err) => {
            console.log(err);

            this.props.history.push("/error");
        });
    }

    handleShowUpdate(key, id) {
        this.setState({
            showUpdate: true,
            key,
            id
        });
    }

    handleCloseUpdate() {
        this.setState({
            showUpdate: false,
            key: "",
            id: "",
            valueUpdate: ""
        });
    }

    handleChangeUpdate(event) {
        this.setState({
            valueUpdate: event.target.value
        });
    }

    handleSubmitUpdate(event) {
        event.preventDefault();

        const body = {
            value: this.state.valueUpdate
        };

        axios({
            method: "patch",
            url: `/record/${this.state.id}`,
            data: body,
            headers: { "x-auth": sessionStorage.getItem("token") }
        }).then((res) => {
            console.log(res.data);

            this.handleCloseUpdate();
            this.componentDidMount();
        }).catch((err) => {
            console.log(err);

            this.props.history.push("/error");
        });
    }

    handleShowDelete(key, id) {
        this.setState({
            showDelete: true,
            key,
            id
        });
    }

    handleCloseDelete() {
        this.setState({
            showDelete: false,
            key: "",
            id: ""
        });
    }

    handleSubmitDelete(event) {
        event.preventDefault();

        axios({
            method: "delete",
            url: `/record/${this.state.id}`,
            headers: { "x-auth": sessionStorage.getItem("token") }
        }).then((res) => {
            console.log(res.data);

            this.handleCloseDelete();
            this.componentDidMount();
        }).catch((err) => {
            console.log(err);

            this.props.history.push("/error");
        });
    }

    handleShowVerify(key) {
        this.setState({
            showVerify: true,
            key
        });
    }

    handleCloseVerify() {
        this.setState({
            showVerify: false,
            key: "",
            verifierEmail: "NONE"
        });
    }

    verifyButton() {
        if (this.state.verifierEmail === "NONE") {
            return (
                <button id="records_seller_verify_modal_submit_button" className="btn btn-success" type="button" onClick={this.handleSubmitVerify} disabled>SELECT VERIFIER</button>
            );
        }

        return (
            <button id="records_seller_verify_modal_submit_button" className="btn btn-success" type="button" onClick={this.handleSubmitVerify}>REQUEST VERIFICATION</button>
        );
    }

    handleSubmitVerify(event) {
        event.preventDefault();

        const body = {
            key: this.state.key,
            verifierEmail: this.state.verifierEmail
        };

        axios({
            method: "post",
            url: "/verify/s",
            data: body,
            headers: { "x-auth": sessionStorage.getItem("token") }
        }).then((res) => {
            console.log(res.data);

            this.handleCloseVerify();
            this.componentDidMount();
        }).catch((err) => {
            console.log(err);

            this.props.history.push("/error");
        });
    }

    handleShowRequest(key) {
        this.setState({
            showRequest: true,
            key
        });
    }

    handleCloseRequest() {
        this.setState({
            showRequest: false,
            verifierEmail: "NONE"
        });
    }

    requestButton() {
        if (this.state.verifierEmail === "NONE") {
            return (
                <button id="records_seller_request_modal_submit_button" className="btn btn-success" type="button" onClick={this.handleSubmitRequest} disabled>SELECT VERIFIER</button>
            );
        }

        return (
            <button id="records_seller_request_modal_submit_button" className="btn btn-success" type="button" onClick={this.handleSubmitRequest}>REQUEST DATA</button>
        );
    }

    handleSubmitRequest(event) {
        event.preventDefault();

        const body = {
            key: this.state.key,
            verifierEmail: this.state.verifierEmail
        };

        axios({
            method: "post",
            url: "/request/s",
            data: body,
            headers: { "x-auth": sessionStorage.getItem("token") }
        }).then((res) => {
            console.log(res.data);

            this.handleCloseRequest();
            this.componentDidMount();
        }).catch((err) => {
            console.log(err);

            this.props.history.push("/error");
        });
    }

    render() {
        return (
            <div>
                <div id="records_seller">
                    <Modal show={this.state.showAdd} onHide={this.handleCloseAdd}>
                        <Modal.Header closeButton>
                            <Modal.Title>ADD {this.state.key.toUpperCase()}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <label htmlFor="records_seller_add_modal">
                                <input id="records_seller_add_modal" className="form-control" value={this.state.valueAdd} type="text" placeholder="Enter record to add" onChange={this.handleChangeAdd} />
                            </label>
                        </Modal.Body>
                        <Modal.Footer>
                            <button id="records_seller_add_modal_close_button" className="btn btn-danger" type="button" onClick={this.handleCloseAdd}>CLOSE</button>
                            <button id="records_seller_add_modal_save_button" className="btn btn-success" type="button" onClick={this.handleSubmitAdd}>SAVE</button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={this.state.showUpdate} onHide={this.handleCloseUpdate}>
                        <Modal.Header closeButton>
                            <Modal.Title>UPDATE {this.state.key.toUpperCase()}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <label htmlFor="records_seller_update_modal">
                                <input id="records_seller_update_modal" className="form-control" value={this.state.valueUpdate} type="text" placeholder="Enter record to update" onChange={this.handleChangeUpdate} />
                            </label>
                        </Modal.Body>
                        <Modal.Footer>
                            <button id="records_seller_update_modal_close_button" className="btn btn-danger" type="button" onClick={this.handleCloseUpdate}>CLOSE</button>
                            <button id="records_seller_update_modal_save_button" className="btn btn-success" type="button" onClick={this.handleSubmitUpdate}>SAVE</button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={this.state.showDelete} onHide={this.handleCloseDelete}>
                        <Modal.Header closeButton>
                            <Modal.Title>DELETE {this.state.key.toUpperCase()}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h3>Are you sure want to delete record?</h3>
                        </Modal.Body>
                        <Modal.Footer>
                            <button id="records_seller_delete_modal_close_button" className="btn btn-danger" type="button" onClick={this.handleCloseDelete}>CLOSE</button>
                            <button id="records_seller_delete_modal_save_button" className="btn btn-success" type="button" onClick={this.handleSubmitDelete}>YES</button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={this.state.showVerify} onHide={this.handleCloseVerify}>
                        <Modal.Header closeButton>
                            <Modal.Title>VERIFY {this.state.key.toUpperCase()}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <table className="text-center table table-hover">
                                <thead>
                                    <tr>
                                        <th className="text-center"><h4>VERIFIER</h4></th>
                                        <th className="text-center"><h4>ACTIVATED</h4></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.verifiers}
                                </tbody>
                            </table>
                            <hr />
                            <h4>VERIFIER: {this.state.verifierEmail}</h4>
                        </Modal.Body>
                        <Modal.Footer>
                            <button id="records_seller_verify_modal_close_button" className="btn btn-danger" type="button" onClick={this.handleCloseVerify}>CLOSE</button>
                            { this.verifyButton() }
                        </Modal.Footer>
                    </Modal>
                    <Modal show={this.state.showRequest} onHide={this.handleCloseRequest}>
                        <Modal.Header closeButton>
                            <Modal.Title>REQUEST {this.state.key.toUpperCase()}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <table className="text-center table table-hover">
                                <thead>
                                    <tr>
                                        <th className="text-center"><h4>VERIFIER</h4></th>
                                        <th className="text-center"><h4>ACTIVATED</h4></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.verifiers}
                                </tbody>
                            </table>
                            <hr />
                            <h4>VERIFIER: {this.state.verifierEmail}</h4>
                        </Modal.Body>
                        <Modal.Footer>
                            <button id="records_seller_request_modal_close_button" className="btn btn-danger" type="button" onClick={this.handleCloseRequest}>CLOSE</button>
                            { this.requestButton() }
                        </Modal.Footer>
                    </Modal>
                    <div id="records_seller_allergy">
                        <h4>
                            ALLERGY
                            <button id="records_seller_add_allergy_button" className="btn btn-success" type="button" onClick={() => this.handleShowAdd("allergy")}>ADD <i className="fas fa-plus" /></button>
                            <button id="records_seller_verify_allergy_button" className="btn btn-info" type="button" onClick={() => this.handleShowVerify("allergy")}>VERIFY <i className="fas fa-check" /></button>
                            <button id="records_seller_request_allergy_button" className="btn btn-primary" type="button" onClick={() => this.handleShowRequest("allergy")}>REQUEST <i className="fas fa-paper-plane" /></button>
                        </h4>
                        <table className="text-center table table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center"><h4>DATA</h4></th>
                                    <th className="text-center"><h4>OWNER</h4></th>
                                    <th className="text-center"><h4>VERIFIER</h4></th>
                                    <th className="text-center"><h4>CREATED AT</h4></th>
                                    <th className="text-center"><h4>UPDATED AT</h4></th>
                                    <th className="text-center"><h4><i className="fas fa-edit" /></h4></th>
                                    <th className="text-center"><h4><i className="fas fa-trash" /></h4></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.allergy}
                            </tbody>
                        </table>
                    </div>
                    <div id="records_seller_medication">
                        <h4>
                            MEDICATION
                            <button id="records_seller_add_medication_button" className="btn btn-success" type="button" onClick={() => this.handleShowAdd("medication")}>ADD <i className="fas fa-plus" /></button>
                            <button id="records_seller_verify_medication_button" className="btn btn-info" type="button" onClick={() => this.handleShowVerify("medication")}>VERIFY <i className="fas fa-check" /></button>
                            <button id="records_seller_request_medication_button" className="btn btn-primary" type="button" onClick={() => this.handleShowRequest("medication")}>REQUEST <i className="fas fa-paper-plane" /></button>
                        </h4>
                        <table className="text-center table table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center"><h4>DATA</h4></th>
                                    <th className="text-center"><h4>OWNER</h4></th>
                                    <th className="text-center"><h4>VERIFIER</h4></th>
                                    <th className="text-center"><h4>CREATED AT</h4></th>
                                    <th className="text-center"><h4>UPDATED AT</h4></th>
                                    <th className="text-center"><h4><i className="fas fa-edit" /></h4></th>
                                    <th className="text-center"><h4><i className="fas fa-trash" /></h4></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.medication}
                            </tbody>
                        </table>
                    </div>
                    <div id="records_seller_problem">
                        <h4>
                            PROBLEM
                            <button id="records_seller_add_problem_button" className="btn btn-success" type="button" onClick={() => this.handleShowAdd("problem")}>ADD <i className="fas fa-plus" /></button>
                            <button id="records_seller_verify_problem_button" className="btn btn-info" type="button" onClick={() => this.handleShowVerify("problem")}>VERIFY <i className="fas fa-check" /></button>
                            <button id="records_seller_request_problem_button" className="btn btn-primary" type="button" onClick={() => this.handleShowRequest("problem")}>REQUEST <i className="fas fa-paper-plane" /></button>
                        </h4>
                        <table className="text-center table table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center"><h4>DATA</h4></th>
                                    <th className="text-center"><h4>OWNER</h4></th>
                                    <th className="text-center"><h4>VERIFIER</h4></th>
                                    <th className="text-center"><h4>CREATED AT</h4></th>
                                    <th className="text-center"><h4>UPDATED AT</h4></th>
                                    <th className="text-center"><h4><i className="fas fa-edit" /></h4></th>
                                    <th className="text-center"><h4><i className="fas fa-trash" /></h4></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.problem}
                            </tbody>
                        </table>
                    </div>
                    <div id="records_seller_immunization">
                        <h4>
                            IMMUNIZATION
                            <button id="records_seller_add_immunization_button" className="btn btn-success" type="button" onClick={() => this.handleShowAdd("immunization")}>ADD <i className="fas fa-plus" /></button>
                            <button id="records_seller_verify_immunization_button" className="btn btn-info" type="button" onClick={() => this.handleShowVerify("immunization")}>VERIFY <i className="fas fa-check" /></button>
                            <button id="records_seller_request_immunization_button" className="btn btn-primary" type="button" onClick={() => this.handleShowRequest("immunization")}>REQUEST <i className="fas fa-paper-plane" /></button>
                        </h4>
                        <table className="text-center table table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center"><h4>DATA</h4></th>
                                    <th className="text-center"><h4>OWNER</h4></th>
                                    <th className="text-center"><h4>VERIFIER</h4></th>
                                    <th className="text-center"><h4>CREATED AT</h4></th>
                                    <th className="text-center"><h4>UPDATED AT</h4></th>
                                    <th className="text-center"><h4><i className="fas fa-edit" /></h4></th>
                                    <th className="text-center"><h4><i className="fas fa-trash" /></h4></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.immunization}
                            </tbody>
                        </table>
                    </div>
                    <div id="records_seller_vital_sign">
                        <h4>
                            VITAL SIGN
                            <button id="records_seller_add_vital_sign_button" className="btn btn-success" type="button" onClick={() => this.handleShowAdd("vital_sign")}>ADD <i className="fas fa-plus" /></button>
                            <button id="records_seller_verify_vital_sign_button" className="btn btn-info" type="button" onClick={() => this.handleShowVerify("vital_sign")}>VERIFY <i className="fas fa-check" /></button>
                            <button id="records_seller_request_vital_sign_button" className="btn btn-primary" type="button" onClick={() => this.handleShowRequest("vital_sign")}>REQUEST <i className="fas fa-paper-plane" /></button>
                        </h4>
                        <table className="text-center table table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center"><h4>DATA</h4></th>
                                    <th className="text-center"><h4>OWNER</h4></th>
                                    <th className="text-center"><h4>VERIFIER</h4></th>
                                    <th className="text-center"><h4>CREATED AT</h4></th>
                                    <th className="text-center"><h4>UPDATED AT</h4></th>
                                    <th className="text-center"><h4><i className="fas fa-edit" /></h4></th>
                                    <th className="text-center"><h4><i className="fas fa-trash" /></h4></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.vitalSign}
                            </tbody>
                        </table>
                    </div>
                    <div id="records_seller_procedure">
                        <h4>
                            PROCEDURE
                            <button id="records_seller_add_procedure_button" className="btn btn-success" type="button" onClick={() => this.handleShowAdd("procedure")}>ADD <i className="fas fa-plus" /></button>
                            <button id="records_seller_verify_procedure_button" className="btn btn-info" type="button" onClick={key => this.handleShowVerify("procedure")}>VERIFY <i className="fas fa-check" /></button>
                            <button id="records_seller_request_procedure_button" className="btn btn-primary" type="button" onClick={key => this.handleShowRequest("procedure")}>REQUEST <i className="fas fa-paper-plane" /></button>
                        </h4>
                        <table className="text-center table table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center"><h4>DATA</h4></th>
                                    <th className="text-center"><h4>OWNER</h4></th>
                                    <th className="text-center"><h4>VERIFIER</h4></th>
                                    <th className="text-center"><h4>CREATED AT</h4></th>
                                    <th className="text-center"><h4>UPDATED AT</h4></th>
                                    <th className="text-center"><h4><i className="fas fa-edit" /></h4></th>
                                    <th className="text-center"><h4><i className="fas fa-trash" /></h4></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.procedure}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Records);
