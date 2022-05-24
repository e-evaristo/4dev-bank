import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import NoData from "../components/NoData";
import Login from "../pages/Login";
import PrivateOutlet from "./PrivateOutlet";

import Home from "../pages/Home";
import AccountForm from "../pages/Account/AccountForm";
import Balances from "../pages/Balances";
import Extracts from "../pages/Extracts";
import Operations from "../pages/Operations";

const Account = React.lazy(() => import("../pages/Account"));

const Rotas = () => {

    return ( 
        <Routes>
            <Route path="/" element={<Login />} />
            
            <Route path="/home" element={<PrivateOutlet />}>
                <Route path="/home" element={<Home />} />
            </Route>

            <Route path="/accounts" element={<PrivateOutlet />}>
                <Route path="/accounts" element={
                    <Suspense fallback={<NoData message="Carregando..." wait={true} />}>
                        <Account />
                    </Suspense>
                } />
            </Route>

            <Route path="/account" element={<PrivateOutlet />}>
                <Route path="/account" element={<AccountForm />} />
            </Route>

            <Route path="/balances" element={<PrivateOutlet />}>
                <Route path="/balances" element={ <Balances /> } />
            </Route>

            <Route path="/extracts" element={<PrivateOutlet />}>
                <Route path="/extracts" element={ <Extracts /> } />
            </Route>

            <Route path="/operations" element={<PrivateOutlet />}>
                <Route path="/operations" element={ <Operations /> } />
            </Route>

        </Routes>
     );
}
 
export default Rotas;