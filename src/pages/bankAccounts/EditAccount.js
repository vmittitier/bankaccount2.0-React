import React, { Component } from "react";

import axios from "../utils/httpClient"
import Field from "../components/Field";
import { NavLink } from "react-router-dom";

class EditAccount extends Component {
    state = {
        account: {
            id: "",
            balance: "",
            accLimit: ""
        },
        errors: {}
    };

    componentDidMount() {
        axios.get(`/account/${this.retrieveaccountId()}`)
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

    retrieveaccountId = () =>
        this.props.match.params.id;

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
        event.preventDefault();

        axios.put(`/account/${this.retrieveaccountId()}`, this.state.account)
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
            <h1 className="page-id">Alterar Livro</h1>

            <form onSubmit={this.handleSubmit}>
                <Field name="id"
                       label="Id"
                       value={account.id}
                       errors={errors["id"]}
                       onChange={this.handleChange}/>

                <Field name="balance"
                       label="Balance"
                       value={account.balance}
                       errors={errors["balance"]}
                       onChange={this.handleChange}/>

                <Field name="accLimit"
                       label="Account Limit"
                       value={account.accLimit}
                       errors={errors["accLimit"]}
                       onChange={this.handleChange}/>

                <div className="float-right btn-group">
                    <NavLink to="/" className="btn btn-primary">Voltar</NavLink>
                    <button type="submit" className="btn btn-success">Salvar</button>
                </div>
            </form>
        </div>
    }
}

export default EditAccount;