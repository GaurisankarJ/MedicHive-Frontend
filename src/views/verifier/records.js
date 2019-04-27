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
            sellers: <tr />,
            sellerEmail: "NONE",
            showAdd: false,
            showUpdate: false,
            showDelete: false,
            showSend: false,
            key: "",
            id: "",
            valueAdd: "",
            valueUpdate: ""
        };
        this.populateRecords = this.populateRecords.bind(this);
        this.populateSellers = this.populateSellers.bind(this);
        this.selectSeller = this.selectSeller.bind(this);
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
        this.handleShowSend = this.handleShowSend.bind(this);
        this.handleCloseSend = this.handleCloseSend.bind(this);
        this.sendButton = this.sendButton.bind(this);
        this.handleSubmitSend = this.handleSubmitSend.bind(this);
    }

    componentDidMount() {
        axios({
            method: "get",
            url: "/record",
            headers: { "x-auth": localStorage.getItem("token") }
        }).then((res) => {
            console.log(res.data.record);

            this.populateRecords(res.data.record);
        }).catch((err) => {
            console.log(err);

            this.props.history.push("/error");
        });

        axios({
            method: "get",
            url: "/users?userType=s",
            headers: { "x-auth": localStorage.getItem("token") }
        }).then((res) => {
            console.log(res.data);

            this.populateSellers(res.data.users);
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

    selectSeller(seller) {
        if (seller.isActive) {
            this.setState({
                sellerEmail: seller.email
            });
        }
    }

    populateSellers(users) {
        const sellers = users.map(user => (
            <tr key={Math.ceil(Math.random() * 100000)} onClick={() => this.selectSeller(user)}>
                <td>{user.email}</td>
                <td>{(user.isActive) ? "TRUE" : "FALSE"}</td>
            </tr>
        ));

        this.setState({ sellers });
    }

    handleShowAdd(key) {
        this.setState({
            showAdd: true,
            key,
            sellerEmail: "NONE"
        });
    }

    handleCloseAdd() {
        this.setState({
            showAdd: false,
            key: "",
            valueAdd: "",
            sellerEmail: ""
        });
    }

    handleChangeAdd(event) {
        this.setState({
            valueAdd: event.target.value
        });
    }

    addButton() {
        if (this.state.sellerEmail === "NONE") {
            return (
                <button id="records_verifier_add_modal_submit_button" className="btn btn-success" type="button" onClick={this.handleSubmitAdd} disabled>SELECT SELLER</button>
            );
        }

        return (
            <button id="records_verifier_add_modal_submit_button" className="btn btn-success" type="button" onClick={this.handleSubmitAdd}>SAVE</button>
        );
    }

    handleSubmitAdd(event) {
        event.preventDefault();

        const body = {
            key: this.state.key,
            value: [this.state.valueAdd],
            sellerEmail: this.state.sellerEmail
        };

        axios({
            method: "patch",
            url: "/record",
            data: body,
            headers: { "x-auth": localStorage.getItem("token") }
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
            headers: { "x-auth": localStorage.getItem("token") }
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
            headers: { "x-auth": localStorage.getItem("token") }
        }).then((res) => {
            console.log(res.data);

            this.handleCloseDelete();
            this.componentDidMount();
        }).catch((err) => {
            console.log(err);

            this.props.history.push("/error");
        });
    }

    handleShowSend(key) {
        this.setState({
            showSend: true,
            key
        });
    }

    handleCloseSend() {
        this.setState({
            showSend: false,
            sellerEmail: "NONE"
        });
    }

    sendButton() {
        if (this.state.sellerEmail === "NONE") {
            return (
                <button id="records_verifier_send_modal_submit_button" className="btn btn-success" type="button" onClick={this.handleSubmitSend} disabled>SELECT SELLER</button>
            );
        }

        return (
            <button id="records_verifier_send_modal_submit_button" className="btn btn-success" type="button" onClick={this.handleSubmitSend}>SEND DATA</button>
        );
    }

    handleSubmitSend(event) {
        event.preventDefault();

        const body = {
            key: this.state.key,
            sellerEmail: this.state.sellerEmail
        };

        axios({
            method: "post",
            url: "/share/v",
            data: body,
            headers: { "x-auth": localStorage.getItem("token") }
        }).then((res) => {
            console.log(res.data);

            this.handleCloseSend();
            this.componentDidMount();
        }).catch((err) => {
            console.log(err);

            this.props.history.push("/error");
        });
    }

    render() {
        return (
            <div>
                <div id="records_verifier">
                    <Modal show={this.state.showAdd} onHide={this.handleCloseAdd}>
                        <Modal.Header closeButton>
                            <Modal.Title>ADD {this.state.key.toUpperCase()}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <table className="text-center table table-hover">
                                <thead>
                                    <tr>
                                        <th className="text-center"><h4>SELLER</h4></th>
                                        <th className="text-center"><h4>ACTIVATED</h4></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.sellers}
                                </tbody>
                            </table>
                            <hr />
                            <h4>SELLER: {this.state.sellerEmail}</h4>
                            <hr />
                            <label htmlFor="records_verifier_add_modal">
                                <input id="records_verifier_add_modal" className="form-control" value={this.state.valueAdd} type="text" placeholder="Enter record to add" onChange={this.handleChangeAdd} />
                            </label>
                        </Modal.Body>
                        <Modal.Footer>
                            <button id="records_verifier_add_modal_close_button" className="btn btn-danger" type="button" onClick={this.handleCloseAdd}>CLOSE</button>
                            {this.addButton()}
                        </Modal.Footer>
                    </Modal>
                    <Modal show={this.state.showUpdate} onHide={this.handleCloseUpdate}>
                        <Modal.Header closeButton>
                            <Modal.Title>UPDATE {this.state.key.toUpperCase()}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <label htmlFor="records_verifier_update_modal">
                                <input id="records_verifier_update_modal" className="form-control" value={this.state.valueUpdate} type="text" placeholder="Enter record to update" onChange={this.handleChangeUpdate} />
                            </label>
                        </Modal.Body>
                        <Modal.Footer>
                            <button id="records_verifier_update_modal_close_button" className="btn btn-danger" type="button" onClick={this.handleCloseUpdate}>CLOSE</button>
                            <button id="records_verifier_update_modal_save_button" className="btn btn-success" type="button" onClick={this.handleSubmitUpdate}>SAVE</button>
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
                            <button id="records_verifier_delete_modal_close_button" className="btn btn-danger" type="button" onClick={this.handleCloseDelete}>CLOSE</button>
                            <button id="records_verifier_delete_modal_save_button" className="btn btn-success" type="button" onClick={this.handleSubmitDelete}>YES</button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={this.state.showSend} onHide={this.handleCloseSend}>
                        <Modal.Header closeButton>
                            <Modal.Title>SEND {this.state.key.toUpperCase()}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <table className="text-center table table-hover">
                                <thead>
                                    <tr>
                                        <th className="text-center"><h4>SELLER</h4></th>
                                        <th className="text-center"><h4>ACTIVATED</h4></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.sellers}
                                </tbody>
                            </table>
                            <hr />
                            <h4>SELLER: {this.state.sellerEmail}</h4>
                        </Modal.Body>
                        <Modal.Footer>
                            <button id="records_verifier_send_modal_close_button" className="btn btn-danger" type="button" onClick={this.handleCloseSend}>CLOSE</button>
                            { this.sendButton() }
                        </Modal.Footer>
                    </Modal>
                    <div id="records_verifier_allergy">
                        <h4>
                            ALLERGY
                            <button id="records_verifier_add_allergy_button" className="btn btn-success" type="button" onClick={() => this.handleShowAdd("allergy")}>ADD <i className="fas fa-plus" /></button>
                            <button id="records_verifier_send_allergy_button" className="btn btn-primary" type="button" onClick={() => this.handleShowSend("allergy")}>SEND <i className="fas fa-paper-plane" /></button>
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
                    <div id="records_verifier_medication">
                        <h4>
                            MEDICATION
                            <button id="records_verifier_add_medication_button" className="btn btn-success" type="button" onClick={() => this.handleShowAdd("medication")}>ADD <i className="fas fa-plus" /></button>
                            <button id="records_verifier_send_medication_button" className="btn btn-primary" type="button" onClick={() => this.handleShowSend("medication")}>SEND <i className="fas fa-paper-plane" /></button>
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
                    <div id="records_verifier_problem">
                        <h4>
                            PROBLEM
                            <button id="records_verifier_add_problem_button" className="btn btn-success" type="button" onClick={() => this.handleShowAdd("problem")}>ADD <i className="fas fa-plus" /></button>
                            <button id="records_verifier_send_problem_button" className="btn btn-primary" type="button" onClick={() => this.handleShowSend("problem")}>SEND <i className="fas fa-paper-plane" /></button>
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
                    <div id="records_verifier_immunization">
                        <h4>
                            IMMUNIZATION
                            <button id="records_verifier_add_immunization_button" className="btn btn-success" type="button" onClick={() => this.handleShowAdd("immunization")}>ADD <i className="fas fa-plus" /></button>
                            <button id="records_verifier_send_immunization_button" className="btn btn-primary" type="button" onClick={() => this.handleShowSend("immunization")}>SEND <i className="fas fa-paper-plane" /></button>
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
                    <div id="records_verifier_vital_sign">
                        <h4>
                            VITAL SIGN
                            <button id="records_verifier_add_vital_sign_button" className="btn btn-success" type="button" onClick={() => this.handleShowAdd("vital_sign")}>ADD <i className="fas fa-plus" /></button>
                            <button id="records_verifier_send_vital_sign_button" className="btn btn-primary" type="button" onClick={() => this.handleShowSend("vital_sign")}>SEND <i className="fas fa-paper-plane" /></button>
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
                    <div id="records_verifier_procedure">
                        <h4>
                            PROCEDURE
                            <button id="records_verifier_add_procedure_button" className="btn btn-success" type="button" onClick={() => this.handleShowAdd("procedure")}>ADD <i className="fas fa-plus" /></button>
                            <button id="records_verifier_send_procedure_button" className="btn btn-primary" type="button" onClick={() => this.handleShowSend("procedure")}>SEND <i className="fas fa-paper-plane" /></button>
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
