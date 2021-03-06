import { useState } from 'react';
import InputMask from 'react-input-mask/lib/react-input-mask.development';
import { CgSpinner } from 'react-icons/cg';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import addImg from '../../img/add.png';

import './account.css';
import { formatStringDate } from '../../helpers/dateFilter';
import validateAccountFields from '../../helpers/newAccountsValidation';

const AccountForm = () => {

    const { _id } = useParams();
    const [id, setId] = useState(_id);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [cpf, setCpf] = useState('');
    const [dob, setDob] = useState('');

    const [wait, setWait] = useState(false);

    const navigate = useNavigate();

    const handlerError = (msg) => {
        toast.error(msg);
        setTimeout(() => {
            setWait(false);
        }, 200);
    }

    const loadData = async () => {
        await axios.get(`https://api-contas-trade4devs.herokuapp.com/conta/${id}`)
            .then(response => {
                const { nome, email, telefone, cpf, dataNascimento } = response.data;
                setName(nome);
                setEmail(email);
                setPhone(telefone);
                setCpf(cpf);
                setDob(formatStringDate(dataNascimento));
            })
            .catch(error => {
                toast.error(`${error.response.status} - Erro ao carregar dados da conta`);
            }
        );
    }

    if (id) {
        loadData();
    }

    const handleSubmit = () => {

        try {
            setWait(true);

            validateAccountFields(name, email, phone, dob, cpf, password);

            axios.post('https://api-contas-trade4devs.herokuapp.com/conta', {
                nome: name,
                email,
                senha: password,
                telefone: phone,
                dataNascimento: formatStringDate(dob),
                cpf,
            }).then(response => {
                toast.success('Conta criada com sucesso!');
                navigate('/accounts');
            }).catch(error => {
                handlerError(`Ocorreu um erro ao tentar cadastrar o usu??rio: ${error.response.data.message}`);
            });
            
        } catch (error) {
            handlerError(error.message);
        } finally {
            setWait(false);
        }
        
    }

    return (
        <div className="account-form-container">
            <div className="topbar">
                <div className="title">
                    <h1>Cadastro de Nova Conta</h1>
                </div>
            </div>
            <div className="account-form-inner">
                
                <div className="account-form-left">
                    <img src={addImg} alt="new account" />
                </div>

                <div className="account-form">
                    <div className='form'>
                        <div className="account-input">
                            <label htmlFor="name">Nome *</label>
                            <input type="hidden" id="id" value={id} onChange={(e) => setId(e.target.value)} />
                            <input type="text" id="name" placeholder='Nome Completo' value={name} onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="account-input">
                            <label htmlFor="email">E-mail *</label>
                            <input type="email" id="email" placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="account-input">
                            <label htmlFor="phone">Telefone *</label>
                            <InputMask id="phone" mask="(99)99999-9999" placeholder='Telefone' value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>

                        <div className="account-input">
                            <label htmlFor="phone">Data de Nascimento *</label>
                            <InputMask id="dob" mask="99/99/9999" placeholder='Data de Nascimento' value={dob} onChange={(e) => setDob(e.target.value)} />
                        </div>

                        <div className="account-input">
                            <label htmlFor="cpf">CPF *</label>
                            <InputMask id="cpf" mask="999.999.999-99" placeholder='CPF' value={cpf} onChange={(e) => setCpf(e.target.value)} />
                        </div>

                        <div className="account-input">
                            <label htmlFor="password">Senha *</label>
                            <input type="password" id="password" placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div className="account-form-btns">
                            <button type='button' className='secondary' onClick={() => {navigate('/accounts')}}>
                                <span>Voltar</span>
                            </button>

                            <button type='button' onClick={handleSubmit} disabled={wait}>
                                {wait && <CgSpinner />}
                                <span>Salvar</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountForm;