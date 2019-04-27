import React from "react";
import { Grid, Col, Row } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import axios from "axios";

import baseURL from "../connect/connect";

// Axios
axios.defaults.baseURL = baseURL;

class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            age: "",
            weight: "",
            sex: "",
            occupation: "",
            address: ""
        };
    }

    componentDidMount() {
        axios({
            method: "get",
            url: "/users/me",
            headers: { "x-auth": localStorage.getItem("token") }
        }).then((res) => {
            this.setState({
                age: res.data.userDetails.age,
                weight: res.data.userDetails.weight,
                sex: res.data.userDetails.sex,
                occupation: res.data.userDetails.occupation,
                address: res.data.userDetails.address
            });
        }).catch((err) => {
            console.log(err);
            this.props.history.push("/not_found");
        });
    }

    render() {
        return (
            <div>
                <div id="overview">
                    <Grid className="overgrid">
                        <Row className="overfield">
                            <Col xs={6} className="overlabel">Age</Col>
                            <Col xs={6} className="value">
                                {this.state.age}
                            </Col>
                        </Row>
                        <Row className="overfield">
                            <Col xs={6} className="overlabel">Weight</Col>
                            <Col xs={6} className="value">
                                {this.state.weight}
                            </Col>
                        </Row>
                        <Row className="overfield">
                            <Col xs={6} className="overlabel">Sex</Col>
                            <Col xs={6} className="value">
                                {this.state.sex}
                            </Col>
                        </Row>
                        <Row className="overfield">
                            <Col xs={6} className="overlabel">Occupation</Col>
                            <Col xs={6} className="value">
                                {this.state.occupation}
                            </Col>
                        </Row>
                        <Row className="overfield">
                            <Col xs={6} className="overlabel">Address</Col>
                            <Col xs={6} className="value">
                                {this.state.address}
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default withRouter(Overview);
