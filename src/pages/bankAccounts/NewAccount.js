import React, { Component } from "react";

import axios from "../utils/httpClient";

import Field from "../components/Field"
import { NavLink } from "react-router-dom";

class NewAccount extends Component {
    state = {
        account: {
            id: "",
            balance: "",
            accLimit: ""
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
        axios.post("/accounts", this.state.account)
            .then(() => this.props.history.push("/"))
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
                <h1 className="page-id">Novo Account</h1>

                {globalError ? <div className="alert alert-danger">
                    {globalError}
                </div> : <></>}

                <form onSubmit={this.handleSubmit}>
                    <Field name="id"
                           label="ID"
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
        );
    }
}

export default NewAccount;