import React, { Component } from "react";

import axios from "../../utils/httpClient";
import Field from "../../components/Field";
import { Link } from "react-router-dom";

class NewAccount extends Component {
    state = {
        account: {
            balance: ""
        },
        errors: {},
        globalError: ""
    };

    handleChange = (event) => {
        let field = event.target.name;
        let value = event.target.value;

        this.setState(({ account }) => ({
            account: {
                ...account,
                [field]: value
            }
        }))
    };

    handleSubmit = (event) => {
        axios.post("/account", this.state.account)
            .then(() => this.props.history.push("/account"))
            .catch(({ response }) => {
                if (response.status === 400) {
                    this.setState({
                        errors: response.data
                    })
                }

                this.setState({
                    globalError: response.data.message
                })

            });

        event.preventDefault();
    };

    render() {
        const { account, errors, globalError } = this.state;
        return (
            <div>
                <h1 className="page-title">NEW ACCOUNT</h1>

                {globalError ? <div className="alert alert-danger">
                    {globalError}
                </div> : <></>}
                <table className="table bg-white">
                <thead className="text-center">
                    <tr>

                    </tr>
                </thead>
                <tbody className="">
                    <tr><td>
                <form onSubmit={this.handleSubmit}>

                    <Field name="balance"
                        label="In order to create a new account, just set the balance initial value below:"
                        value={account.balance}
                        errors={errors["balance"]}
                        onChange={this.handleChange} />

                    <div className="float-right btn-group">
                        <Link to="/" className="btn badge btn-outline-white">Back</Link>
                        <button type="submit" className="btn badge btn-outline-success">Create</button>
                    </div>
                </form>
                </td>
                    </tr>
                </tbody>
            </table>
            </div>
        );
    }
}

export default NewAccount;