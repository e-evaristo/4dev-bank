import axios from 'axios';
import { FaRegEdit, FaRegTrashAlt, FaMoneyCheckAlt, FaSpinner } from 'react-icons/fa';
import { getLocaleDateBR } from "../../helpers/dateFilter";
import { toast } from 'react-toastify';
import { useState } from 'react';
import Popup from '../../components/Popup';
import { getLocaleNumber } from '../../helpers/numberFilter';

const AccountTable = ({items}) => {

    const [searchText, setSearchText] = useState('');
    const [trigger, setTrigger] = useState(false);
    const [balanceData, setBalanceData] = useState([]);
    const [wait, setWait] = useState(false);

    const handleEdit = (item) => {
        toast(`Editar Conta de ${item.nome} `);
    } 

    const handleDelete = (item) => {
        if (window.confirm('Deseja realmente excluir este registro?')) {
            toast(`A Conta de ${item.nome} será excluída!`);
        }
    }

    const handleBalance = (item) => {
        setWait(true);
        axios.get(`https://api-contas-trade4devs.herokuapp.com/conta/saldo/${item.cpf}`)
        .then(res => {
            setBalanceData(res.data);
            setTrigger(true);
        })
        .catch(err => {
            toast.error(`${err.response.status} - Não foi possível carregar o saldo da conta`);
            console.log(err);
        }).finally(() => {
            setWait(false);
        });
    }

    return ( 
        <>
            <div className="account-search-form">
                <input type="text" placeholder='Pesquisar por nome' onChange={(e) => setSearchText(e.target.value)} />
            </div>
            <div className="account-list">
                <table>
                    <thead>
                        <tr>
                            <th>Nome / Email</th>
                            <th>Telefone</th>
                            <th>Data Nasc.</th>
                            <th>CPF</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.length > 0 ?
                            
                            items.filter(item => item.nome.toLowerCase().includes(searchText.toLowerCase()))
                            .map(item => (
                                <tr key={item._id}>
                                    <td data-label="Nome:  ">
                                        {item.nome} <br />
                                        <span className='email'>{item.email}</span>
                                    </td>
                                    <td data-label="Telefone: ">{item.telefone}</td>
                                    <td data-label="Data Nasc.: ">{ getLocaleDateBR(item.dataNascimento) }</td>
                                    <td data-label="CPF: ">{item.cpf}</td>
                                    <td data-label="">
                                        <FaRegEdit size={16} color="#4D85EE" onClick={() => handleEdit(item)} />
                                        <FaRegTrashAlt size={16} color="#DE3B3B" data-icon="delete" onClick={() => handleDelete(item)} />
                                        {
                                            wait ? <FaSpinner size={16} color="#2CA42B" data-icon="wait" /> : <FaMoneyCheckAlt size={16} color="#2CA42B" onClick={() => handleBalance(item)} />
                                        }
                                    </td>
                                </tr>
                            )) :
                            <tr>
                                <td colSpan={5}>Nenhum registro encontrado</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>

            <Popup trigger={trigger} setTrigger={setTrigger}>
                <h4>Saldo da Conta</h4>
                <table>
                    <tbody>
                        <tr>
                            <td>Nome:</td>
                            <td>{ balanceData.nome }</td>
                        </tr>
                        <tr>
                            <td>CPF:</td>
                            <td>
                                { balanceData.cpf }
                            </td>
                        </tr>
                        <tr>
                            <td>Saldo Atual:</td>
                            <td>{ getLocaleNumber(balanceData.saldo) }</td>
                        </tr>
                    </tbody>
                </table>
            </Popup>
        </>
     );
}
 
export default AccountTable;