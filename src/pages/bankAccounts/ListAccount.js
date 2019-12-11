import React, { Component } from "react";
import { Link } from 'react-router-dom';
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
            
            <h1 className="page-title ">BANK ACCOUNT DASHBOARD</h1>            
            
            <table className="table table-borderless table-dark table-striped ">
                <thead className="text-center text-muted">
                    <tr>
                        <th className="">ID</th>
                        <th className="">Balance</th>
                        <th className="">Account Limit</th>
                    </tr>
                </thead>
                <tbody className="">
                    {this.state.account.map(account => <tr key={account.accNumber} className="text-white">
                        <td className="text-center">{account.accNumber}</td>
                        <td className="text-center">{account.balance}</td>
                        <td className="text-center">{account.accLimit}</td>
                        <td>
                        <Link to={`/account/deposit/${account.accNumber}`} className="btn badge btn-outline-success">
                                Deposit
                        </Link>&nbsp;
                        <Link to={`/account/withdraw/${account.accNumber}`} className="btn badge btn-outline-warning">
                                Withdraw
                        </Link>&nbsp;                            
                        <Link to={`/account/edit/${account.accNumber}`} className="btn badge btn-outline-primary">
                                Set Limit
                        </Link>&nbsp;
                        <button className="badge badge-pill badge-dark btn-outline-danger" onClick={() => this.handleRemove(account.accNumber)}>
                                Remove
                        </button>&nbsp;
                       
                        </td>
                    </tr>)}
                    
                </tbody>
            </table>
            
            <div className="float-right">
                <Link to="/account/new" className="badge badge-pill badge-dark ">New Account</Link>
            </div>       
             
              
        </div>
        
    }
    
}

export default ListAccount;