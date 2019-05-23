import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";

import Header from "./views/common/header";
import Footer from "./views/common/footer";
import Home from "./views/common/home";
import Error from "./views/common/error";
import Success from "./views/common/success";
import SignUp from "./views/common/sign_up";
import Login from "./views/common/login";
import Forgot from "./views/common/forgot";
import { CreateProfileBuyer, ProfileBuyer } from "./views/buyer/profile";
import { CreateProfileSeller, ProfileSeller } from "./views/seller/profile";
import { CreateProfileVerifier, ProfileVerifier } from "./views/verifier/profile";
import DashBoardBuyer from "./views/buyer/dashboard";
import DashBoardSeller from "./views/seller/dashboard";
import DashBoardVerifier from "./views/verifier/dashboard";

import "./style.scss";

// React Component
const App = () => (
    <div>
        <Router>
            <div>
                <Header />
                {/* <Route exact path="/" component={withRouter(Home)} /> */}
                <Route exact path="/" component={withRouter(Home)} />
                <Route exact path="/error" component={withRouter(Error)} />
                <Route exact path="/success" component={withRouter(Success)} />
                <Route exact path="/sign_up" component={withRouter(SignUp)} />
                <Route exact path="/profile/b/create" component={withRouter(CreateProfileBuyer)} />
                <Route exact path="/profile/s/create" component={withRouter(CreateProfileSeller)} />
                <Route exact path="/profile/v/create" component={withRouter(CreateProfileVerifier)} />
                <Route exact path="/login" component={withRouter(Login)} />
                <Route exact path="/forgot" component={withRouter(Forgot)} />
                <Route exact path="/profile/b" component={withRouter(ProfileBuyer)} />
                <Route exact path="/profile/s" component={withRouter(ProfileSeller)} />
                <Route exact path="/profile/v" component={withRouter(ProfileVerifier)} />
                <Route exact path="/dashboard/b" component={withRouter(DashBoardBuyer)} />
                <Route exact path="/dashboard/s" component={withRouter(DashBoardSeller)} />
                <Route exact path="/dashboard/v" component={withRouter(DashBoardVerifier)} />
                <Footer />
            </div>
        </Router>
    </div>
);

export default App;

ReactDOM.render(
    <App />,
    document.getElementById("root")
);
