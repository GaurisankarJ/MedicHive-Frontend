import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import axios from "axios";

import Records from "./records";
import Messages from "./messages";

import baseURL from "../connect/connect";

// Axios
axios.defaults.baseURL = baseURL;

class DashBoardBuyer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: "records"
        };
    }

    render() {
        return (
            <div>
                <div id="dashboard_buyer">
                    <h1>DASHBOARD</h1>
                    <Tabs id="dashboard_buyer_tab" activeKey={this.state.key} onSelect={key => this.setState({ key })} mountOnEnter unmountOnExit>
                        <Tab eventKey="records" title="RECORDS">
                            <Records />
                        </Tab>
                        <Tab eventKey="messages" title="MESSAGES">
                            <h1>MESSAGES</h1>
                            <Messages />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default DashBoardBuyer;
