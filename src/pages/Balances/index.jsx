import axios from 'axios';
import InputMask from 'react-input-mask/lib/react-input-mask.development';
import ActionButton from '../../components/ActionButton';
import { FaSearch } from 'react-icons/fa';
import './balances.css';
import { useState } from 'react';
import NoData from '../../components/NoData';
import { toast } from 'react-toastify';
import { validarCPF } from '../../helpers/cpfFilter';
import { getLocaleNumber } from '../../helpers/numberFilter';

const Balances = () => {
    
    const [wait, setWait] = useState(false);
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [saldo, setSaldo] = useState(-1);

    const loadSaldo = async () => {
        setWait(true);
        await axios.get(`https://api-contas-trade4devs.herokuapp.com/conta/saldo/${cpf}`)
            .then(response => {
                toast.info(`Pesquisa finalizada`, {autoClose:1000});
                setSaldo(response.data.saldo);
                setNome(response.data.nome);
                setCpf(response.data.cpf);
                setWait(false);
            }).catch(error => {
                toast.info(`${error.response.status} - Verifique os dados informados`);
                setWait(false);
            });
        }

    const handleSearch = () => {
        if (!cpf || !validarCPF(cpf)) {
            toast.error('O CPF informado não é válido');
            setWait(false);
            return;
        }
        loadSaldo();
    }

    return (
        <div className="balance-container">
            <div className="balance-topbar">
                <div className="balance-title">
                    <h1>Saldo da Conta</h1>
                </div>
                <div className="balance-form">
                    <div>
                        <InputMask className='input' id="cpf" mask="999.999.999-99" placeholder='CPF *' value={cpf} onChange={ (e) => setCpf(e.target.value) } />
                    </div>
                    <div>
                        <ActionButton text="Pesquisar" action={() => handleSearch()} wait={wait}>
                            <FaSearch />
                        </ActionButton>
                    </div>
                </div>
            </div>

            <div className="balance-list">
                {saldo >= 0 ? 
                    (
                        <>
                            <div className="balance-info">
                                <p>Nome: <span>{nome}</span></p>
                                <p>CPF: <span>{cpf}</span></p>
                                <p>SALDO EM CONTA: <span>{ getLocaleNumber(saldo)}</span></p>
                            </div>
                        </>
                    ) : (
                        <NoData message="Informe o CPF do cliente" />
                    )
                }

            </div>
        </div>
    );
}
 
export default Balances;