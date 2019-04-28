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
            showShare: false,
            key: "",
            buyerEmail: ""
        };
        this.shareButton = this.shareButton.bind(this);
        this.populateMessages = this.populateMessages.bind(this);
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

    shareButton(message) {
        if (message.action === "SHARE" || message.action === "VERIFY") {
            return (
                <button id="messages_seller_share_button" className="btn btn-success" type="button" onClick={() => this.showShare(message)} disabled>SHARE <i className="fas fa-paper-plane" /></button>
            );
        }

        this.setState({
            key: message.body.key,
            buyerEmail: message.from
        });

        return (
            <button id="messages_seller_share_button" className="btn btn-success" type="button" onClick={() => this.handleShowShare(message)}>SHARE <i className="fas fa-paper-plane" /></button>
        );
    }

    populateMessages(messages) {
        const sent = messages.sent.map((message) => {
            const time = new Date(message.time).toGMTString();
            return (
                <tr key={message._id}>
                    <td>{message.action}</td>
                    <td>{(message.action === "SHARE") ? `${message.body.key}:${message.body.count}` : message.body.key }</td>
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
                    <td>{(message.action !== "REQUEST") ? `${message.body.key}:${message.body.count}` : message.body.key }</td>
                    <td>{message.from}</td>
                    <td>{time}</td>
                    <td>{this.shareButton(message)}</td>
                </tr>
            );
        });

        this.setState({ sent, received });
    }

    handleShowShare(message) {
        this.setState({
            showShare: true,
            key: message.body.key,
            buyerEmail: message.from
        });
    }

    handleCloseShare() {
        this.setState({
            showShare: false,
            key: "",
            buyerEmail: ""
        });
    }

    handleShare() {
        const body = {
            key: this.state.key,
            buyerEmail: this.state.buyerEmail
        };

        axios({
            method: "post",
            url: "/share/s",
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
                <div id="messages_seller">
                    <Modal show={this.state.showShare} onHide={this.handleCloseShare}>
                        <Modal.Header closeButton>
                            <Modal.Title>SHARE {this.state.key.toUpperCase()}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h3>Are you sure want to share record?</h3>
                        </Modal.Body>
                        <Modal.Footer>
                            <button id="messages_seller_share_modal_close_button" className="btn btn-danger" type="button" onClick={this.handleCloseShare}>CLOSE</button>
                            <button id="messages_seller_share_save_button" className="btn btn-success" type="button" onClick={this.handleShare}>YES</button>
                        </Modal.Footer>
                    </Modal>
                    <div id="messages_seller_sent">
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
                    <div id="messages_seller_received">
                        <h4>RECEIVED</h4>
                        <table className="text-center table table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center"><h4>ACTION</h4></th>
                                    <th className="text-center"><h4>DESCRIPTION</h4></th>
                                    <th className="text-center"><h4>FROM</h4></th>
                                    <th className="text-center"><h4>TIME</h4></th>
                                    <th className="text-center"><h4>SHARE <i className="fas fa-paper-plane" /></h4></th>
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
