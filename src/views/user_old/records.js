import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import baseURL from "../connect/connect";

// Axios
axios.defaults.baseURL = baseURL;

class Records extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            records: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.populate = this.populate.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount() {
        axios({
            method: "get",
            url: "/record",
            headers: { "x-auth": localStorage.getItem("token") }
        }).then((res) => {
            localStorage.setItem("records", JSON.stringify(res.data.record[0].log));
            this.populate(res.data.record[0].log);
        }).catch((err) => {
            console.log(err);
            this.props.history.push("/not_found");
        });
        document.addEventListener("keydown", this.handleKeyPress);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress);
    }

    handleKeyPress(event) {
        if (event.keyCode === 13) {
            this.handleSearch();
        }
    }

    handleChange(event) {
        this.setState({
            search: event.target.value
        });
    }

    handleSearch() {
        const records = JSON.parse(localStorage.getItem("records"));
        const regex = new RegExp(this.state.search, "gi");
        const result = records.filter(record => record.match(regex));
        this.populate(result);
    }

    populate(records) {
        const list = records.map((record) => {
            const temp = record.split(":");
            return (
                <tr key={Math.ceil(Math.random() * 100000)}>
                    <td>{temp[0].trim()}</td>
                    <td>{temp[1].trim()}</td>
                    <td>{temp[2].trim()}</td>
                </tr>
            );
        });
        this.setState({
            records: list
        });
    }

    render() {
        return (
            <div>
                <div id="bg-div" className="bg-div-1" />
                <div id="records" className="page-body">
                    <h1 className="heading">Search Reacords</h1>
                    <div className="searchbar input-group float-label-control">
                        <span className="input-group-addon"><i className="icon fas fa-search" /></span>
                        <label className="form-line" htmlFor="search_records">
                            <input id="search_records" className="form-control sb-field" value={this.state.search} type="text" placeholder="Record Name" onChange={this.handleChange} />
                        </label>
                        <div>
                            <button id="search_button" className="btn btn-1 btn-default btn-success" onClick={this.handleSearch} type="button">Search</button>
                        </div>
                    </div>
                    <table className="text-center table table-hover">
                        <thead>
                            <tr>
                                <th className="text-center align-middle">RECORD TYPE</th>
                                <th className="text-center align-middle">RECORD NAME</th>
                                <th className="text-center align-middle">RECORD DATE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.records}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default withRouter(Records);
