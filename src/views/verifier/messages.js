/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import { Modal } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import axios from "axios";

import baseURL from "../connect/connect";

// Axios
axios.defaults.baseURL = baseURL;

class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sent: <tr />,
            received: <tr />,
            showVerify: false,
            key: "",
            sellerEmail: "",
            records: <tr />
        };
        this.viewButton = this.viewButton.bind(this);
        this.populateMessages = this.populateMessages.bind(this);
        this.populateRecord = this.populateRecord.bind(this);
        this.handleVerify = this.handleVerify.bind(this);
        this.handleShowVerify = this.handleShowVerify.bind(this);
        this.verifyButton = this.verifyButton.bind(this);
        this.handleCloseVerify = this.handleCloseVerify.bind(this);
        this.handleShowShare = this.handleShowShare.bind(this);
        this.handleCloseShare = this.handleCloseShare.bind(this);
        this.handleShare = this.handleShare.bind(this);
    }

    componentDidMount() {
        axios({
            method: "get",
            url: "/message/me",
            headers: { "x-auth": sessionStorage.getItem("token") }
        }).then((res) => {
            console.log(res.data);

            this.populateMessages(res.data);
        }).catch((err) => {
            console.log(err);

            this.props.history.push("/error");
        });
    }

    viewButton(message) {
        if (message.action === "REQUEST") {
            return (
                <button id="messages_verifier_share_button" className="btn btn-success" type="button" onClick={() => this.handleShowShare(message)}>SHARE <i className="fas fa-paper-plane" /></button>
            );
        }

        return (
            <button id="messages_verifier_verify_button" className="btn btn-info" type="button" onClick={() => this.handleShowVerify(message)}>VIEW <i className="fas fa-check" /></button>
        );
    }

    populateMessages(messages) {
        const sent = messages.sent.map((message) => {
            const time = new Date(message.time).toGMTString();
            return (
                <tr key={message._id}>
                    <td>{message.action}</td>
                    <td>{`${message.body.key}:${message.body.count}`}</td>
                    <td>{message.to}</td>
                    <td>{time}</td>
                </tr>
            );
        });

        const received = messages.received.map((message) => {
            const time = new Date(message.time).toGMTString();
            return (
                <tr key={message._id}>
                    <td>{message.action}</td>
                    <td>{message.body.key}</td>
                    <td>{message.from}</td>
                    <td>{time}</td>
                    <td>{this.viewButton(message)}</td>
                </tr>
            );
        });

        this.setState({ sent, received });
    }

    populateRecord(payload) {
        let records;
        if (payload.record.length === 0) {
            records = <tr />;
        } else {
            records = payload.record.map((record) => {
                let owner = "";
                const createdAt = new Date(record.createdAt).toGMTString();
                let updatedAt = "NIL";
                if (record.updatedAt) {
                    updatedAt = new Date(record.updatedAt).toGMTString();
                }
                record.owner.forEach((element, i) => {
                    owner += `${i + 1}. ${element.email} `;
                });
                return (
                    <tr key={record._id}>
                        <td>{record.data}</td>
                        <td>{owner}</td>
                        <td>{createdAt}</td>
                        <td>{updatedAt}</td>
                    </tr>
                );
            });
        }

        this.setState({ records });
    }

    handleShowVerify(message) {
        axios({
            method: "get",
            url: `/verify/v?id=${message._id}`,
            headers: { "x-auth": sessionStorage.getItem("token") }
        }).then((res) => {
            console.log(res.data);

            this.populateRecord(res.data);
        }).catch((err) => {
            console.log(err);

            this.props.history.push("/error");
        });

        this.setState({
            showVerify: true,
            key: message.body.key,
            sellerEmail: message.from
        });
    }

    handleCloseVerify() {
        this.setState({
            showVerify: false,
            key: "",
            sellerEmail: "",
            records: <tr />
        });
    }

    verifyButton() {
        if (this.state.records.key === null) {
            return (
                <button id="messages_verifier_verify_save_button" className="btn btn-success" type="button" onClick={this.handleVerify} disabled>YES</button>
            );
        }

        return (
            <button id="messages_verifier_verify_save_button" className="btn btn-success" type="button" onClick={this.handleVerify}>YES</button>
        );
    }

    handleVerify() {
        const body = {
            key: this.state.key,
            sellerEmail: this.state.sellerEmail
        };

        axios({
            method: "post",
            url: "/verify/v",
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

    handleShowShare(message) {
        this.setState({
            showShare: true,
            key: message.body.key,
            sellerEmail: message.from
        });
    }

    handleCloseShare() {
        this.setState({
            showShare: false,
            key: "",
            sellerEmail: ""
        });
    }

    handleShare() {
        const body = {
            key: this.state.key,
            sellerEmail: this.state.sellerEmail
        };

        axios({
            method: "post",
            url: "/share/v",
            data: body,
            headers: { "x-auth": sessionStorage.getItem("token") }
        }).then((res) => {
            console.log(res.data);

            this.handleCloseShare();
            this.componentDidMount();
        }).catch((err) => {
            console.log(err);

            this.props.history.push("/error");
        });
    }

    render() {
        return (
            <div>
                <div id="messages_verifier">
                    <Modal show={this.state.showVerify} onHide={this.handleCloseVerify}>
                        <Modal.Header closeButton>
                            <Modal.Title>VERIFY {this.state.key.toUpperCase()}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <table className="text-center table table-hover">
                                <thead>
                                    <tr>
                                        <th className="text-center"><h4>DATA</h4></th>
                                        <th className="text-center"><h4>OWNER</h4></th>
                                        <th className="text-center"><h4>CREATED AT</h4></th>
                                        <th className="text-center"><h4>UPDATED AT</h4></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.records}
                                </tbody>
                            </table>
                        </Modal.Body>
                        <Modal.Footer>
                            <button id="messages_verifier_verify_modal_close_button" className="btn btn-danger" type="button" onClick={this.handleCloseVerify}>CLOSE</button>
                            {this.verifyButton()}
                        </Modal.Footer>
                    </Modal>
                    <Modal show={this.state.showShare} onHide={this.handleCloseShare}>
                        <Modal.Header closeButton>
                            <Modal.Title>SHARE {this.state.key.toUpperCase()}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h3>Are you sure want to share record?</h3>
                        </Modal.Body>
                        <Modal.Footer>
                            <button id="messages_verifier_share_modal_close_button" className="btn btn-danger" type="button" onClick={this.handleCloseShare}>CLOSE</button>
                            <button id="messages_verifier_share_save_button" className="btn btn-success" type="button" onClick={this.handleShare}>YES</button>
                        </Modal.Footer>
                    </Modal>
                    <div id="messages_verifier_sent">
                        <h4>SENT</h4>
                        <table className="text-center table table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center"><h4>ACTION</h4></th>
                                    <th className="text-center"><h4>DESCRIPTION</h4></th>
                                    <th className="text-center"><h4>TO</h4></th>
                                    <th className="text-center"><h4>TIME</h4></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.sent}
                            </tbody>
                        </table>
                    </div>
                    <div id="messages_verifier_received">
                        <h4>RECEIVED</h4>
                        <table className="text-center table table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center"><h4>ACTION</h4></th>
                                    <th className="text-center"><h4>DESCRIPTION</h4></th>
                                    <th className="text-center"><h4>FROM</h4></th>
                                    <th className="text-center"><h4>TIME</h4></th>
                                    <th className="text-center"><h4>VERIFY <i className="fas fa-check" />/ SHARE <i className="fas fa-paper-plane" /></h4></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.received}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Messages);
