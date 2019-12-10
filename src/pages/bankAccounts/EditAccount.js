import React, { Component } from "react";

import Field from "../../components/Field";
import { NavLink } from "react-router-dom";
import httpClient from "../../utils/httpClient";

class EditAccount extends Component {
    state = {
        account: {
            // accNumber: "",
            // balance: "",
            accLimit: ""
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

        httpClient.put(`/account/${this.retrieveAccNumber()}`, this.state.account)
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
            <h1 className="page-accNumber">Alterar Limite de Conta</h1>

            <form onSubmit={this.handleSubmit}>

                <Field name="accLimit"
                    label="Account Limit"
                    value={account.accLimit}
                    errors={errors["accLimit"]}
                    onChange={this.handleChange} />

                <div className="float-right btn-group">
                    <NavLink to="/" className="btn btn-primary">Voltar</NavLink>
                    <button type="submit" className="btn btn-success">Salvar</button>
                </div>
            </form>
        </div>
    }
}

export default EditAccount;