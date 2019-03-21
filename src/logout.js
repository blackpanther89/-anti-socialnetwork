import React from "react";
import axios from "./axios";

export default class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.logout = this.logout.bind(this);
    }

    logout() {
        axios.post("/logout", {}).then(({ data }) => {
            if (data.success) {
                location.replace("/welcome");
            } else {
                this.setState({
                    error: true
                });
            }
        });
    }
    render() {
        return <button className="logout-button" onClick={this.logout}>LOGOUT</button>;
    }
}
