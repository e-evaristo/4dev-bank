import { useEffect, useState } from "react";
import ActionButton from "../../components/ActionButton";
import './account.css';
import AccountTable from "./AccountTable";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NoData from "../../components/NoData";

const Account = () => {

    const [items, setItems] = useState([]);
    const [wait, setWait] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loadItems = async () => {
            setWait(true);
            axios.get('https://api-contas-trade4devs.herokuapp.com/conta')
                .then(response => {
                    setItems(response.data);
                })
                .catch(error => {
                    console.log(error);
                }).finally(() => {
                    setWait(false);
                });
        }
        loadItems();
    }, []);

    return (
        <div className="account-list-container">
            <div className="title">
                <h1>Contas Cadastradas</h1>
                <ActionButton text="Cadastrar Nova Conta" action={() => { navigate('/account')  }} />
            </div>
            { wait ?  <NoData message="Carregando..." wait={true} /> :  <AccountTable items={items} /> }
        </div>
    );
}

export default Account;