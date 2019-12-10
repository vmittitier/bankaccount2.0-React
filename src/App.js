import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NotFound from "./pages/NotFound";

import 'bootstrap/dist/css/bootstrap.min.css';

import ListAccount from './pages/bankAccounts/ListAccount';
import NewAccount from './pages/bankAccounts/NewAccount';
import EditAccount from './pages/bankAccounts/EditAccount';



 const App = () => 
 <div className="container">
    <BrowserRouter>
            <Switch>
                <Route path={["/", "/account"]} exact component={ListAccount}/>
                <Route path="/account/new" exact component={NewAccount}/>
                <Route path="/account/edit/:accNumber" exact component={EditAccount}/>
                <Route path="*" component={NotFound}/>
            </Switch>
        </BrowserRouter>
 </div>

export default App;
