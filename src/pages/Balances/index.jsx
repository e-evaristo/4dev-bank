import axios from 'axios';
import InputMask from 'react-input-mask/lib/react-input-mask.development';
import ActionButton from '../../components/ActionButton';
import { FaSearch } from 'react-icons/fa';
import './balances.css';
import { useEffect, useRef, useState } from 'react';
import NoData from '../../components/NoData';
import { toast } from 'react-toastify';
import { validarCPF } from '../../helpers/cpfFilter';
import { getLocaleNumber } from '../../helpers/numberFilter';

const Balances = () => {
    
    const [wait, setWait] = useState(false);
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [saldo, setSaldo] = useState(-1);
    const [message, setMessage] = useState('');
    const [finished, setFinished] = useState(false);
    const inputCpf = useRef(null);

    const loadSaldo = async (cpf) => {
        setWait(true);
        await axios.get(`https://api-contas-trade4devs.herokuapp.com/conta/saldo/${cpf}`)
            .then(response => {
                const data = response.data;
                toast.info(`Pesquisa finalizada`, {autoClose:1000});
                setSaldo(data.saldo);
                setNome(data.nome);
                setCpf(data.cpf);
                setFinished(true);
            }).catch(error => {
                toast.info(`${error.response.status} - Verifique os dados informados`);
                setFinished(false);
            }).finally(() => {
                setWait(false);
            });
        }

    const handleSearch = () => {
        let cpf = inputCpf.current.value;
        if (!cpf || !validarCPF(cpf)) {
            toast.error('O CPF informado não é válido');
            setWait(false);
            return;
        }
        loadSaldo(cpf);
    }

    useEffect(() => {
        setMessage('Informe o CPF do cliente');
    }, []);

    return (
        <div className="balance-container">
            <div className="balance-topbar">
                <div className="balance-title">
                    <h1>Saldo da Conta</h1>
                </div>
                <div className="balance-form">
                    <div>
                        <InputMask className='input' id="cpf" mask="999.999.999-99" placeholder='CPF *' ref={inputCpf} />
                    </div>
                    <div>
                        <ActionButton text="Pesquisar" action={() => handleSearch()} wait={wait}>
                            <FaSearch />
                        </ActionButton>
                    </div>
                </div>
            </div>

            <div className="balance-list">
                {finished ? 
                    (
                        <>
                            <div className="balance-info">
                                <p>Nome: <span>{nome}</span></p>
                                <p>CPF: <span>{cpf}</span></p>
                                <p>SALDO EM CONTA: <span className={saldo < 0 ? 'negative':'positive'}>{ getLocaleNumber(saldo)}</span></p>
                            </div>
                        </>
                    ) : (
                        <NoData message={message} />
                    )
                }

            </div>
        </div>
    );
}
 
export default Balances;