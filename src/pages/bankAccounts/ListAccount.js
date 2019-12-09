import React, { Component } from "react";

import axios from "../utils/httpClient"

import { NavLink } from 'react-router-dom';

class ListAccount extends Component {
    state = {
        account: []
    };

    componentDidMount() {
        this.retrieveAccount();
    }

    handleRemove = (id) => {
        axios.delete(`/account/${id}`)
            .then(() => this.retrieveAccount())
    };

    retrieveAccount() {
        axios.get("/account")
            .then(({ data }) =>
                this.setState({
                    account: data
                })
            )
    }

    render() {
        return <div>
            <h1 className="page-title">Listagem de Contas</h1>

            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Balance</th>
                    <th>Account Limite</th>
                </tr>
                </thead>
                <tbody>
                {this.state.account.map(account => <tr key={account.id}>
                    <td>{account.id}</td>
                    <td>{account.balance}</td>
                    <td>{account.accLimit}</td>
                    <td>
                        <button className="btn btn-sm btn-danger" onClick={() => this.handleRemove(account.id)}>
                            Remover
                        </button>&nbsp;
                        <NavLink to={`/account/${account.id}`} className="btn btn-sm btn-primary">
                            Alterar
                        </NavLink>
                    </td>
                </tr>)}
                </tbody>
            </table>

            <div className="float-right">
                <NavLink to="/accounts/new" className="btn btn-primary">Nova Conta</NavLink>
            </div>
        </div>;
    }
}

export default ListAccount;