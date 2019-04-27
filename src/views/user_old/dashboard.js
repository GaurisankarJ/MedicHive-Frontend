import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
import axios from "axios";

import Overview from "./overview";
import MedicalHistory from "./medical_history";
import DocumentUploads from "./document_uploads";
import baseURL from "../connect/connect";

// Axios
axios.defaults.baseURL = baseURL;

class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: "medical-history"
        };
    }

    componentDidMount() {
        axios({
            method: "get",
            url: "/users/me",
            headers: { "x-auth": localStorage.getItem("token") }
        }).then().catch((err) => {
            console.log(err);
            this.props.history.push("/login");
        });
    }

    render() {
        return (
            <div>
                <div id="dashboard">
                    <div id="bg-div" className="bg-div-1" />
                    <div className="overview">
                        <Overview />
                    </div>
                    <div className="page-body">
                        <h1 className="heading">Dashboard.</h1>
                        <Tabs id="dashboard_tab" className="dashtab" activeKey={this.state.key} onSelect={key => this.setState({ key })}>
                            <Tab eventKey="medical-history" title="MEDICAL HISTORY">
                                <h4><Link to="/records" className="btn btn-block">Search Records</Link></h4>
                                <MedicalHistory />
                            </Tab>
                            <Tab eventKey="document-uploads" title="DOCUMENT UPLOADS">
                                <h4><Link to="/documents" className="btn btn-block">Search Documents</Link></h4>
                                <DocumentUploads />
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(DashBoard);
