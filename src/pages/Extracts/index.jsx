import axios from 'axios';
import { useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import InputMask from 'react-input-mask/lib/react-input-mask.development';
import { toast } from 'react-toastify';
import ActionButton from '../../components/ActionButton';
import NoData from '../../components/NoData';
import { validarCPF } from '../../helpers/cpfFilter';

import './extracts.css';
import ExtractTable from './ExtractTable';

const Extracts = () => {

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [month, setMonth] = useState('');
    const [extract, setExtract] = useState([]);
    const [wait, setWait] = useState(false);
    const [message, setMessage] = useState('Informe o CPF do cliente para pesquisar o extrado');
    const inputCpf = useRef(null);

    const loadExtracts = async (cpf, month = '') => {
        setWait(true);
        await axios.get(`https://api-contas-trade4devs.herokuapp.com/conta/extrato/${cpf}?mes=${month}`)
            .then(response => {
                toast.info(`Pesquisa finalizada`, {autoClose:1000});
                setExtract(response.data.operacoes);
                setNome(response.data.nome);
                setCpf(response.data.cpf);
                if (response.data.operacoes.length === 0) {
                    setMessage('Não há registros para o CPF no mês informado');
                }
                setWait(false);
            }).catch(error => {
                toast.info(`${error.response.status} - Verifique os dados informados`);
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
        loadExtracts(cpf, month);
    }

    return (
        <div className="extract-container">
            <div className="extract-topbar">
                <div className="extract-title">
                    <h1>Extrato da Conta</h1>
                </div>
                <div className="extract-form">
                    <InputMask className='input' id="cpf" mask="999.999.999-99" placeholder='CPF *' ref={inputCpf} />
                    <select name="" className='input' defaultValue={''} onChange={ (e) => setMonth(e.target.value) }>
                        <option value="">Selecione o Mês</option>
                        <option value="1">Janeiro</option>
                        <option value="2">Fevereiro</option>
                        <option value="3">Março</option>
                        <option value="4">Abril</option>
                        <option value="5">Maio</option>
                        <option value="6">Junho</option>
                        <option value="7">Julho</option>
                        <option value="8">Agosto</option>
                        <option value="9">Setembro</option>
                        <option value="10">Outubro</option>
                        <option value="11">Novembro</option>
                        <option value="12">Dezembro</option>
                    </select>
                    <ActionButton text="Pesquisar" action={() => handleSearch()} wait={wait}>
                        <FaSearch />
                    </ActionButton>
                </div>
            </div>

            <div className="extract-list">
                {extract.length > 0 ? 
                    (
                        <>
                            <div className="extract-info">
                                <p>Nome: <span>{nome}</span></p>
                                <p>CPF: <span>{cpf}</span></p>
                            </div>
                            <ExtractTable extract={extract} />
                        </>
                    ) : (
                        <NoData message={message} />
                    )
                }

            </div>
        </div>
    );
}
 
export default Extracts;