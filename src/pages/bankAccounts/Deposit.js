import React, { Component } from "react";

import Field from "../../components/Field";
import { Link } from "react-router-dom";
import httpClient from "../../utils/httpClient";

class EditAccount extends Component {
    state = {
        account: {
            depositValue: ""
        },
        errors: {}
    };

    componentDidMount() {
        httpClient.get(`/account/${this.retrieveAccNumber()}`)
            .then(({ data }) => {
                this.setState({
                    account: data
                })

            })
            .catch(({ response }) => {
                if (response.status === 404) {
                    this.props.history.push("/not-found")
                }
            })
    }

    retrieveAccNumber = () =>
        this.props.match.params.accNumber;

    handleChange = (event) => {
        let field = event.target.name;
        let value = event.target.value;
        console.log(value);

        this.setState(({ account }) => ({
            account: {
                ...account,
                [field]: value
            }
        }))
    };

    handleSubmit = (event) => {
        event.preventDefault();

        httpClient.put(`/account/deposit/${this.retrieveAccNumber()}`, this.state.account)
            .then(() => this.props.history.push("/"))
            .catch(({ response }) => {
                if (response.status === 400) {
                    this.setState({
                        errors: response.data
                    })
                }
            })
    };

    render() {
        const { account, errors } = this.state;

        return <div>
            <h1 className="page-title">DEPOSIT</h1>
            <table className="table bg-white">
                <thead className="text-center">
                    <tr>

                    </tr>
                </thead>
                <tbody className="">
                    <tr><td>
                        <form onSubmit={this.handleSubmit}>

                            <Field name="depositValue"
                                label="Please, enter the deposit amount."
                                value={account.depositValue}
                                errors={errors["depositValue"]}
                                onChange={this.handleChange} />

                            <div className="float-right btn-group">
                                <Link to="/" className="btn badge btn-outline-white">Back</Link>
                                <button type="submit" className="btn badge btn-outline-success">Deposit</button>
                            </div>
                        </form>
                    </td>
                    </tr>
                </tbody>
            </table>
        </div>
    }
}

export default EditAccount;