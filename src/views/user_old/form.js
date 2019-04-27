import React from "react";
import { withRouter } from "react-router-dom";
import { Grid, Row, Col } from "react-bootstrap";
// import $ from "jquery";
import axios from "axios";

import baseURL from "../connect/connect";

// Axios
axios.defaults.baseURL = baseURL;

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disease: "",
            medication: "",
            doctor: "",
            doc: null
        };
        this.handleChangeDisease = this.handleChangeDisease.bind(this);
        this.handleChangeMedication = this.handleChangeMedication.bind(this);
        this.handleChangeDoctor = this.handleChangeDoctor.bind(this);
        this.handleChangeDocument = this.handleChangeDocument.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.addFile = this.addFile.bind(this);
    }

    handleChangeDisease(event) {
        this.setState({
            disease: event.target.value
        });
    }

    handleChangeMedication(event) {
        this.setState({
            medication: event.target.value
        });
    }

    handleChangeDoctor(event) {
        this.setState({
            doctor: event.target.value
        });
    }

    handleChangeDocument(event) {
        this.setState({
            doc: event.target.files[0]
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const body = {
            disease: this.state.disease,
            medication: this.state.medication,
            doctor: this.state.doctor
        };
        axios({
            method: "post",
            url: "/record",
            data: body,
            headers: { "x-auth": localStorage.getItem("token") }
        }).then((res) => {
            alert(`Record Submitted at ${res.data.enteredAt}.`);
            this.props.history.push("/success");
        }).catch((err) => {
            this.props.history.push("/not_found");
        });
    }

    handleUpload(event) {
        event.preventDefault();
        if (this.state.doc) {
            const document = new FormData();
            document.append("file", this.state.doc, this.state.doc.name);
            axios({
                method: "post",
                url: "/upload",
                data: document,
                headers: { "x-auth": localStorage.getItem("token"), "x-type": "HELLO" }
            }).then((res) => {
                alert(`Document "${res.data.name}" Submitted at ${new Date().toString()}.`);
                this.props.history.push("/success");
            }).catch((err) => {
                this.props.history.push("/not_found");
            });
        } else {
            alert("Select a document to upload!");
        }
    }

    // addFile() {
    //     $("#file").trigger("click");
    // }

    render() {
        return (
            <div>
                <div id="bg-div" className="bg-div-1" />
                <div id="form">
                    <div className="row form">
                        <div className="col-md-6">
                            <form id="record_form" className="formbody" onSubmit={this.handleSubmit}>
                                <Grid className="formgrid right-border">
                                    <h1>Add a record.</h1>
                                    <p>Enter the following details.</p>
                                    <Row className="addfield">
                                        <Col xs={6} className="align-left">Disease</Col>
                                        <Col><input id="disease" className="inputfield" value={this.state.disease} type="text" placeholder="Disease" onChange={this.handleChangeDisease} /></Col>
                                    </Row>
                                    <Row className="addfield">
                                        <Col xs={6} className="align-left">Medication</Col>
                                        <Col>
                                            <input id="medication" className="inputfield" value={this.state.medication} type="text" placeholder="Medication" onChange={this.handleChangeMedication} />
                                        </Col>
                                    </Row>
                                    <Row className="addfield">
                                        <Col xs={6} className="align-left">Doctor</Col>
                                        <Col><input id="doctor" className="inputfield" value={this.state.doctor} type="text" placeholder="Doctor" onChange={this.handleChangeDoctor} /></Col>
                                    </Row>
                                    <Row className="addfield"><button id="form_button" className="formbtn btn-1 btn btn-default btn-success" type="submit">Submit</button></Row>
                                </Grid>
                            </form>
                        </div>
                        <div className="col-md-6 formbody">
                            <Grid className="formgrid">
                                <h1>Add your documents.</h1>
                                <p>Upload your documents.</p>
                                <form id="document_form" onSubmit={this.handleUpload}>
                                    <Row className="addfield plusicon">
                                        {/* <i id="add_doc" className="fas fa-plus-circle" onClick={this.addFile} /> */}
                                        <br />
                                        <input id="file" type="file" className="addicon" onChange={this.handleChangeDocument} />
                                    </Row>
                                    <Row><button id="form_button" className="formbtn btn-1 btn btn-default btn-success" type="submit">Submit</button></Row>
                                </form>
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Form);
