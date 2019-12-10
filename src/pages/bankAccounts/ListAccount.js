import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import httpClient from "../../utils/httpClient";

class ListAccount extends Component {
    state = {
        account: []
    };

    componentDidMount() {
        this.retrieveAccount();
    }

    handleRemove = (accNumber) => {
        httpClient.delete(`/account/${accNumber}`)
            .then(() => this.retrieveAccount())
    };

    retrieveAccount() {
        httpClient.get("/account")
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
                        <th>Account Limit</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.account.map(account => <tr key={account.accNumber}>
                        <td>{account.accNumber}</td>
                        <td>{account.balance}</td>
                        <td>{account.accLimit}</td>
                        <td>
                        <NavLink to={`/account/deposit/${account.accNumber}`} className="btn btn-sm btn-primary">
                                Deposit
                        </NavLink>&nbsp;
                        <NavLink to={`/account/withdraw/${account.accNumber}`} className="btn btn-sm btn-primary">
                                Withdraw
                        </NavLink>&nbsp;                            
                        <NavLink to={`/account/edit/${account.accNumber}`} className="btn btn-sm btn-secondary">
                                Set Limit
                        </NavLink>&nbsp;
                        <button className="btn btn-sm btn-danger" onClick={() => this.handleRemove(account.accNumber)}>
                                Remove
                        </button>&nbsp;
                       
                        </td>
                    </tr>)}
                </tbody>
            </table>

            <div className="float-right">
                <NavLink to="/account/new" className="btn btn-primary">Nova Conta</NavLink>
            </div>
        </div>;
    }
}

export default ListAccount;