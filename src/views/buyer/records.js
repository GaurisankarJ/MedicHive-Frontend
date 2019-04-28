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
            showDelete: false,
            showVerifiers: false,
            showRequest: false,
            key: "",
            id: ""
        };
        this.populateRecords = this.populateRecords.bind(this);
        this.handleShowDelete = this.handleShowDelete.bind(this);
        this.handleCloseDelete = this.handleCloseDelete.bind(this);
        this.handleSubmitDelete = this.handleSubmitDelete.bind(this);
        this.handleShowVerifiers = this.handleShowVerifiers.bind(this);
        this.handleCloseVerifiers = this.handleCloseVerifiers.bind(this);
        this.handleShowRequest = this.handleShowRequest.bind(this);
        this.handleCloseRequest = this.handleCloseRequest.bind(this);
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

    populateVerifiers(users) {
        const verifiers = users.map(user => (
            <tr key={Math.ceil(Math.random() * 100000)} onClick={() => this.selectVerifier(user)}>
                <td>{user.email}</td>
                <td>{(user.isActive) ? "TRUE" : "FALSE"}</td>
            </tr>
        ));

        this.setState({ verifiers });
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

    handleShowVerifiers() {
        this.setState({
            showVerifiers: true
        });
    }

    handleCloseVerifiers() {
        this.setState({
            showVerifiers: false
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
            showRequest: false
        });
    }

    handleSubmitRequest(event) {
        event.preventDefault();

        const body = {
            key: this.state.key
        };

        axios({
            method: "post",
            url: "/request/b",
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
                <div id="records_buyer">
                    <Modal show={this.state.showDelete} onHide={this.handleCloseDelete}>
                        <Modal.Header closeButton>
                            <Modal.Title>DELETE {this.state.key.toUpperCase()}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h3>Are you sure want to delete record?</h3>
                        </Modal.Body>
                        <Modal.Footer>
                            <button id="records_buyer_delete_modal_close_button" className="btn btn-danger" type="button" onClick={this.handleCloseDelete}>CLOSE</button>
                            <button id="records_buyer_delete_modal_save_button" className="btn btn-success" type="button" onClick={this.handleSubmitDelete}>YES</button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={this.state.showVerifiers} onHide={this.handleCloseVerifiers}>
                        <Modal.Header closeButton>
                            <Modal.Title>VERIFIERS LIST</Modal.Title>
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
                        </Modal.Body>
                        <Modal.Footer>
                            <button id="records_buyer_delete_modal_close_button" className="btn btn-danger" type="button" onClick={this.handleCloseVerifiers}>CLOSE</button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={this.state.showRequest} onHide={this.handleCloseRequest}>
                        <Modal.Header closeButton>
                            <Modal.Title>REQUEST {this.state.key.toUpperCase()}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Do you want to request {this.state.key}?
                        </Modal.Body>
                        <Modal.Footer>
                            <button id="records_buyer_request_modal_close_button" className="btn btn-danger" type="button" onClick={this.handleCloseRequest}>CLOSE</button>
                            <button id="records_buyer_request_modal_submit_button" className="btn btn-success" type="button" onClick={this.handleSubmitRequest}>REQUEST DATA</button>
                        </Modal.Footer>
                    </Modal>
                    <h4>VERIFIERS:</h4>
                    <button id="records_buyer_show_verifiers_button" className="btn btn-block btn-primary" type="button" onClick={() => this.handleShowVerifiers("allergy")}>SHOW VERIFIERS</button>
                    <div id="records_buyer_allergy">
                        <h4>
                            ALLERGY
                            <button id="records_buyer_request_allergy_button" className="btn btn-primary" type="button" onClick={() => this.handleShowRequest("allergy")}>REQUEST <i className="fas fa-paper-plane" /></button>
                        </h4>
                        <table className="text-center table table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center"><h4>DATA</h4></th>
                                    <th className="text-center"><h4>OWNER</h4></th>
                                    <th className="text-center"><h4>VERIFIER</h4></th>
                                    <th className="text-center"><h4>CREATED AT</h4></th>
                                    <th className="text-center"><h4>UPDATED AT</h4></th>
                                    <th className="text-center"><h4><i className="fas fa-trash" /></h4></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.allergy}
                            </tbody>
                        </table>
                    </div>
                    <div id="records_buyer_medication">
                        <h4>
                            MEDICATION
                            <button id="records_buyer_request_medication_button" className="btn btn-primary" type="button" onClick={() => this.handleShowRequest("medication")}>REQUEST <i className="fas fa-paper-plane" /></button>
                        </h4>
                        <table className="text-center table table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center"><h4>DATA</h4></th>
                                    <th className="text-center"><h4>OWNER</h4></th>
                                    <th className="text-center"><h4>VERIFIER</h4></th>
                                    <th className="text-center"><h4>CREATED AT</h4></th>
                                    <th className="text-center"><h4>UPDATED AT</h4></th>
                                    <th className="text-center"><h4><i className="fas fa-trash" /></h4></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.medication}
                            </tbody>
                        </table>
                    </div>
                    <div id="records_buyer_problem">
                        <h4>
                            PROBLEM
                            <button id="records_buyer_request_problem_button" className="btn btn-primary" type="button" onClick={() => this.handleShowRequest("problem")}>REQUEST <i className="fas fa-paper-plane" /></button>
                        </h4>
                        <table className="text-center table table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center"><h4>DATA</h4></th>
                                    <th className="text-center"><h4>OWNER</h4></th>
                                    <th className="text-center"><h4>VERIFIER</h4></th>
                                    <th className="text-center"><h4>CREATED AT</h4></th>
                                    <th className="text-center"><h4>UPDATED AT</h4></th>
                                    <th className="text-center"><h4><i className="fas fa-trash" /></h4></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.problem}
                            </tbody>
                        </table>
                    </div>
                    <div id="records_buyer_immunization">
                        <h4>
                            IMMUNIZATION
                            <button id="records_buyer_request_immunization_button" className="btn btn-primary" type="button" onClick={() => this.handleShowRequest("immunization")}>REQUEST <i className="fas fa-paper-plane" /></button>
                        </h4>
                        <table className="text-center table table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center"><h4>DATA</h4></th>
                                    <th className="text-center"><h4>OWNER</h4></th>
                                    <th className="text-center"><h4>VERIFIER</h4></th>
                                    <th className="text-center"><h4>CREATED AT</h4></th>
                                    <th className="text-center"><h4>UPDATED AT</h4></th>
                                    <th className="text-center"><h4><i className="fas fa-trash" /></h4></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.immunization}
                            </tbody>
                        </table>
                    </div>
                    <div id="records_buyer_vital_sign">
                        <h4>
                            VITAL SIGN
                            <button id="records_buyer_request_vital_sign_button" className="btn btn-primary" type="button" onClick={() => this.handleShowRequest("vital_sign")}>REQUEST <i className="fas fa-paper-plane" /></button>
                        </h4>
                        <table className="text-center table table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center"><h4>DATA</h4></th>
                                    <th className="text-center"><h4>OWNER</h4></th>
                                    <th className="text-center"><h4>VERIFIER</h4></th>
                                    <th className="text-center"><h4>CREATED AT</h4></th>
                                    <th className="text-center"><h4>UPDATED AT</h4></th>
                                    <th className="text-center"><h4><i className="fas fa-trash" /></h4></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.vitalSign}
                            </tbody>
                        </table>
                    </div>
                    <div id="records_buyer_procedure">
                        <h4>
                            PROCEDURE
                            <button id="records_buyer_request_procedure_button" className="btn btn-primary" type="button" onClick={() => this.handleShowRequest("procedure")}>REQUEST <i className="fas fa-paper-plane" /></button>
                        </h4>
                        <table className="text-center table table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center"><h4>DATA</h4></th>
                                    <th className="text-center"><h4>OWNER</h4></th>
                                    <th className="text-center"><h4>VERIFIER</h4></th>
                                    <th className="text-center"><h4>CREATED AT</h4></th>
                                    <th className="text-center"><h4>UPDATED AT</h4></th>
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
