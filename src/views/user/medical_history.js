import React from "react";
import { Modal, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import axios from "axios";

import baseURL from "../connect/connect";

// Axios
axios.defaults.baseURL = baseURL;

class MedicalHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allergy: <tr />,
            medication: <tr />,
            problem: <tr />,
            immunization: <tr />,
            vitalSign: <tr />,
            procedure: <tr />,
            show: false,
            modalHeading: "",
            submit: "",
            click: ""
        };
        this.populate = this.populate.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios({
            method: "get",
            url: "/record",
            headers: { "x-auth": localStorage.getItem("token") }
        }).then((res) => {
            localStorage.setItem("records", JSON.stringify(res.data.record[0]));
            this.populate(res.data.record[0]);
        }).catch((err) => {
            console.log(err);
            this.props.history.push("/not_found");
        });
    }

    populate(records) {
        const allergy = records.allergy.map((record) => {
            return (
                <tr key={Math.ceil(Math.random() * 100000)}>
                    <td>{record}</td>
                </tr>
            );
        });
        const medication = records.medication.map((record) => {
            return (
                <tr key={Math.ceil(Math.random() * 100000)}>
                    <td>{record}</td>
                </tr>
            );
        });
        const problem = records.problem.map((record) => {
            return (
                <tr key={Math.ceil(Math.random() * 100000)}>
                    <td>{record}</td>
                </tr>
            );
        });
        const immunization = records.immunization.map((record) => {
            return (
                <tr key={Math.ceil(Math.random() * 100000)}>
                    <td>{record}</td>
                </tr>
            );
        });
        const vitalSign = records.vital_sign.map((record) => {
            return (
                <tr key={Math.ceil(Math.random() * 100000)}>
                    <td>{record}</td>
                </tr>
            );
        });
        const procedure = records.procedure.map((record) => {
            return (
                <tr key={Math.ceil(Math.random() * 100000)}>
                    <td>{record}</td>
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

    handleClose() {
        this.setState({
            show: false
        });
    }

    handleChange(event) {
        this.setState({
            submit: event.target.value
        });
    }

    handleClick(event) {
        let heading;
        if (event === "vital_sign") {
            heading = "VITAL SIGN";
        } else {
            heading = event.toUpperCase();
        }
        this.setState({
            show: true,
            click: event,
            modalHeading: heading
        });
    }

    handleSubmit() {
        const body = {
            type: this.state.click,
            record: this.state.submit
        };
        axios({
            method: "patch",
            url: "/record",
            data: body,
            headers: { "x-auth": localStorage.getItem("token") }
        }).then((res) => {
            alert(`Record Submitted at ${res.data.enteredAt}.`);
            this.setState({
                submit: ""
            });
            this.handleClose();
            this.componentDidMount();
        }).catch((err) => {
            console.log(err);
            this.props.history.push("/not_found");
        });
    }

    render() {
        return (
            <div>
                <div id="bg-div" className="bg-div-1" />
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.modalHeading}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h3>Enter new record: </h3>
                        <input value={this.state.submit} type="text" placeholder="Record" onChange={this.handleChange} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div id="medical_history">
                    <div id="allergy">
                        <table className="text-center table table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center align-middle">
                                        ALLERGY
                                        <button type="button" onClick={() => this.handleClick("allergy")}><i className="fa fa-plus" /></button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.allergy}
                            </tbody>
                        </table>
                    </div>
                    <div id="medication">
                        <table className="text-center table table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center align-middle">
                                        MEDICATION
                                        <button type="button" onClick={() => this.handleClick("medication")}><i className="fa fa-plus" /></button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.medication}
                            </tbody>
                        </table>
                    </div>
                    <div id="problem">
                        <table className="text-center table table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center align-middle">
                                        PROBLEM
                                        <button type="button" onClick={() => this.handleClick("problem")}><i className="fa fa-plus" /></button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.problem}
                            </tbody>
                        </table>
                    </div>
                    <div id="immunization">
                        <table className="text-center table table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center align-middle">
                                        IMMUNIZATION
                                        <button type="button" onClick={() => this.handleClick("immunization")}><i className="fa fa-plus" /></button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.immunization}
                            </tbody>
                        </table>
                    </div>
                    <div id="vital_sign">
                        <table className="text-center table table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center align-middle">
                                        VITAL SIGN
                                        <button type="button" onClick={() => this.handleClick("vital_sign")}><i className="fa fa-plus" /></button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.vitalSign}
                            </tbody>
                        </table>
                    </div>
                    <div id="procedure">
                        <table className="text-center table table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center align-middle">
                                        PROCEDURE
                                        <button type="button" onClick={() => this.handleClick("procedure")}><i className="fa fa-plus" /></button>
                                    </th>
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

export default withRouter(MedicalHistory);