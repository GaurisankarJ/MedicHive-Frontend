/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
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
            received: <tr />
        };
        this.populateMessages = this.populateMessages.bind(this);
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

    populateMessages(messages) {
        const sent = messages.sent.map((message) => {
            const time = new Date(message.time).toGMTString();
            return (
                <tr key={message._id}>
                    <td>{message.action}</td>
                    <td>{message.body.key}</td>
                    <td>{time}</td>
                </tr>
            );
        });

        const received = messages.received.map((message) => {
            const time = new Date(message.time).toGMTString();
            return (
                <tr key={message._id}>
                    <td>{message.action}</td>
                    <td>{(message.action === "SHARE") ? `${message.body.key}:${message.body.count}` : message.body.key }</td>
                    <td>{message.from}</td>
                    <td>{time}</td>
                </tr>
            );
        });

        this.setState({ sent, received });
    }

    render() {
        return (
            <div>
                <div id="messages_buyer">
                    <div id="messages_buyer_sent">
                        <h4>SENT</h4>
                        <table className="text-center table table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center"><h4>ACTION</h4></th>
                                    <th className="text-center"><h4>DESCRIPTION</h4></th>
                                    <th className="text-center"><h4>TIME</h4></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.sent}
                            </tbody>
                        </table>
                    </div>
                    <div id="messages_buyer_received">
                        <h4>RECEIVED</h4>
                        <table className="text-center table table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center"><h4>ACTION</h4></th>
                                    <th className="text-center"><h4>DESCRIPTION</h4></th>
                                    <th className="text-center"><h4>FROM</h4></th>
                                    <th className="text-center"><h4>TIME</h4></th>
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
