import { useEffect, useState } from "react";
import ActionButton from "../../components/ActionButton";
import './account.css';
import AccountTable from "./AccountTable";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Account = () => {

    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadItems = async () => {
            axios.get('https://api-contas-trade4devs.herokuapp.com/conta')
                .then(response => {
                    setItems(response.data);
                })
                .catch(error => {
                    console.log(error);
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
            <AccountTable items={items} />
        </div>
    );
}

export default Account;